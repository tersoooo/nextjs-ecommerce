"use client";
import { db } from "@/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { CiCirclePlus } from "react-icons/ci";
import { addToCart } from "@/lib/cartSlice";
import Link from "next/link";
import {useDispatch} from "react-redux";
import { useParams } from "next/navigation";
import React, {useState, useEffect} from "react";

export default  function ProductDetail() {
  const id = useParams().id
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            const productRef = doc(db, "Products", id);
            const productSnap = await getDoc(productRef);

            if (!productSnap.exists()) {
                return;
            }

            const data = { id: productSnap.id, ...productSnap.data() };
            setProduct(data);
        };

        fetchProduct();
    }, [id]);

  const handleAddToCart = () => {
      dispatch(
          addToCart({
              id: product.id,
              title: product.title,
              price: product.price,
              imageUri: product.imageUri,
          })
      )
  }

    if (!product) {
        return (
            <div className="flex justify-center items-center h-[245px]">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

  return (
      <div className="mx-auto max-w-screen-2xl px-4">
          <div className="flex rounded-lg border border-neutral-700 bg-black p-8 gap-8">
              <div className="max-h-[500px] basis-4/6 flex items-center justify-center">
                  <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
                  <Image
                      src={product.imageUri}
                      alt={product.title}
                      width={400}
                      height={400}
                      unoptimized
                      className="flex justify-center ml-50 mt-10"
                  />
                  </div>
                  
              </div>
              <div className="basis-2/6 space-y-5">
                  <h2 className="text-5xl font-bold">{product.title}</h2>
                  <p className="bg-blue-600 text-white inline-flex rounded-full px-2 font-semibold text-base">${product.price} USD</p>
                  <div className="border-b border-b-neutral-700"></div>
                  <div>
                      <h3 className="uppercase text-sm pb-5 font-bold">color</h3>
                      <div className="flex flex-wrap gap-3 items-center">
                          <button className="min-w-[48px] flex items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600 px-2 py-1 text-sm font-bold">Grey Triblend</button>
                          <button className="min-w-[48px] flex items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600 px-2 py-1 text-sm font-bold">Oatmeal Triblend</button>
                          <button className="flex min-w-[48px] items-center justify-center rounded-full border px-2 py-1 text-sm border-neutral-800 bg-neutral-900 relative z-10 cursor-not-allowed overflow-hidden text-neutral-500 ring-1 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:transition-transform dark:bg-neutral-900 ring-neutral-700 before:bg-neutral-700" disabled>White Fleck Triblend</button>
                          <button className="flex min-w-[48px] items-center justify-center rounded-full border px-2 py-1 text-sm border-neutral-800 bg-neutral-900 relative z-10 cursor-not-allowed overflow-hidden text-neutral-500 ring-1 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:transition-transform dark:bg-neutral-900 ring-neutral-700 before:bg-neutral-700" disabled>Aqua Triblend</button>
                      </div>
                  </div>
                  <div>
                      <h3 className="uppercase text-sm pb-5 font-bold">size</h3>
                      <div className="flex flex-wrap gap-3 items-center">
                          <button className="min-w-[48px] flex items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600 px-2 py-1 text-sm font-bold">S</button>
                          <button className="min-w-[48px] flex items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600 px-2 py-1 text-sm font-bold">M</button>
                          <button className="flex min-w-[48px] items-center justify-center rounded-full border px-2 py-1 text-sm border-neutral-800 bg-neutral-900 relative z-10 cursor-not-allowed overflow-hidden text-neutral-500 ring-1 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:transition-transform dark:bg-neutral-900 ring-neutral-700 before:bg-neutral-700" disabled>L</button>
                      </div>
                  </div>
                  <div className="">
                      <p className="text-sm text-gray-300 font-medium">
                      {product.desc}
                      </p>
                  </div>
                  <div className="relative group">
                      <button onClick={handleAddToCart} className="bg-blue-600 group-hover:bg-blue-600/90 transition-colors w-full rounded-full h-15 text-lg font-semibold">Add To Cart</button>
                      <CiCirclePlus size={30} className="absolute top-4 left-4 group-hover:text-gray-300" />
                  </div>
              </div>
          </div>
    </div>
  );
}
