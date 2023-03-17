import { PostPreviews } from 'ui'
import { client } from '../../utils/trpc'

export function PostsScreen({ posts,  }: any) {
  return (
    <>
      <h1>Posts</h1>
      <PostPreviews posts={posts} pagination={{
        currentPage: 1,
        totalPages: 1,
      }} />
    </>
  )
}

export async function postsQuery() {
  return await client.blog.published.query({ page: 1 })
}