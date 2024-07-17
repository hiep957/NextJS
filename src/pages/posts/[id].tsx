import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Layout from '../../components/Layout'
import { Post } from '../../types'

interface PostPageProps {
  post: Post | null
}

interface Params extends ParsedUrlQuery {
  id: string
}

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  if (!post) {
    return <Layout><div>Không tìm thấy bài viết</div></Layout>
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">{new Date(post.createdAt).toLocaleDateString('vi-VN')}</p>
      <div className="prose max-w-none">{post.content}</div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch danh sách các ID bài viết
  const res = await fetch('http://localhost:3000/api/posts')
  const posts: Post[] = await res.json()

  // Tạo paths cho mỗi bài viết
  const paths = posts.map(post => ({
    params: { id: post.id.toString() }
  }))

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PostPageProps, Params> = async (context) => {
  const { id } = context.params!
  
  try {
    const res = await fetch(`http://localhost:3000/api/posts?id=${id}`)
    
    if (!res.ok) {
      console.error(`Error fetching post: ${res.status} ${res.statusText}`)
      return { props: { post: null }, revalidate: 60 }
    }

    const posts: Post[] = await res.json()
    const post = posts.find(p => p.id === Number(id))

    if (!post) {
      console.error(`Post with id ${id} not found`)
      return { props: { post: null }, revalidate: 60 }
    }

    return { props: { post }, revalidate: 60 }
  } catch (error) {
    console.error('Lỗi khi fetch bài viết:', error)
    return { props: { post: null }, revalidate: 60 }
  }
}

export default PostPage