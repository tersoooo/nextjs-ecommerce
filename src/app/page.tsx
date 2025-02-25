import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroProduct from "@/components/HeroProduct";
import Slider from "@/components/Slider";

export default function Home() {
  return (
    <>
      <Header />
      <HeroProduct />
        <div className="w-full px-5 py-5">
          <Slider />
        </div>
      <Footer />
    </>
  );
}
