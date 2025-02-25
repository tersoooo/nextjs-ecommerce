"use client";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Product from "./Product";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";

export default function Slider() {

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    }
    fetchProducts();
  }, [])

  useEffect(() => {
    if (!emblaApi || !isClient || loading) return;

    let lastTime = 0;
    const scrollSpeed = 0.0001;
    let animationFrameId;

    const autoScroll = (time) => {
      if (!emblaApi) return;

      const timeDiff = time - lastTime;
      lastTime = time;

      if (timeDiff > 0) {
        let currentProgress = emblaApi.scrollProgress();
        currentProgress = (currentProgress + scrollSpeed * timeDiff) % 1;
        const totalSlides = emblaApi.scrollSnapList().length;
        emblaApi.scrollTo(currentProgress * totalSlides);
      }

      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [emblaApi, isClient, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[245px]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!products.length) {
    return <div>Ürün bulunamadı.</div>;
  }

  return (
    <div className="relative w-full">
      <div
        className="embla overflow-x-auto overflow-y-hidden py-4"
        ref={emblaRef}
      >
        <div className="embla__container flex w-full gap-x-2">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="embla__slide flex-shrink-0 w-1/3 h-[245px] bg-black rounded-lg border border-[#282828] hover:border-blue-600 transition-all flex items-center justify-center overflow-hidden"
            >
              <Product
                title={product.title}
                price={product.price}
                imageUri={product.imageUri}
                width={240}
                height={240}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}