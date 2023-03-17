import tw from 'twin.macro'
import { LinkComponentProxy } from 'app/src/stores/components'
import { useStore } from '@nanostores/react'

export const StyledLink: any = ({ href, children }: { 
  href: string; 
  children: React.ReactNode;
}) => {
  const linkComponentProxy = useStore(LinkComponentProxy)
  const LinkComponent = linkComponentProxy.component

  return (
    <LinkComponent href={href}>
      <a 
        href={href} 
        // @ts-ignore
        tw="
          cursor-pointer
          text-inherit
          hover:(
            text-neutral-500
          )
        "
      >
        {children}
      </a>
    </LinkComponent>
  )
};