import { useEffect } from "react"
import tw from "twin.macro"

const Container = tw.div`
  text-black
  dark:text-white
  flex
  flex-col
  items-center
  px-8
  // min-h-screen
`

const Content = tw.div`
  flex
  flex-col
  w-full
  max-w-3xl
  space-y-8
`

export type ScreenProps = {
  title?: string;
  repoUrl?: string;
  children?: React.ReactNode;
}


export function Screen({ children }: ScreenProps) {
  return (
    <Container>
      <Content>
        {children}
      </Content>
    </Container>
  )
}