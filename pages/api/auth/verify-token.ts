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
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const user: any = (decoded as any).userInfo;
    console.log("verify-token.ts UserId: ", user);
    return res.status(200).json({ isValid: true, user: user });
  } catch (error) {
    return res.status(401).json({ isValid: false, message: 'Invalid token' });
  }
}


