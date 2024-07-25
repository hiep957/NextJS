import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import { Post } from "../types";
import PostCard from "../components/PostCard";
import React from "react";
import { Button, Grid, Typography } from "@mui/material";

interface HomeProps {
  posts: Post[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <Layout>
      <Typography variant="h4" className="font-bold mb-4">
        Latest Posts
      </Typography>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
      <div className="mt-4 flex space-x-4">
        <Link href="/posts/new" passHref>
          <Button
            variant="contained"
            color="primary"
            className="bg-blue-500 text-white"
          >
            Create New Post
          </Button>
        </Link>
        <Link href="/products/:slug" passHref>
          <Button variant="outlined" className="text-blue-500 border-blue-500">
            About
          </Button>
        </Link>
        <Link href="/dashboard" passHref>
          <Button variant="outlined" className="text-blue-500 border-blue-500">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
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
