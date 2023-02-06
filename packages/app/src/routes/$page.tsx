import { Route, useMatch } from '@tanstack/react-router'
import { useLoaderInstance } from '@tanstack/react-loaders'
import { rootRoute } from './__root'
import { Markdown, Page as PageComponent } from 'ui'

import { Link } from '../components/Link'

const Page = () => {
  const { params } = useMatch()

  const { state: { data: page } } = useLoaderInstance({ 
    key: 'page',
    // @ts-ignore
    variables: params.page
  })

  // return <p>Someone new</p>

  return <PageComponent
    page={page}
    title={page.title}
    // linkComponent={Link}
  />
}

export const pageRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/$page',
  component: Page,
  onLoad: ({ context, preload, params }) => {
    return context.loaderClient.getLoader({ key: 'page' }).load({
      preload,
      variables: params.page
    })
  }
})

