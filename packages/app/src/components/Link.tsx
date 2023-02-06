import { useState } from 'react'
import { Link as RouterLink } from '@tanstack/react-router'

export interface LinkProps extends React.ComponentProps<typeof RouterLink> {
  styles: React.CSSProperties
  hoverStyles: React.CSSProperties
  activeStyles: React.CSSProperties
}

export function Link(props: LinkProps) {
  const [ hovered, setHovered ] = useState(false)
  const { styles, hoverStyles, activeStyles, ...rest } = props

  return (
    <RouterLink
      {...rest}
      style={
        hovered ? { ...styles, ...hoverStyles } : styles
      }
      activeProps={{ style: activeStyles }}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    />
  )
}

export default Link