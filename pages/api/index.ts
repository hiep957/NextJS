import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("connecting db");
    await connectDB();
    console.log("connected db");
    res.status(200).json({ name: "123" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
