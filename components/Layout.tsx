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
    <div className="container mx-auto px-4">
      <Head>
        <title>My Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="py-8">{children}</main>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
