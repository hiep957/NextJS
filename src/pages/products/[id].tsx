// pages/products/[id].tsx

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

interface ProductProps {
  product: Product;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`http://localhost:3000/api/products?id=${id}`);
  const product = await res.json();

  if (!product.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};

const ProductPage: React.FC<ProductProps> = ({ product }) => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50">
        <Link href="/products">
          <span className="text-blue-500 hover:text-blue-600 mb-4 inline-block">
            &larr; Back to Products
          </span>
        </Link>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex ">
              <div className="w-1/2">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {product.name}
                </h1>
                <div className="">
                  <Image
                    width={200}
                    height={200}
                    src={product.image}
                    alt={product.name}
                  ></Image>
                </div>
                <p className="text-gray-600 mb-6">{product.description}</p>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-center pb-4 text-3xl font-bold text-gray-800 mb-4">
                  Thông số kỹ thuật
                </div>
                <div>
                  <span className="font-bold">Công nghệ màn hình: </span>Amoled
                </div>
                <div>
                  <span className="font-bold">Độ phân giải: </span>2670 x 1200
                </div>
                <div>
                  <span className="font-bold">Kích thước màn hình: </span>6.36"
                </div>
                <div>
                  <span className="font-bold">Số khe SIM: </span>2
                </div>
                <div>
                  <span className="font-bold">Dung lượng pin sản phẩm: </span>4610mAh
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </span>
              <button className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
