"use client";
import { useState, useEffect } from "react";
import { BsBasket } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import CartModal from "./CartModal";
import Link from "next/link";
import { useSelector } from "react-redux";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null)

  //Basket
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setIsClient(true);
  }, []);


  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const searchProducts = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        setError(null);
        return;
      }

      setIsSearching(true);
      setError(null);
      try {
        const productsRef = collection(db, "Products");
        const q = query(productsRef, where("title", ">=", searchQuery), where("title", "<=", searchQuery + "\uf8ff"));
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(results)
        setSearchResults(results.slice(0, 5));
      } catch (err) {
        console.error("Arama sırasında hata:", err);
        setError("Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.");
        setSearchResults([]); 
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(() => {
      searchProducts();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <nav className="h-10 flex items-center px-5 mt-4 relative">
        <div className="flex-shrink-0 flex items-center space-x-4">
          <div className="flex flex-none items-center justify-center border border-neutral-700 bg-black h-[40px] w-[40px] rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Acme Store logo"
              viewBox="0 0 32 28"
              className="fill-white h-[35px] w-[24px]"
            >
              <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z"></path>
              <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z"></path>
            </svg>
          </div>
          <Link href="/" className="uppercase text-base font-bold flex-none">
            acme store
          </Link>
          <ul className="hidden gap-6 text-sm md:flex md:items-center font-medium">
            <li>
              <Link
                href="#"
                className="text-neutral-500 underline-offset-4 hover:text-neutral-100 transition-colors hover:underline"
              >
                All
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-neutral-500 underline-offset-4 hover:text-neutral-100 transition-colors hover:underline"
              >
                Shirts
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-neutral-500 underline-offset-4 hover:text-neutral-100 transition-colors hover:underline"
              >
                Stickers
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex-grow max-w-lg ml-30 relative z-20">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for products..."
            className="w-full border border-[#262626] rounded-md px-3 py-2 text-sm font-semibold focus:outline-2 focus:outline-offset-3 outline-0 focus:outline-gray-500 hover:border-[#444]"
          />
          <IoIosSearch
            size={18}
            className="absolute right-2 top-2.5 text-gray-300"
          />
          {searchQuery && !isSearching && searchResults.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-black border border-neutral-700 rounded-md mt-1 max-h-60 overflow-y-auto z-50 shadow-md">
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="block p-2 hover:bg-neutral-800 transition-colors"
                >
                  <p className="text-sm text-white">{product.title}</p>
                  <p className="text-xs text-gray-300">${product.price} USD</p>
                </Link>
              ))}
            </div>
          )}
          {isSearching && (
            <div className="absolute top-full left-0 w-full bg-black border border-neutral-700 rounded-md mt-1 p-2 text-sm text-gray-300">
              Yükleniyor...
            </div>
          )}
          {error && (
            <div className="absolute top-full left-0 w-full bg-black border border-neutral-700 rounded-md mt-1 p-2 text-sm text-red-500">
              {error}
            </div>
          )}
        </div>

        <div className="flex-shrink-0 md:w-1/3 flex justify-end">
          <button aria-label="Open cart" onClick={toggleCart}>
            <div className="relative flex group h-11 w-11 items-center justify-center rounded-md border border-neutral-700 text-black transition-colors hover:border-blue-500">
              <BsBasket
                size={16}
                className="cursor-pointer text-white group-hover:scale-120 transition-all"
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 font-bold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </nav>
      {isClient && <CartModal isOpen={isCartOpen} onClose={toggleCart} />}
    </>
  );
}
