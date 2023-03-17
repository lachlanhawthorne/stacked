import { useEffect, useState } from 'react';
import tw from 'twin.macro';
import { CmsAppRouterOutputs } from 'cms/trpc/routes/index'
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { RiCalendarLine, RiSearchLine } from 'react-icons/ri'
import React from 'react';

import { LinkComponentProxy } from 'app/src/stores/components'
import { useStore } from '@nanostores/react'

const stringToSlate = (str: string) =>
    JSON.parse(str) as unknown as Parameters<
      typeof DocumentRenderer
    >['0']['document'];

type Posts = CmsAppRouterOutputs['blog']['published']

const Container = tw.div`
  flex
  flex-col
  w-full
  space-y-12
  my-4
`

const Heading = tw.h2`
  font-size[1.75rem]
  leading-9
  font-bold
  my-0
  // margin-top[0]
  group-hover:underline
  pr-14
  my-5
  // line-height[1]
`
// @ts-ignore
const Text = tw.p`
  text-xl
  mb-0
  my-0
  // truncate with line clamp
  // line-clamp[2]
  // max-h-12
  // ts ignore next line
  leading-9
  // line-clamp-2
  // truncate with ellipsis
  // overflow-ellipsis
`

const PostLink = tw.a`
  text-inherit
  no-underline
  cursor-pointer
`

const Post = tw.div`
  max-w-2xl
`

const PostAttributes = tw.div`
  flex
  flex-row
  space-x-6
`

const Attribute = tw.div`
  flex
  flex-row
  space-x-2
  items-center
`

const AttributeText = tw.p`
  my-0
`

const SearchBar = tw.label`
  flex
  flex-row
  items-center
  bg-neutral-900
  max-w-2xl
  px-6
  space-x-3
  rounded-lg
  border-solid
  // border-neutral-600
  border-transparent
  focus-within:border-neutral-400
`

const SearchInput = tw.input`
  appearance-none
  bg-transparent
  w-full
  text-white
  placeholder-neutral-400
  py-3
  text-xl
  outline-none
  border-none
`

export type PostPreviewsProps = {
  posts: Posts
  pagination: {
    currentPage: number
    totalPages: number
  }
}

// function getPostsStore(posts: Posts) {
//   const [searchQuery, setSearchQuery] = useState('')
//   const [filteredPosts, setFilteredPosts] = useState(posts || [])

//   useEffect(() => {
//     const filtered = posts.filter((post) => {
//       return post.title.toLowerCase().includes(searchQuery.toLowerCase())
//     })
//     setFilteredPosts(filtered)
//   }, [searchQuery])

//   return {
//     searchQuery,
//     setSearchQuery,
//     filteredPosts
//   }
// }


export function PostPreviews({ pagination, posts }: PostPreviewsProps) {
  // const { searchQuery, setSearchQuery, filteredPosts } = getPostsStore(posts)
  // const [filteredPosts, setFilteredPosts] = useState(posts || [])

  // useEffect(() => {
  //   const filtered = posts.filter((post) => {
  //     return post.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   })
  //   setFilteredPosts(filtered)
  // }, [searchQuery])

  const linkComponentProxy = useStore(LinkComponentProxy)
  const LinkComponent = linkComponentProxy.component

  return (
    <Container>
      <SearchBar>
        <RiSearchLine size='1.75rem' />
        <SearchInput 
          type='search' 
          placeholder='Search post titles...' 
          // onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchBar>
      
      {
        posts?.map((post: any) => {
          const date = post?.publishDate?.toLocaleDateString('en-au', {
            day: 'numeric',
            month: 'short',
            // year: 'numeric'
          })
          return (
            <Post key={post.id}>
              <PostAttributes>
                { date && (
                  <AttributeText>
                    {date}
                  </AttributeText>
                ) }
                <AttributeText>
                  {post.views as Number > 0 
                    ? `${post.views} view${post.views as Number > 1 ? 's': ''}` 
                    : 'No views'
                  }
                </AttributeText>
              </PostAttributes>
              <LinkComponent to={`/posts/${post.id}`}>
                <PostLink className='group'>
                  <Heading>
                    {post.title}
                  </Heading>
                  <Text>{post.preview}</Text>
                </PostLink>
              </LinkComponent>
            </Post>
          )
        })
      }

      {/* Pagination */}
      {/* <div tw='flex flex-row space-x-4'>
        {pagination.currentPage > 1 && (
          <LinkComponent search={{ page: pagination.currentPage - 1}}>
            <a tw='text-xl text-neutral-400 hover:text-neutral-300'>Previous</a>
          </LinkComponent>
        )}
        {pagination.currentPage < pagination.totalPages && (
          <LinkComponent search={{ page: pagination.currentPage + 1}}>
            <a tw='text-xl text-neutral-400 hover:text-neutral-300'>Next</a>
          </LinkComponent>
        )}
      </div> */}
    </Container>
  )
}