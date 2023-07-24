import { useEffect, useState } from "react";
import { client, trpc } from "../utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouterContext } from "@tanstack/react-router"
import { httpBatchLink } from "@trpc/client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Header, Footer, NProgress } from "ui"

import { LinkComponentProxy } from 'app/src/stores/components'

const queryClient = new QueryClient();

export function AppContainer({ children, pagePaths, linkComponent }: any) {
  // useState(() => {
  //   loaderClient.hydrate(props.dehydratedLoaderClient)
  //   router.hydrate(props.dehydratedRouter)
  // })
  const [state, setState] = useState({
    lastUpdated: 0,
    isRouteChanging: false,
    loadingKey: 0,
  })
  
  useEffect(() => {
    LinkComponentProxy.set({ component: linkComponent })
  }, [])

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
          <NProgress />
          <Header 
            title="Keystone, tRPC, Tailwind, TanStack Blog"
            pagePaths={pagePaths}
          />
          {children} 
          <Footer />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </trpc.Provider>
  );
}

// export { loaderClient } from './loaderClient'