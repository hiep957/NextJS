import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";
import Header from "./Header";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  // fetch 
  return (
    <div className="container mx-auto ">
      <Head>
        <title>My Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="px-8 mt-2 mb-2">{children}</main>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
