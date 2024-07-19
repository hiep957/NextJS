import { NextApiRequest, NextApiResponse } from "next";

const products = [
  {
    id: 1,
    name: "Laptop Pro",
    price: 1299.99,
    description: "High-performance laptop for professionals",
    image:
      "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2024/07/12/13-xanh-la-1.png",
  },
  {
    id: 2,
    name: "Smartphone X",
    price: 799.99,
    description: "Latest smartphone with advanced features",
    image:"https://cdn.hoanghamobile.com/i/preview/Uploads/2024/01/30/samsung-galaxy-s24-3.png"
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 149.99,
    description: "True wireless earbuds with noise cancellation",
    image:"https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2024/07/12/13-hong-2.png"
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 249.99,
    description: "Fitness tracker and smartwatch in one",
    image:"https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2024/03/10/xiaomi-14-white-6.png"
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.id) {
    const product = products.find(
      (p) => p.id === parseInt(req.query.id as string)
    );
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } else {
    res.status(200).json(products);
  }
}
