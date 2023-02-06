import tw, { css } from "twin.macro";
import type { CmsAppRouterOutputs } from "cms/trpc/routes/index"

// import ActiveLink from "./ActiveLink"

const Container = tw.div`
  flex
  flex-col
  justify-start
  // items-center
  w-full
  max-w-3xl
  border-bottom[1px solid]
  border-neutral-800
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
  pages?: CmsAppRouterOutputs['pages']['paths']
  linkComponent: React.ComponentType<any>
}

export function Header({ title, pages, linkComponent : LinkComponent }: HeaderProps) {
  return (
    <Container>
      <Heading>
        <LinkComponent to="/">
          {title}
        </LinkComponent>
      </Heading>


      {/* <Heading>{title}</Heading> */}

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
        ].map(({title, href}, i) => (
            <LinkComponent
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
            >
                {title}
            </LinkComponent>
          )
        )}
        
        {
          pages?.map(({ slug, title }, i) => {
            return (
              <LinkComponent
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
