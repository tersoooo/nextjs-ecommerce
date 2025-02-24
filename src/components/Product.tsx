import Image from "next/image";

export default function Product({imageUri, title, price, alt = "product", width = 300, height = 300}) {
  return (
    <div className="h-72 relative w-full group border flex items-center justify-center bg-black rounded-xl border-[#282828] hover:border-blue-600 transition-colors">
      <Image
        src={imageUri}
        alt={alt}
        width={width}
        height={height}
        objectFit="contain"
        quality={100}
        className="flex group-hover:scale-105 transition-all duration-500 object-cover justify-center"
      />
      <div className="absolute bottom-10 left-5 flex gap-x-1 text-xs border border-[#282828] py-1 items-center rounded-full px-1">
              <span className="font-bold pl-2">{ title }</span>
        <span className="bg-blue-600 rounded-2xl font-bold py-1.5 px-1">
          { price } USD
        </span>
      </div>
    </div>
  );
}
