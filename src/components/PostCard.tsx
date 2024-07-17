// components/PostCard.tsx

import React from "react";
import Link from "next/link";
import { format } from 'date-fns';
interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}
interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formattedDate = format(new Date(post.createdAt), 'MM/dd/yyyy');
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">
          <Link href={`/posts/${post.id}`} legacyBehavior>
            <a className="text-blue-600 hover:text-blue-800">{post.title}</a>
          </Link>
        </h2>
        <p className="text-gray-600 text-sm mb-2">
          Published on {formattedDate}
        </p>
        <p className="text-gray-700 line-clamp-3">{post.content}</p>
      </div>
      <div className="bg-gray-100 px-4 py-2">
        <Link href={`/posts/${post.id}`} legacyBehavior>
          <a className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Read more
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
