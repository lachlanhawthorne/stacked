import { Route, Outlet } from '@tanstack/react-router'
import { rootRoute } from './__root'

export const postsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'posts',
  component: () => <Outlet />
})
