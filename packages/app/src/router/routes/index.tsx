import { Route } from '@tanstack/react-router'
import { useLoaderInstance } from '@tanstack/react-loaders'
import { rootRoute } from './__root'
import { HomeScreen } from '../../features/home/screen'

const Index = () => {
  const { state: { data } } = useLoaderInstance({ key: 'homeScreen' })
  return <HomeScreen readme={data} />
}

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
  onLoad: ({ context, preload }) => {
    return context.loaderClient.getLoader({ key: 'homeScreen' }).load({ preload })
  }
})