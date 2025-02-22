import { BsBasket } from "react-icons/bs";
import { useState, useEffect } from "react";


interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end transition-opacity duration-300"
    >

      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      ></div>


      <div
        className="relative w-full max-w-md h-screen bg-black shadow-lg transform transition-transform duration-300 translate-x-0"
      >

        <div className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-bold text-white">My Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-[#333] transition-colors cursor-pointer border border-[#282828] rounded p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>


              <div className="p-4 text-white h-72 flex flex-col gap-y-5 justify-center items-center">
              <BsBasket size={45} className="text-white" />
                <p className="text-gray-300 text-3xl font-semibold">Your cart is empty.</p>
                </div>
      </div>
    </div>
  );
}