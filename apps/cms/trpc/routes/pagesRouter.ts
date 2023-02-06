import fs from 'fs'
import path from 'path'

import { t } from "../trpc";
import { z } from 'zod';

const gql = String.raw as any

export const pagesRouter = t.router({
  published: t.procedure.query(async ({ ctx }) => {
    const data = (await ctx.keystoneCtx.prisma.page.findMany({}))
    return data.map((page) => {
      return {
        ...page,
        preview: JSON.parse(page.content)[0] 
          ? JSON.parse(page.content)[0].children[0].text
          : ""
      }
    });
  }),

  paths: t.procedure.query(async ({ ctx }) => {
    const data = (await ctx.keystoneCtx.prisma.page.findMany({}))
    return data.map((page) => {
      return {
        title: page.title,
        slug: page.slug
      }
    });
  }),

  bySlug: t.procedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {

      const data = await ctx.keystoneCtx.prisma.page.findUnique({
        where: {
          slug: input.slug
        },
      });

      const contentData: any = await ctx.keystoneCtx.graphql.run({
        query: gql`
          query pageContent($slug: String!) {
            page(where: { slug: $slug }) {
              content {
                document(hydrateRelationships: true)
              }
            }
          }
        `,
        variables: {
          slug: input.slug
        },
      })

      return {
        ...data,
        content: JSON.stringify(contentData.page.content.document)
      };
    }),

  // get page by id
  page: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.keystoneCtx.prisma.page.findUnique({
        where: {
          id: input.id
        },
      });
      return data;
    }),

  readme: t.procedure.query(async ({ ctx }) => {
    // check if file exists
    const readmePath = path.join(__dirname, "../../../README.md");
    if (fs.existsSync(readmePath)) {
      return fs
        .readFileSync(readmePath)
        .toString();
    } else {
      return null;
    }
  })
});