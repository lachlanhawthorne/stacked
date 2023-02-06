import { t } from '../trpc';
import { blogRouter } from './blogRouter';
import { pagesRouter } from './pagesRouter';

import type { inferRouterOutputs } from '@trpc/server';

export const appRouter = t.router({
  blog: blogRouter,
  pages: pagesRouter,
});

export type CmsAppRouter = typeof appRouter;
export type CmsAppRouterOutputs = inferRouterOutputs<CmsAppRouter>;
