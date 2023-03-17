import { Loader, LoaderClient } from '@tanstack/react-loaders'
import { client } from '../utils/trpc'

export type PostType = {
  id: string
  title: string
  body: string
}

export const readmeLoader = new Loader({
  key: 'homeScreen',
  loader: async () => {
    console.log('Fetching readme...')
    return client.pages.readme.query()
  }
})

export const postsLoader = new Loader({
  key: 'posts',
  loader: async (page) => {
    console.log('Fetching posts...')
    return client.blog.published.query({ page: page as number })
  },
})

export const postLoader = new Loader({
  key: 'post',
  loader: async (postId: string) => {
    console.log(`Fetching post with id ${postId}...`)
    return client.blog.post.query({ id: postId })
  },
  onAllInvalidate: async () => {
    await postsLoader.invalidateAll()
  },
})

export const pagePathsLoader = new Loader({
  key: 'pagePaths',
  loader: async () => {
    console.log('Fetching page paths...')
    return client.pages.paths.query()
  },
})

export const pageLoader = new Loader({
  key: 'page',
  loader: async (slug: string) => {
    console.log(`Fetching page with slug ${slug}...`)
    return client.pages.bySlug.query({ slug })
  },
})

export const createLoaderClient = () => {
  return new LoaderClient({
    getLoaders: () => [
      postsLoader, 
      postLoader,
      pagePathsLoader,
      readmeLoader,
      pageLoader
    ],
  })
}

export const loaderClient = createLoaderClient()

// Register things for typesafety
declare module '@tanstack/react-loaders' {
  interface Register {
    loaderClient: ReturnType<typeof createLoaderClient>
  }
}
