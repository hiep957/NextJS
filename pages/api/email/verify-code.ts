import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";

const redis = new Redis();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === "POST") {
    const { code, email } = req.body;
    let storedCode = await redis.get(email);
    if (!code) {
      return res
        .status(400)
        .json({ message: "Mã xác thực không được để trống" });
    }

    console.log(storedCode);
    if (code === storedCode) {
      res.status(200).json({ message: "Mã xác thực hợp lệ" });
    } else {
      res.status(400).json({ message: "Mã xác thực không hợp lệ" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
