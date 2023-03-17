import tw from "twin.macro";
import { useStore } from '@nanostores/react'
import { LinkComponentProxy } from 'app/src/stores/components'
import type { CmsAppRouterOutputs } from "cms/trpc/routes/index"

const Container = tw.div`
  flex
  flex-col
  justify-start
  // items-center
  w-full
  max-w-3xl
  border-bottom[1px solid]
  border-neutral-800
  bg-red-600
`

const Heading = tw.div`
  // text-inherit
  text-4xl
  font-bold
  margin-top[0]
  line-height[1]
  no-underline 
  pt-10
  pb-8
  hover:underline
  cursor-pointer
`

const Navigation = tw.nav`
  flex
  flex-row
  flex-wrap
  pb-10
  space-x-4
`

export type HeaderProps = {
  title?: string;
  repoUrl?: string;
  pagePaths?: CmsAppRouterOutputs['pages']['paths']
}

export function Header({ title, pagePaths }: HeaderProps) {
  const linkComponentProxy = useStore(LinkComponentProxy)
  const LinkComponent = linkComponentProxy.component

  return (
    <Container>
      <Heading>
        <LinkComponent to={"/"} href={"/"}>
          {title}
        </LinkComponent>
      </Heading>

      <Navigation>
        {[
          {
            title: "Home",
            href: "/"
          },
          {
            title: "Posts",
            href: "/posts"
          }
        ]?.map(({title, href}, i) => (
            <LinkComponent
              key={`header-page-link-${i}`}
              styles={tw`
                text-lg
                cursor-pointer
                rounded-lg
                py-2
                px-4
                border
                border-neutral-600
              `}
              hoverStyles={tw`bg-neutral-800 border-white`}
              activeStyles={tw`border-white`}
              to={href}
              href={href}
            >
                {title}
            </LinkComponent>
          )
        )}
        
        {
          pagePaths && pagePaths?.map(({ slug, title }, i) => {
            return (
              <LinkComponent
              key={`header-link-${i}`}
              styles={tw`
                text-lg
                cursor-pointer
                rounded-lg
                py-2
                px-4
                border
                border-neutral-600
              `}
              hoverStyles={tw`bg-neutral-800 border-white`}
              activeStyles={tw`border-white`}
              to={`/${slug}`}
              href={`/${slug}`}
            >
                {title}
            </LinkComponent>
            )
          })
        }
      </Navigation>
    </Container>
  )
}

