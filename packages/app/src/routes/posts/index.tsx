import { Route, useMatch, useSearch } from '@tanstack/react-router'
import { postsRoute } from '../posts'
import { useLoaderInstance } from '@tanstack/react-loaders'

import { PostPreviews } from 'ui'
import { Link } from '../../components/Link'

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
    <PostPreviews
      posts={posts}
      linkComponent={Link}
      pagination={{
        currentPage: search.page ?? 1,
        totalPages: 10,
      }}
    />
  )
}
