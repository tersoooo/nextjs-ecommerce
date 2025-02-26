import Image from "next/image";
import Product from "./Product";
import { getLatestProducts } from "@/lib/products";
import Link from "next/link";

export default async function HeroProduct() {
  const products = await getLatestProducts();

  console.log("Firebaseden gelen veriler:", products)

  if (!products || products.length < 0) {
    return <p>Ürünler yüklenemedi veya yeterli ürün yok.</p>;
  }

  const [heroProduct, product1, product2] = products;

  return (
    <div className="block px-5 w-full mt-5">
      <div className="flex gap-x-5 w-full">
        <div className="flex-1 bg-black relative group border border-[#282828] hover:border-blue-600 transition-colors rounded-xl flex items-center justify-center">
          <Link href={`/products/${heroProduct.id}`}>
          <Image
            src={heroProduct.imageUri}
            alt={heroProduct.title}
            width={600}
            height={600}
            unoptimized
            objectFit="contain"
            quality={100}
            className="max-h-[522px] object-cover group-hover:scale-105 duration-500 transition-all"
          />
          </Link>
          <div className="absolute top-60 left-17 flex gap-x-2 text-sm border border-[#282828] py-1 px-2 rounded-2xl">
            <span className="font-bold text-xs flex items-center">
              {heroProduct.title}
            </span>
            <p className="bg-blue-600 font-bold px-1.5 py-1.5 rounded-2xl">
              ${ heroProduct.price } USD
            </p>
          </div>
        </div>
        <div className="flex flex-col w-120 gap-y-5">
          <Link href={`/products/${product1.id}`}>
          <Product
            imageUri={product1?.imageUri}
            width={270}
            height={270}
            title={product1?.title}
            price={`$${product1.price}`}
            alt="Drawsting Bag Product"
          />
          </Link>
          <Link href={`/products/${product2.id}`}>
          <Product
            imageUri={product2?.imageUri}
            title={product2.title}
            price={`$${product2.price}`}
            alt="Product Cup"
            width={250}
            height={250}
          />
          </Link>
        </div>
      </div>
    </div>
  );
}
