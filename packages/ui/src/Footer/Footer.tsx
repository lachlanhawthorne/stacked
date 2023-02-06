import tw from "twin.macro";
import { useEffect } from "react";
import { RiGithubFill } from "react-icons/ri";

const Container = tw.div`
  flex
  flex-row
  items-center
  space-x-3
  py-8
  w-full
  max-w-3xl
  text-inherit
  text-lg
  border-top[1px solid]
  border-neutral-700
`

const Heading = tw.h1`
  font-size[1.75rem]
  font-bold
  mb-3
  margin-top[0]
  line-height[1]
`

const Link = tw.a`
  text-inherit
  no-underline
  hover:underline
  cursor-pointer
  transition-colors
  duration-200
`

const Text = tw.p`
  my-0
`

export type FooterProps = {
  title?: string;
  repoUrl?: string;
}

export function Footer({ title, repoUrl }: FooterProps) {
  return (
    <Container>
      <RiGithubFill size="1.5rem"/>
      <Text>View on GitHub</Text>
    </Container>
  )
}