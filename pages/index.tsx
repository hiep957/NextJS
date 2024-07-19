import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
// import PostCard from '../components/PostCard'
import { Post } from "../types";
import PostCard from "../components/PostCard";
import React from "react";

interface HomeProps {
  posts: Post[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Latest Posts</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Link href="/posts/new" legacyBehavior>
        <a className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
          Create New Post
        </a>
      </Link>
      <Link href="/products/:slug">About</Link>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Sử dụng URL tuyệt đối khi chạy trên server
    const protocol = "http";
    const host = "localhost:3000";
    const url = `${protocol}://${host}/api/posts`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch posts, status: ${res.status}`);
    }
    const posts: Post[] = await res.json();
    console.log(posts);
    return { props: { posts } };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { props: { posts: [] } };
  }
};

export default Home;
