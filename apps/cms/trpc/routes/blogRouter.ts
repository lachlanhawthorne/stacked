import { t } from "../trpc";
import { z } from 'zod';

export const blogRouter = t.router({
  published: t.procedure
    .input(z.object({ page: z.number().optional() }))
    .query(async ({ ctx, input }) => {
    const data = (await ctx.keystoneCtx.prisma.post.findMany({
      // pagination 
      skip: input.page ? (input.page - 1) * 1 : 0,
      take: 1,
    }))
    return data?.map((post) => {
      return {
        ...post,
        preview: JSON.parse(post.content)[0] 
          ? JSON.parse(post.content)[0].children[0].text
          : ""
      }
    });
  }),
  
  // get post by id
  post: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.keystoneCtx.prisma.post.findUnique({
        where: {
          id: input.id
        },
      });

      const updated = await ctx.keystoneCtx.prisma.post.update({
        where: {
          id: input.id
        },
        data: {
          views: data?.views ? data.views + 1 : 1
        }
      })

      return updated;
    }),

  paths: t.procedure.query(async ({ ctx }) => {
    const data = await ctx.keystoneCtx.prisma.post.findMany({
      where: {
        status: 'published'
      }
    });
    
    return data?.map((post) => {
      return {
        title: post.title,
        slug: post.id
      }
    });
  }),
});