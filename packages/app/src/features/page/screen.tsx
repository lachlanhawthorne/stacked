import { Route } from '@tanstack/react-router'
import { Markdown, Document } from 'ui'
import { client } from '../../utils/trpc'

export function PageScreen({ page }: any) {
 
  return (
    <>
      <h1>{page.title}</h1>
      <Document document={page.content} />
    </>
  )
}

export async function pageQuery({ slug }: { slug: string}) {
  return await client.pages.bySlug.query({ slug })
}