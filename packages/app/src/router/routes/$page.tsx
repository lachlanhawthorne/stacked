import { Route, useMatch } from '@tanstack/react-router'
import { useLoaderInstance } from '@tanstack/react-loaders'
import { rootRoute } from './__root'
import { PageScreen } from '../../features/page/screen'

const Page = () => {
  const { params } = useMatch()

  const { state: { data: page } } = useLoaderInstance({ 
    key: 'page',
    // @ts-ignore
    variables: params.page
  })

  return <PageScreen page={page} />
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

