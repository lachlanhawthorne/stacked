import superjson from 'superjson';
import { CmsTrpcContext } from './context';
import { initTRPC } from '@trpc/server';

export const t = initTRPC.context<CmsTrpcContext>().create({
  // transformer: superjson,
  errorFormatter({ shape }) {
    return {
      ...shape,
      data: {
        ...shape.data,
      },
    };
  },
});