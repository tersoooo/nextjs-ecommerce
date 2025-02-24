"use client";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Product from "./Product";
import Link from "next/link";

export default function Slider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!emblaApi || !isClient) return;

    let lastTime = 0;
    const scrollSpeed = 0.0001;
    let animationFrameId;

    const autoScroll = (time) => {
      if (!emblaApi) return;

      const timeDiff = time - lastTime;
      lastTime = time;

      if (timeDiff > 0) {
        let currentProgress = emblaApi.scrollProgress();
        currentProgress = (currentProgress + scrollSpeed * timeDiff) % 1; // Sürekli döngü
        const totalSlides = emblaApi.scrollSnapList().length;
        emblaApi.scrollTo(currentProgress * totalSlides); // Milim milim kaydırma
      }

      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrameId); // Temizleme
  }, [emblaApi, isClient]);

  // Sunucu tarafında da temel DOM yapısını render et
  return (
    <div className="relative w-full">
      <div
        className="embla overflow-x-auto overflow-y-hidden py-4"
        ref={emblaRef}
      >
        <div className="embla__container flex w-full gap-x-2">
          <Link
            href="#"
            className="embla__slide flex-shrink-0 w-1/3 h-[245px] bg-black rounded-lg border border-[#282828] hover:border-blue-600 transition-all flex items-center justify-center overflow-hidden"
          >
            <Product
              title="Acme Hoodie 1"
              price="$50.00"
              imageUri="/images/hoodie-1.avif"
              width={240}
              height={240}
            />
          </Link>
          <Link
            href="#"
            className="embla__slide flex-shrink-0 w-1/3 h-[245px] bg-black rounded-lg border border-[#282828] hover:border-blue-600 flex items-center justify-center overflow-hidden"
          >
            <Product
              title="Acme Hoodie 2"
              price="$55.00"
              imageUri="/images/t-shirt-1.avif"
              width={240}
              height={240}
            />
          </Link>
          <Link
            href="#"
            className="embla__slide flex-shrink-0 w-1/3 h-[245px] bg-black rounded-lg border border-[#282828] hover:border-blue-600 flex items-center justify-center overflow-hidden"
          >
            <Product
              title="Acme Hoodie 2"
              price="$55.00"
              imageUri="/images/hoodie-1.avif"
              width={240}
              height={240}
            />
          </Link>
          <Link
            href="#"
            className="embla__slide flex-shrink-0 w-1/3 h-[245px] bg-black rounded-lg border border-[#282828] hover:border-blue-600 flex items-center justify-center overflow-hidden"
          >
            <Product
              title="Acme Hoodie 2"
              price="$55.00"
              imageUri="/images/hoodie-1.avif"
              width={240}
              height={240}
            />
          </Link>
          <Link
            href="#"
            className="embla__slide flex-shrink-0 w-1/3 h-[245px] bg-black rounded-lg border border-[#282828] hover:border-blue-600 flex items-center justify-center overflow-hidden"
          >
            <Product
              title="Acme Hoodie 2"
              price="$55.00"
              imageUri="/images/hoodie-1.avif"
              width={240}
              height={240}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}