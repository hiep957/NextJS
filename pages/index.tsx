import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { Box, Container, Grid, Typography } from "@mui/material";
import TestCard from "../components/testCard";
import { useUser } from "../lib/UserContext";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Post } from "../types";
// export interface Post {
//     _id: number;
//     title: string;
//     content: string;
//     createdAt: string;
//     author: {
//       name: string;
//       avatar: string;
//     };
//     date: string;
//     tag: string[];
//   }
const HomePage = ({ posts }) => {
  const { user, setUser } = useUser();
  const router = useRouter();
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch("/api/auth/verify-token", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Để gửi cookie cùng với request
        });

        const data = await response.json();
        console.log("data: ", data);
        if (!data.isValid) {
          router.push("/login");
        } else {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        router.push("/login");
      }
    };

    verifyToken();
  }, []);
  return (
    <Layout>
      <Container className="">
        <Grid container spacing={4} className="">
          <Grid item xs={12} sm={9} className="flex-row">
            <h1 className="mt-2">Home Page</h1>
            <Typography variant="h4" className="font-bold mb-4 mt-2">
              Blog
            </Typography>
            <Grid container spacing={4} className="mt-4">
              {posts.map((post: Post) => (
                <Grid key={post._id} xs={12} sm={6} className="mb-8">
                  <TestCard content={true} post={post} />
                </Grid>
              ))}
            </Grid>
              {/* <TestCard content={true} posts={posts} />
              <TestCard content={true} /> */}
            {/* {posts.map((post: Post) => (
              <Grid xs={12} sm={6}>
                <TestCard content={true} post={post} />
              </Grid>
            ))} */}
            {/* <TestCard content={true} posts={posts} />
              <TestCard content={true} /> */}
          </Grid>

          <Grid item sm={3} xs={12} className="">
            <div className="flex justify-center font-bold mb-2">
              Những bài posts gần đây
            </div>
            <div className="">
              <div className="mb-4">
                <TestCard content={false} post={posts[0]} />
              </div>
              <div>
                <TestCard content={false} post={posts[1]} />
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
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

export default HomePage;
