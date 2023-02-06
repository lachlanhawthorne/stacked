import { Route } from '@tanstack/react-router'
import { useLoaderInstance } from '@tanstack/react-loaders'
import { rootRoute } from './__root'
import { Markdown } from 'ui'

const Index = () => {
  const {
    state: { data: readme },
  } = useLoaderInstance({ key: 'readme' })

  return (
    <Markdown 
      content={readme}
      // linkComponent={Link}
    />
  )
}

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
  onLoad: ({ context, preload }) => {
    return context.loaderClient.getLoader({ key: 'readme' }).load({ preload })
  }
})

