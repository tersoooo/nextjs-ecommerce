import Image from "next/image";

export default function ProductGrid() {
  return (
    <a href="#" className="block px-5 w-full mt-5">
      <div className="flex gap-x-5 w-full">
        <div className="flex-1 bg-black border border-[#282828] hover:border-blue-600 transition-colors rounded-xl flex items-center justify-center">
          <Image
            src="/images/t-shirt-1.avif"
            alt="product"
            width={600}
            height={600}
            objectFit="contain"
            quality={100}
            className="max-h-[522px] object-cover hover:scale-110 transition-all"
          />
        </div>
        <div className="flex flex-col w-120 gap-y-5">
          <div className="h-72 border bg-black rounded-xl border-[#282828] hover:border-blue-600 transition-colors">
            1.div
          </div>
          <div className="h-72 border bg-black rounded-xl border-[#282828] hover:border-blue-600 transition-colors">
            2.div
          </div>
        </div>
      </div>
    </a>
  );
}