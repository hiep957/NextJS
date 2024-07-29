import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";
import Header from "./Header";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow relative bg-color1">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-custom-gradient"></div>
        <div className="container mx-auto relative z-10">
          <main className="px-8 py-4">{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
