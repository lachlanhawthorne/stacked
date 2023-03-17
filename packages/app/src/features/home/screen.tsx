import { Markdown } from 'ui'
import { client } from '../../utils/trpc'

export function HomeScreen({readme}: any) {
  return <Markdown content={readme} />
}

export async function readmeQuery() {
  return client.pages.readme.query()
}