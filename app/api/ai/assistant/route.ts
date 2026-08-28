import { NextRequest, NextResponse } from 'next/server';
import { getGeminiAI } from '@/lib/gemini';
import { INITIAL_PRODUCTS } from '@/data/products';
import { SOFA_CATEGORIES } from '@/data/categories';

export async function POST(req: NextRequest) {
  try {
    const { message, history = [], preferences = {} } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const ai = getGeminiAI();

    // Prepare complete rich catalog context for high-precision bespoke recommendations
    const catalogSummary = INITIAL_PRODUCTS.map((p) => ({
      name: p.name,
      slug: p.slug,
      category: p.categoryName,
      priceGBP: `£${p.salePrice ?? p.basePrice}`,
      originalPriceGBP: p.isOnSale ? `£${p.basePrice}` : undefined,
      rating: `${p.rating}/5.0 (${p.reviewCount} verified reviews)`,
      seatingCapacity: `${p.seatingCapacity} Persons`,
      style: p.style,
      firmness: p.firmness,
      dimensions: {
        width: p.dimensions.width,
        depth: p.dimensions.depth,
        height: p.dimensions.height,
        seatDepth: p.dimensions.seatDepth,
        seatHeight: p.dimensions.seatHeight,
      },
      materials: p.primaryMaterial,
      frame: p.frameMaterial,
      cushionFill: p.cushionFill,
      legFinish: p.legFinish,
      availableColors: p.variants.map((v) => `${v.colorName} (${v.material})`).join(', '),
      features: p.features.join(' | '),
      warranty: p.warranty,
    }));

    const systemInstruction = `You are the Master Interior Architect, Design Stylist, and Warm Companion for "Veloura London" — an ultra-luxury, handcrafted sofa atelier based in Mayfair, London.

================================================================================
CRITICAL DIRECTIVE 1: NATURAL FRIENDLINESS & CONVERSATIONAL COMPANIONSHIP
================================================================================
- Behave like a warm, supportive, helpful, and highly knowledgeable close friend ("dost aur helper ki tarha", just like Gemini / ChatGPT).
- If a user sends casual chit-chat, greetings, or questions like:
  * "Kaise ho dost?" / "Kese ho brother?" -> Reply warmly and casually: e.g. "Main bilkul theek hoon dost! Aap sunayein, aaj aapka din kaisa guzar raha hai? Aaj aapke living room ke liye koi khas sofa ya decor plan kar rahe hain?"
  * "Hello", "Hi friend", "Salam" -> Greet them enthusiastically and warmly like an old friend ready to help.
- Always maintain an authentic, warm, polite, and helpful tone.

================================================================================
CRITICAL DIRECTIVE 2: AUTOMATIC MULTILINGUAL DETECTION (SILENT & ACCURATE)
================================================================================
- Automatically detect the language, script, and dialect from the user's message.
- ALWAYS reply in the EXACT SAME language:
  * Roman Urdu / Hindi (e.g. "mujhe 4 seater L shape sofa dikhao jo soft ho"): Reply in natural, friendly Roman Urdu.
  * Urdu Script (اردو): Reply in authentic Urdu script.
  * Pashto (پښتو): Reply in fluent Pashto.
  * Arabic, French, German, Spanish, Turkish, etc.: Reply in that language.
  * English: Reply in refined British-luxury English.

================================================================================
CRITICAL DIRECTIVE 3: EXACT SOFA CATALOG INTELLIGENCE & ACCURACY
================================================================================
- When the user asks for:
  * **4-Seater L-Shape Sofas**: Recommend the **Mayfair 4-Seater L-Shape Chaise Sectional** (£2,850 in Cream Bouclé or Forest Velvet) and **Chelsea 4-Seater L-Shape Corner Sofa** (£3,490 in Tuscan Cognac Leather or Charcoal Linen). Explain why they are genuine 4-person L-shape configurations and describe their dimensions (width, depth, seat height).
  * **Sectionals / Modular / Pits**: **Aurelia Grand Sectional** (5-seater cloud sink), **Køben Modular Pit Lounge** (magnetic modular), **Montauk Modular**.
  * **3-Seater Sofas**: **Palermo Tailored 3-Seater**, **Solis Curved 3-Seater**, **Tribeca Deep-Lounge 3-Seater**.
  * **Motorized Recliner**: **Verona Motorized Reclining Lounge** (German whisper motors).
- When mentioning specific sofa models, wrap their name in asterisks (e.g. **Mayfair 4-Seater L-Shape Chaise Sectional**) so the UI automatically generates interactive product cards.
- Mention UK Atelier assurances: Free UK White-Glove in-room installation over £1,500, 100-Day In-Home Trial, and 10-Year Kiln-Dried Beechwood Frame Guarantee. All prices are in British Pounds (£ / GBP).

================================================================================
VELOURA COMPLETE SOFA CATALOG:
================================================================================
${JSON.stringify(catalogSummary, null, 2)}
`;

    // Construct conversation contents
    const contents: any[] = [];

    // Add prior dialogue turns if available
    if (Array.isArray(history)) {
      history.forEach((h: { role: string; text: string }) => {
        contents.push({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.text }],
        });
      });
    }

    // Add current user prompt with context
    let promptWithContext = message;
    if (Object.keys(preferences).length > 0) {
      promptWithContext = `Customer Context / Preferences:
- Room Style: ${preferences.style || 'Any Luxury Style'}
- Room Dimensions: ${preferences.roomSize || 'Standard Living Room'}
- Seating Capacity: ${preferences.seating || '3-5 Persons'}
- Pets / Children: ${preferences.hasPets ? 'Yes (Needs high Martindale rub count & stain-resistant performance fabric)' : 'No'}
- Budget Range: ${preferences.budget || 'Any luxury tier (£)'}

Customer Message: "${message}"`;
    }

    contents.push({
      role: 'user',
      parts: [{ text: promptWithContext }],
    });

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });
    } catch (primaryErr: any) {
      console.warn('Primary Gemini model busy or error, trying fallback model...', primaryErr?.message || primaryErr);
      response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });
    }

    const replyText = response.text || "Welcome to Veloura London. How may I assist you with tailoring your bespoke sofa today?";

    return NextResponse.json({
      text: replyText,
      recommendedProductSlugs: extractProductSlugs(replyText),
    });
  } catch (err: any) {
    console.error('Gemini Assistant Error:', err);
    // Intelligent multilingual fallback if all API endpoints encounter temporary network spikes
    return NextResponse.json({
      text: `Welcome to **Veloura London** Atelier.\n\nOur master stylists recommend exploring our signature collection:\n- **Aurelia Grand Sectional** (£3,450) — Cloud-sink down cushioning in Italian Alpine Bouclé.\n- **Seraphina Curved** (£2,950) — Architectural crescent silhouette in Tuscan Amber Velvet.\n- **Montauk Modular** (£3,800) — Deep 5-piece configuration in Belgian Washed Linen.\n\nAll bespoke orders include complimentary UK White-Glove in-room installation on orders over £1,500 and our 10-Year Kiln-Dried European Beechwood Frame Guarantee.`,
      recommendedProductSlugs: ['aurelia-grand-sectional', 'seraphina-curved', 'montauk-modular'],
    });
  }
}

function extractProductSlugs(text: string): string[] {
  const slugs: string[] = [];
  const textLower = text.toLowerCase();

  INITIAL_PRODUCTS.forEach((p) => {
    // Match full name or partial unique name
    if (
      textLower.includes(p.name.toLowerCase()) ||
      textLower.includes(p.slug.toLowerCase().replace(/-/g, ' '))
    ) {
      if (!slugs.includes(p.slug)) {
        slugs.push(p.slug);
      }
    }
  });

  return slugs.slice(0, 4);
}
