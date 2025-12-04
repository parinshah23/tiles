import { useState, useEffect, useRef, ImgHTMLAttributes } from "react";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  srcSet?: string;
  sizes?: string;
}

/**
 * LazyImage Component - Optimized image loading with lazy loading and intersection observer
 * Features:
 * - Native lazy loading with Intersection Observer fallback
 * - Placeholder support
 * - Responsive image support (srcset, sizes)
 * - Prevents layout shift with aspect ratio
 */
export const LazyImage = ({
  src,
  alt,
  placeholder,
  srcSet,
  sizes,
  className = "",
  ...props
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Use native lazy loading if supported
    if ("loading" in HTMLImageElement.prototype) {
      setIsInView(true);
      return;
    }

    // Fallback: Use Intersection Observer for browsers that don't support native lazy loading
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px", // Start loading 50px before image enters viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  // Create a low-quality placeholder
  const placeholderSrc =
    placeholder ||
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3C/svg%3E`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder - shown while loading */}
      {!isLoaded && !hasError && (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
          style={{ filter: "blur(10px)", transform: "scale(1.1)" }}
        />
      )}

      {/* Actual Image */}
      <img
        ref={imgRef}
        src={isInView ? src : placeholderSrc}
        alt={alt}
        srcSet={isInView && srcSet ? srcSet : undefined}
        sizes={sizes}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${hasError ? "hidden" : ""}`}
        {...props}
      />

      {/* Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

/**
 * ResponsiveImage Component - Wrapper for responsive images with picture element
 */
interface ResponsiveImageProps {
  src: string;
  alt: string;
  mobileSrc?: string;
  tabletSrc?: string;
  desktopSrc?: string;
  className?: string;
  aspectRatio?: string;
}

export const ResponsiveImage = ({
  src,
  alt,
  mobileSrc,
  tabletSrc,
  desktopSrc,
  className = "",
  aspectRatio,
}: ResponsiveImageProps) => {
  const hasMultipleSources = mobileSrc || tabletSrc || desktopSrc;

  if (!hasMultipleSources) {
    return (
      <div className={aspectRatio ? `aspect-[${aspectRatio}] ${className}` : className}>
        <LazyImage src={src} alt={alt} className="w-full h-full" />
      </div>
    );
  }

  return (
    <picture className={className}>
      {mobileSrc && (
        <source media="(max-width: 767px)" srcSet={mobileSrc} type="image/webp" />
      )}
      {tabletSrc && (
        <source
          media="(min-width: 768px) and (max-width: 1199px)"
          srcSet={tabletSrc}
          type="image/webp"
        />
      )}
      {desktopSrc && (
        <source media="(min-width: 1200px)" srcSet={desktopSrc} type="image/webp" />
      )}
      <LazyImage
        src={src}
        alt={alt}
        className={aspectRatio ? `aspect-[${aspectRatio}] w-full` : "w-full"}
      />
    </picture>
  );
};

