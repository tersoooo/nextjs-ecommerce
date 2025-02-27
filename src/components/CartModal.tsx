import { BsBasket } from "react-icons/bs";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {removeFromCart, updateQuantity, clearCart} from "@/lib/cartSlice";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [quantities, setQuantities] = useState({})

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "linear",
        stiffness: 100,
        damping: 20,
        duraiton: 0.7,

      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const handleQuantityChange = (id, newQuantity) => {
      setQuantities((prev) => ({...prev, [id] : newQuantity}));
      dispatch(updateQuantity({id, quantity: newQuantity}))
  }

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
  }

  const totalAmount = cartItems.reduce(
      (total, item) => total + item.price * (quantities[item.id] || item.quantity),
      0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end bg-black/40 duration-300"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
        >
          <motion.div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
          />

          <motion.div
              className="relative w-full max-w-md h-screen backdrop-blur-xl bg-black/50 border-l border-neutral-700"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
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

            <div className="p-4 text-white h-[calc(100vh-8rem)] overflow-y-auto">
              {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col gap-y-5 justify-center items-center">
                    <BsBasket size={45} className="text-white"/>
                    <p className="text-gray-300 text-3xl font-semibold">
                      Your cart is empty.
                    </p>
                  </div>
              ) : (
                  <div className="space-y-4">
                    <ul className="space-y-4">
                      {cartItems.map((item) => (
                          <li
                              key={item.id}
                              className="flex items-center justify-between border-b border-neutral-700 py-2"
                          >
                            <div className="flex items-center gap-4">
                              <Image
                                  src={item.imageUri}
                                  alt={item.title}
                                  width={50}
                                  height={50}
                                  objectFit="cover"
                                  className="rounded-md"
                                  unoptimized
                              />
                              <div>
                                <h3 className="text-sm font-semibold">{item.title}</h3>
                                <p className="text-sm text-gray-300">
                                  ${item.price} x{" "}
                                  <input
                                      type="number"
                                      min="1"
                                      value={quantities[item.id] || item.quantity}
                                      onChange={(e) =>
                                          handleQuantityChange(
                                              item.id,
                                              parseInt(e.target.value) || 1
                                          )
                                      }
                                      className="w-12 p-1 bg-neutral-900 border border-neutral-700 rounded-md"
                                  />
                                </p>
                                <p className="text-sm text-gray-300">
                                  Color: {item.color}
                                </p>
                              </div>
                            </div>
                            <button
                                onClick={() => handleRemove(item.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </li>
                      ))}
                    </ul>
                  </div>
              )}
              {cartItems.length > 0 && (
                  <div className="p-4 border-t border-neutral-700">
                    <p className="text-lg font-bold">
                      Total: ${totalAmount.toFixed(2)} USD
                    </p>
                    <button
                        onClick={() => dispatch(clearCart())}
                        className="mt-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
                    >
                      Clear Cart
                    </button>
                  </div>
              )}
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
