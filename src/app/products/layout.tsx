import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function layout({ children }) {
  return (
    <div>
      <Header />
      <div className="mt-5 pb-10">{children}</div>
      <Footer />
    </div>
  );
}
