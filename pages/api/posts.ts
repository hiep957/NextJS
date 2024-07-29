import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../lib/db";// Make sure to create this file for DB connection
import Post from "../../models/Post";

// Database connection
const connectToDatabase = async () => {
  await connectDB();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const { id } = req.query;
      if (id) {
        const post = await Post.findById(id);
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: "Không tìm thấy bài viết" });
        }
      } else {
        const posts = await Post.find();
        if (posts.length === 0) {
          res.status(404).json({ message: "Không tìm thấy bài" });
        } else {
          res.status(200).json(posts);
        }
      }
    } catch (error) {
      res.status(500).json({ message: "Lỗi máy chủ", error });
    }
  } else if (req.method === "POST") {
    try {
      const newPost = {
        title: req.body.title,
        content: req.body.content,
        author: {
          name: req.body.author.name,
          avatar: req.body.author.avatar,
        },
        date: new Date().toISOString(),
        thumbnail: req.body.thumbnail,
        tag: req.body.tag,
        createdAt: new Date().toISOString(),
      };
      const post = await Post.create(newPost);
      res.status(201).json(post);
      res.revalidate(`/posts/${post._id}`);
    } catch (error) {
      res.status(500).json({ message: "Lỗi máy chủ", error });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
