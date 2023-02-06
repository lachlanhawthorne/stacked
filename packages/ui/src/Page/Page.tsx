import { useEffect } from "react"
import tw from "twin.macro"

import { DocumentRenderer } from "@keystone-6/document-renderer"


const stringToSlate = (str: string) =>
    JSON.parse(str) as unknown as Parameters<
      typeof DocumentRenderer
    >["0"]["document"];


const Container = tw.div`
  text-black
  dark:text-white
  flex
  flex-col
  items-center
  // min-h-screen
`

const Content = tw.div`
  flex
  flex-col
  w-full
  max-w-3xl
  text-lg
`

export type PageProps = {
  title?: string;
  repoUrl?: string;
  children?: React.ReactNode;
  page: any
}


export function Page({ page }: PageProps) {
  const pageDocument = stringToSlate(page.content)

  return (
    <Container>
      <Content>
        <h1>{page.title}</h1>
        <DocumentRenderer document={pageDocument} />
      </Content>
    </Container>
  )
}