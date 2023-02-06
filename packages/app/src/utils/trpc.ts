import { createTRPCReact } from "@trpc/react-query";
import type { CmsAppRouter } from "cms/trpc/routes";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";

export const trpc = createTRPCReact<CmsAppRouter>({})

export const client = createTRPCProxyClient<CmsAppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc",
    }),
  ],
  // transformer: superjson,
})