import { CmsAppRouter } from "./routes"
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import superjson from 'superjson'

export const cmsTrpc = createTRPCProxyClient<CmsAppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc"
    })
  ],
  // transformer: superjson,
})