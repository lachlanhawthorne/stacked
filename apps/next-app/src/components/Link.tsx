import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export interface LinkProps extends React.ComponentProps<typeof NextLink> {
  styles: React.CSSProperties
  hoverStyles: React.CSSProperties
  activeStyles: React.CSSProperties
}

export function Link(props: LinkProps) {
  const [ hovered, setHovered ] = useState(false)
  const { styles, hoverStyles, activeStyles, to, ...rest } = props

  const router = useRouter()
  const isActive = router.asPath == to

  return (
    <NextLink
      {...rest}
      href={to}
      style={
        { ...styles, ...(isActive ? activeStyles : {}), ...(hovered ? hoverStyles : {}) }
      }
      
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    />
  )
}

export default Link