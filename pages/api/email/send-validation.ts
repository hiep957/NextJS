import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { serialize } from "cookie";
import { ca } from "date-fns/locale";
import Redis from "ioredis";

const redis = new Redis();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "hiepma80@gmail.com",
    pass: "rcgw rzlh olat frtr",
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email } = req.body;
    //sinh ra 6 số ngẫu nhiên
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    // trong thoi gian con han thi ko dc thay the otp
    await redis.set(email, verificationCode, "EX", 60*60); //1 hour
    
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email Verification Code",
        text: `Mã xác thực đăng ký của bạn là: ${verificationCode}`,
        html: `<p>Mã xác thực đăng ký của bạn là: <strong>${verificationCode}</strong></p>`,
      });
      res.status(200).json({ message: "Mã xác thực đã được gửi" });
    } catch (err) {
      res
        .status(500)
        .json({
          message: "Có lỗi xảy ra khi gửi mã xác thực",
          error: err.message,
        });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
