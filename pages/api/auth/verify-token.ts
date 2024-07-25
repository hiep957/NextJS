import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;
  console.log("đã vào đây")

  if (!token) {
    return res.status(401).json({ isValid: false, message: 'No token provided' });
  }
  console.log("verify-token.ts: ", token);
  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return res.status(200).json({ isValid: true });
  } catch (error) {
    return res.status(401).json({ isValid: false, message: 'Invalid token' });
  }
}

// middleware.ts
