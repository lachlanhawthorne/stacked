import { useRouter } from "next/router"

import { client } from "app/src/utils/trpc"

import { HomeScreen, readmeQuery } from "app/src/features/home/screen"
import { PageScreen, pageQuery } from "app/src/features/page/screen"
import { PostsScreen, postsQuery } from "app/src/features/posts/screen"
import { PostScreen, postQuery } from "app/src/features/posts/post/screen"

export default function Page(props: any) {
  const router = useRouter()

  switch(router.query.page?.[0]) {
    case undefined:
      return <HomeScreen {...props} />
    case 'posts':
      if(router.query.page?.length > 1) {
        return <PostScreen {...props} />
      } else {
        return <PostsScreen {...props} />
      }
    default:
      return <PageScreen {...props} />
  }
}

export async function getStaticPaths() {
  const pagePaths = await client.pages.paths.query()
  const postPaths = await client.blog.paths.query()

  return {
    paths: [
      { params: { page: [] } },
      ...pagePaths.map(({slug}) => ({ params: { page: [slug] } })),

      { params: { page: ['posts'] }},
      ...postPaths.map(({slug}) => ({ params: { page: ['posts', slug] } }))
    ],
    fallback: false,
  }
}

export async function getStaticProps({ params }: any) {
  // if not index
  if(params?.page?.length > 0) {
    switch(params.page[0]) {
      case 'posts':
        if(params.page.length > 1) {
          return {
            props: {
              post: await postQuery({ id: params.page[1] })
            }
          }
        } else {
          return {
            props: {
              posts: await postsQuery()
            }
          }
        }
      default:
        return {
          props: {
            page: await pageQuery({ slug: params.page[0] })
          }
        }
    }
  } else {
    return {
      props: {
        readme: await readmeQuery()
      }
    }
  }

}