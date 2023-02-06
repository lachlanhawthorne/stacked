import tw from 'twin.macro'

export const StyledLink: any = ({ href, children, linkComponent : LinkComponent }: { 
  href: string; 
  children: React.ReactNode;
  linkComponent: React.ComponentType<{ href: string; children: React.ReactNode; }>
}) => {
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