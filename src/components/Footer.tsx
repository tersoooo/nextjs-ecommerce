import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="mx-auto container flex items-center gap-x-10 py-5 border-t border-t-neutral-700">
      <div className="flex gap-x-2 items-center">
        <div className="flex flex-none items-center justify-center border border-neutral-700 bg-black h-[30px] w-[30px] rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Acme Store logo"
            viewBox="0 0 32 28"
            className="fill-white h-[13px] w-[13px]"
          >
            <path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z"></path>
            <path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z"></path>
          </svg>
        </div>
        <Link href="/" className="uppercase text-base font-bold flex-none">
          acme store
        </Link>
      </div>
      <div className="flex flex-col text-sm">
              <div className="flex flex-col mt-9">
              <Link href="#" className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300 md:inline-block md:text-sm">Shipping & Returns</Link>
              <Link href="#" className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300 md:inline-block md:text-sm">Contact US</Link>
        </div>
          </div>
          <div className="flex justify-end flex-1">
              <Link target="_blank" href="https://github.com/tersoooo/nextjs-ecommerce">
              <FaGithub size={27} className="text-neutral-400 hover:text-white cursor-pointer" />
              </Link>
          </div>
    </div>
  );
}
