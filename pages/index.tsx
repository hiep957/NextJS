import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import TestCard from "../components/testCard";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Post } from "../types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { incrementByAmount } from "../features/counter/couterSlice";
import { requestVerifiToken } from "../features/user/userSlice";

const HomePage = ({ posts }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loaded, user } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(requestVerifiToken());
  }, []);
  useEffect(() => {
    if (loaded) {
      if (user) {
        console.log("da login");
      }
      else {
        console.log("chua login");
        router.push("/login");
      } 
    }
  }, [loaded, user]);
  return (
    <Layout>
      <Container>
        <h1 className="mt-2">Home Page</h1>
        <Typography variant="h4" className="font-bold mb-16 ">
          Blog
        </Typography>
        <Grid container spacing={4} className="">
          <Grid item xs={12} sm={9}>
            <div className="">
              <Grid container spacing={2} className="">
                {posts.map((post: Post) => (
                  <Grid key={post._id} xs={12} sm={6} className="mb-8">
                    <TestCard content={true} post={post} />
                  </Grid>
                ))}
              </Grid>
            </div>

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
      <Button
        onClick={() => {
          dispatch(incrementByAmount(3));
        }}
      >
        +
      </Button>
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
