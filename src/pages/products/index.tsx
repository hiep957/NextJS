// pages/products/index.tsx

import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import Link from "next/link";
import Image from "next/image";
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface ProductsProps {
  products: Product[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
};

const ProductsPage: React.FC<ProductsProps> = ({ products }) => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="relative h-48 flex items-center justify-center">
                <div className="relative h-32 w-32 p-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <Link href={`/products/${product.id}`}>
                    <span className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
                      View Details
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
