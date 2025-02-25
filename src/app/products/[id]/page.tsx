// app/products/[id]/page.js
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

export default async function ProductDetail({ params }) {
  const { id } = params;

  // Firestore'dan ürünü çek
  const productRef = doc(db, "Products", id);
  const productSnap = await getDoc(productRef);

  if (!productSnap.exists()) {
    return <div>Ürün bulunamadı.</div>;
  }

  const product = { id: productSnap.id, ...productSnap.data() };

  return (
    <div className="min-h-screen bg-black text-white p-4">

      <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
        {/* Ürün Görseli */}
        <div className="flex-1 bg-black rounded-lg overflow-hidden">
          <Image
            src={product.imageUri || "/images/default-product.jpg"}
            alt={product.title || "Product"}
            width={600}
            height={600}
            objectFit="contain"
            quality={100}
            unoptimized
            className="w-full h-auto"
          />
        </div>

        {/* Ürün Detayları */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">
            {product.title || "Product"}
          </h1>
          <p className="text-blue-600 text-xl mb-4">
            ${product.price || "0.00"} USD
          </p>

          {/* Beden Seçimi */}
          <div className="mb-4">
            <p className="text-sm mb-2">SIZE</p>
            <div className="flex gap-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded-full ${
                    size === "XL"
                      ? "border-white bg-white text-black"
                      : "border-gray-600"
                  } hover:border-blue-600`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Renk Seçimi */}
          <div className="mb-4">
            <p className="text-sm mb-2">COLOR</p>
            <div className="flex gap-2">
              {["White"].map((color) => (
                <button
                  key={color}
                  className={`w-6 h-6 rounded-full border border-gray-600 ${
                    color === "White" ? "bg-white" : "bg-gray-800"
                  } hover:border-blue-600`}
                >
                  {/* Renk için boş bir div, görsel olarak renk gösteriyor */}
                </button>
              ))}
            </div>
          </div>

          {/* Açıklama */}
          <p className="text-sm mb-4">
            {product.desc ||
              "Congratulations, you've found your next favorite sweatpants! Made from a soft cotton blend, these joggers feature a vibrant print that won't fade. 70% polyester, 27% cotton, 3% elastane. Slim fit. Soft cotton-feel fabric face. Brushed fleece fabric inside. Practical pockets. Elastic waistband with a white drawstring."}
          </p>

          {/* "Add to Cart" Butonu */}
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
