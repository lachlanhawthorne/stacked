import tw from "twin.macro"
import { useEffect } from "react"
import { CmsAppRouterOutputs } from "cms/trpc/routes/index"
import { BsChevronRight } from "react-icons/bs"
import { FiArrowLeft } from "react-icons/fi"

import { DocumentRenderer } from "@keystone-6/document-renderer"
import { LinkComponentProxy } from "app/src/stores/components"
import { useStore } from '@nanostores/react'

type Post = CmsAppRouterOutputs["blog"]["post"]

const Container = tw.div`
  flex
  flex-col
  w-full
  max-w-3xl
  text-lg
`

const Heading = tw.h1`
  text-3xl
  font-bold
  my-6
  line-height[1]
  max-w-2xl
  leading-relaxed
`

// const Link = tw.a`
//   text-inherit
//   no-underline
//   hover:underline
//   cursor-pointer
//   transition-colors
//   duration-200
// `

const Text = tw.p`
  my-0
  mx-0
`

const Breadcrumbs = tw.div`
  flex
  flex-row
  items-center
  space-x-2
  text-lg
  text-neutral-500
  flex-1
  mr-8
`

const Breadcrumb = tw.div`
  flex
  flex-row
  items-center
  space-x-2
`

const BreadcrumbStyledLink = tw.a`
  flex
  text-inherit
  no-underline
  hover:underline
  cursor-pointer
  transition-colors
  duration-200
  m-0
  // line-clamp-1
`

const BreadcrumbLink = ({href, title}: {href: string, title: string,}) => {
  const linkComponentProxy = useStore(LinkComponentProxy)
  const LinkComponent = linkComponentProxy.component

  return (
    <LinkComponent to={href}>
      <BreadcrumbStyledLink>
        {title}
      </BreadcrumbStyledLink>
    </LinkComponent>
  )
}

const BreadcrumbSeparator = tw.div`
  flex
  justify-center
  items-center
  text-neutral-500
`

export type PostProps = {
  title?: string
  repoUrl?: string
  post: Post
}

const stringToSlate = (str: string) =>
    JSON.parse(str) as unknown as Parameters<
      typeof DocumentRenderer
    >["0"]["document"];

const DocumentContainer = tw.div`
  max-w-2xl
  leading-relaxed
`

export function Post({ title, repoUrl, post }: PostProps) {

  const slate = stringToSlate(post?.content as string)
  
  return (
    <Container>
      <Breadcrumbs>
        <Breadcrumb>
          <FiArrowLeft size="1rem"  />
          <BreadcrumbLink href="/posts" title="All Posts" />
        </Breadcrumb>
      </Breadcrumbs>

      <Heading>{post?.title}</Heading>
      <DocumentContainer>
        <DocumentRenderer document={slate} />
      </DocumentContainer>
    </Container>
  )
}