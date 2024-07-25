import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { ParsedUrlQuery } from "querystring";
import Layout from "../../components/Layout";
import { Post } from "../../types";
import React from "react";
import {
  Typography,
  Container,
  Chip,
  Divider,
  Avatar,
  Box,
  Grid,
} from "@mui/material";
import { format } from "date-fns";
import CourseList from "../../components/CourseList";
interface PostPageProps {
  post: Post | null;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  if (!post) {
    return (
      <Layout>
        <div>Không tìm thấy bài viết</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9} className="mt-4">
          <Typography
            variant="h3"
            component="h1"
            className="mb-4 text-4xl font-bold"
          >
            {post.title}
          </Typography>
          <Box className="flex items-center mb-4">
            <Avatar
              src={post.author.avatar}
              alt={post.author.name}
              className="mr-4"
            />
            <Box>
              <Typography variant="subtitle1" className="font-semibold">
                {post.author.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {format(new Date(post.date), "MMMM dd, yyyy")}
              </Typography>
            </Box>
          </Box>
          <Box className="mb-6">
            {post.tag.map((tag) => (
              <Chip key={tag} label={tag} className="mr-2 mb-2" />
            ))}
          </Box>
          <Divider className="my-6" />
          <Typography variant="body1" className="mb-8 text-lg leading-relaxed">
            {post.content}
          </Typography>
          <Typography variant="body1" className="mb-8 text-lg leading-relaxed">
            Trong kho tài nguyên phong phú của dịch vụ này, người dùng có thể
            tìm gì cũng có, từ phim hay, phần mềm, ứng dụng đến tài liệu học tập
            và công việc. Khả năng tải nhanh và tải tốc độ cao giúp người dùng
            không phải chờ đợi lâu, đồng thời cung cấp trải nghiệm mượt mà và
            hài lòng. Download không giới hạn cho phép người dùng tải về bất kỳ
            nội dung nào mà họ mong muốn mà không gặp giới hạn nào.
          </Typography>
          <Divider className="my-6" />
          <Box className="mt-8 space-x-2 space-y-4">
            <Typography variant="h5" className="mb-4">
              Comments
            </Typography>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="Remy Sharp" />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                <p style={{ textAlign: "left" }}>
                  Tôi thấy bài viết rất hay! Cho bạn 1 like
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  posted 1 minute ago
                </p>
              </Grid>
            </Grid>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="Remy Sharp" />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                <p style={{ textAlign: "left" }}>
                  Tôi thấy bài viết rất hay! Cho bạn 1 like
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  posted 1 minute ago
                </p>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <CourseList></CourseList>
        </Grid>
      </Grid>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  PostPageProps,
  Params
> = async (context) => {
  const { id } = context.params!;

  try {
    const res = await fetch(`http://localhost:3000/api/posts?id=${id}`);

    if (!res.ok) {
      console.error(`Error fetching post: ${res.status} ${res.statusText}`);
      return { props: { post: null } };
    }

    const posts: Post[] = await res.json();
    const post = posts.find((p) => p.id === Number(id));

    if (!post) {
      console.error(`Post with id ${id} not found`);
      return { props: { post: null } };
    }

    return { props: { post } };
  } catch (error) {
    console.error("Lỗi khi fetch bài viết:", error);
    return { props: { post: null } };
  }
};

export default PostPage;
