import { useLoaderInstance } from '@tanstack/react-loaders'
import { Route, useParams } from '@tanstack/react-router'
import { postsRoute } from '../posts'
import { Link } from '../../components/Link'

import { Post } from 'ui'

export const postIdRoute = new Route({
  getParentRoute: () => postsRoute,
  path: '$postId',
  component: PostComponent,
  onLoad: async ({ params: { postId }, preload, context }) =>
    context.loaderClient.getLoader({ key: 'post' }).load({
      variables: postId,
      preload,
    }),
})

function PostComponent() {
  const { postId } = useParams({ from: postIdRoute.id })
  const {
    state: { data: post },
  } = useLoaderInstance({ key: 'post', variables: postId })

  return (
    <Post
      post={post}
      linkComponent={Link}
    />
  )
}
