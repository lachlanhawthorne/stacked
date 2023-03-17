import { Document } from 'ui'
import { client } from '../../../utils/trpc'

export function PostScreen({ post }: any) {
  return (
    <>
      <h1>{post.title}</h1>
      <Document document={post.content} />
    </>
  )
}

export async function postQuery({ id }: { id: string}) {
  return await client.blog.post.query({ id })
}