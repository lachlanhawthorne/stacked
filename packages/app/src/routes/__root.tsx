import { useEffect, useState } from 'react'
import { Outlet, RootRoute, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Header, Footer, Screen } from 'ui'
import type { RouterContext } from '../router'

import { useLoaderInstance } from '@tanstack/react-loaders'

import Link from '../components/Link'

export const rootRoute = RootRoute.withRouterContext<RouterContext>()({
  component: Root,
  onLoad: ({ context, preload }) =>
    context.loaderClient.getLoader({ key: 'pagePaths' }).load({ preload }),
})

function useLoadingStatus() {
  const { state } = useRouter();

  const [currentPath, setCurrentPath] = useState(state.currentLocation.pathname);
  const [pageIsLoading, setPageIsLoading] = useState(false);
  const [pageHasLoaded, setPageHasLoaded] = useState(false);

  useEffect(() => {
    if (state.latestLocation.pathname !== currentPath) {
      setPageHasLoaded(false);
      setPageIsLoading(true);
      setCurrentPath(state.latestLocation.pathname);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.latestLocation.pathname]);
  
  useEffect(() => {
    if(pageIsLoading) {
      setPageHasLoaded(!state.isFetching);
      setPageIsLoading(state.isFetching);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isFetching]);

  return { pageIsLoading, pageHasLoaded };
}  

function ProgressBar() {
  const { pageIsLoading, pageHasLoaded }  = useLoadingStatus();
  const [progress, setProgress] = useState<number>(0);
  const [barVisible, setBarVisible] = useState<boolean>(false);

  useEffect(() => {
    if (pageIsLoading) {
      setBarVisible(true);
      setProgress(1);

      let intervalId = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress >= 33) {
            clearInterval(intervalId);

            let innerInteralId = setInterval(() => {
              setProgress(prevProgress => {
                if (prevProgress >= 90 || pageHasLoaded) {
                  clearInterval(intervalId);
                  clearInterval(innerInteralId);
                  return 100;
                }
                return prevProgress + 1;
              });
            }, 1);
          }
          return prevProgress + 1;
        });
      }, 2);
    } else {
      if(pageHasLoaded) {
        setTimeout(() => {
          setBarVisible(false);
          setProgress(0);
        }, 600);
      }
    }
  }, [pageIsLoading, pageHasLoaded]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        opacity: progress > 0 ? 1 : 0,
        backgroundColor: 'rgb(0, 0, 0, 0.75)',
        paddingBottom: 1,
      }}
    >
      <div
        id="progressbar"
        style={{
          height: '1px',
          width: `${progress}%`,
          backgroundColor: 'rgba(255, 255, 255, 1)',
          transition: 'width 0.15s ease-in-out',
          willChange: 'width',
        }}
      />
    </div>
  );
}

function Root() {
  const {
    state: { data: pages },
  } = useLoaderInstance({ key: 'pagePaths' })


  return (
    <Screen>
      {/* <ProgressBar /> */}
      <Header 
        title="Keystone, tRPC, Tailwind, TanStack Blog"
        linkComponent={Link} 
        pages={pages}
      />
      <Outlet /> 
      <Footer />
      <TanStackRouterDevtools position={'bottom-right'} /> 
    </Screen>
  )
}
