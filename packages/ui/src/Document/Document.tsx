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
  w-full
  max-w-3xl
  text-lg
`

export type DocumentProps = {
  title?: string;
  repoUrl?: string;
  children?: React.ReactNode;
  document: any
}


export function Document({ document }: DocumentProps) {
  return document && (
    <Container>
      <DocumentRenderer document={stringToSlate(document)} />
    </Container>
  )
}