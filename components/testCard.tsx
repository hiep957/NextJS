import { Grid } from "@mui/material";
import React from "react";
import Image from "next/image";
import { IoCalendarClearOutline } from "react-icons/io5";
import { Post } from "../types";
import { format } from "date-fns";
import Link from "next/link";
type TestCardProps = {
  content: boolean;
  post: Post;
};

const TestCard = ({ content, post }: TestCardProps) => {
  let formattedDate = format(new Date(post.date), "MM/dd/yyyy");
  return (
    <div>
      {/* <div>img</div> */}
      <Link href={`/posts/${post._id}`} passHref>
        <a>
          <Image
            src={post.thumbnail}
            width={405}
            height={228}
            alt="Pic"
            className="cursor-pointer"
          ></Image>
        </a>
      </Link>

      <h2 className="text-xl font-bold cursor-pointer">
        {/* Nâng cao toeic - từ vựng toiec part 7 thông dụng */}
        {post.title}
      </h2>
      <div className="flex flex-row space-x-2 mt-2">
        <div className="flex items-center justify-center h-6 w-6">
          <IoCalendarClearOutline height={24} width={24} />
        </div>
        <div>{formattedDate}</div>
      </div>
      {content && (
        <div>{post.content.split(" ").slice(0, 20).join(" ")}[...]</div>
      )}
    </div>
  );
};

export default TestCard;
