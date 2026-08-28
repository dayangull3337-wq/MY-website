'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  containerClassName?: string;
}

const DEFAULT_FALLBACK = 'https://images.pexels.com/photos/14645214/pexels-photo-14645214.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

export function SafeImage({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  className = '',
  containerClassName = '',
  ...rest
}: SafeImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isFailed = failedSrc === (typeof src === 'string' ? src : 'object-src');
  const activeSrc = isFailed ? fallbackSrc : src;

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-stone-200/60 animate-pulse z-0 pointer-events-none" />
      )}
      <Image
        {...rest}
        src={activeSrc}
        alt={alt || 'Veloura Luxury Furniture'}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setFailedSrc(typeof src === 'string' ? src : 'object-src');
          setIsLoading(false);
        }}
        className={`${className} ${isLoading ? 'opacity-0 scale-98' : 'opacity-100 scale-100'} transition-opacity duration-300`}
      />
    </div>
  );
}
