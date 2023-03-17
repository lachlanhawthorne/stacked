import { Route, useMatch, useSearch } from '@tanstack/react-router'
import { postsRoute } from '../posts'
import { useLoaderInstance } from '@tanstack/react-loaders'

import { PostsScreen } from '../../../features/posts/screen'

export const postsIndexRoute = new Route({
  getParentRoute: () => postsRoute,
  path: '/',
  component: Posts,
  errorComponent: () => 'Oh crap',
  onLoad: ({ context, preload, search }) =>
    context.loaderClient.getLoader({ key: 'posts' }).load({ 
      preload,
      variables: search.page ?? 1
    }),
})

function Posts() {
  const search = useSearch({ from: postsIndexRoute.id })

  const { state } = useLoaderInstance({ 
    key: 'posts',
    variables: search.page ?? 1,
    strict: false
  })

  const { data: posts } = state

  return (
    <PostsScreen
      posts={posts}
      pagination={{
        currentPage: search.page ?? 1,
        totalPages: 10,
      }}
    />
  )
}
