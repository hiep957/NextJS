import type { NextApiRequest, NextApiResponse } from "next";
import { Post } from "../../types";

// Dữ liệu mẫu
const posts: Post[] = [
  {
    id: 1,
    title: "Giới thiệu về Next.js",
    content:
      "Next.js là một framework React mạnh mẽ cho phép xây dựng ứng dụng web hiện đại...",
    createdAt: "2023-07-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Tại sao nên sử dụng TypeScript?",
    content:
      "TypeScript là một superset của JavaScript, cung cấp tính năng kiểu tĩnh và các công cụ phát triển nâng cao...",
    createdAt: "2023-07-02T14:30:00Z",
  },
  // Thêm các bài post khác nếu muốn
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[] | { message: string }>
) {
  if (req.method === "GET") {
    const { id } = req.query;
    if (id) {
      const post = posts.find((p) => p.id === Number(id));
      if (post) {
        res.status(200).json([post]);
      } else {
        res.status(404).json({ message: "Không tìm thấy bài viết" });
      }
    } else {
      res.status(200).json(posts);
    }
  } else if (req.method === "POST") {
    const newPost: Post = {
      id: Date.now(),
      title: req.body.title,
      content: req.body.content,
      createdAt: new Date().toISOString(),
    };
    posts.push(newPost);
    res.status(201).json([newPost]);
    res.revalidate(`/posts/${Date.now()}`);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
