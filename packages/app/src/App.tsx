import { useState } from "react";
import { client, trpc } from "./utils/trpc";
import { LoaderClientProvider } from '@tanstack/react-loaders'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { loaderClient } from "./loaderClient";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export function App(props: {
  dehydratedRouter: ReturnType<typeof router.dehydrate>
  dehydratedLoaderClient: ReturnType<typeof loaderClient.dehydrate>
}) {
  useState(() => {
    loaderClient.hydrate(props.dehydratedLoaderClient)
    router.hydrate(props.dehydratedRouter)
  })

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:4000/trpc",
        }),
      ]
    })
  );

  return (
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <LoaderClientProvider loaderClient={loaderClient}>
            <RouterProvider router={router} />
          </LoaderClientProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </trpc.Provider>
  );
}

export { loaderClient } from './loaderClient'