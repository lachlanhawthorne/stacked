import App from 'next/app'
import { NProgress } from 'ui';
import { AppContainer } from 'app/src/features/root'
import { getCssText, globalStyles } from 'ui';
import { client } from 'app/src/utils/trpc';
import { Screen } from 'ui'

import { Link } from '../components/Link'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import type { AppContext, AppProps } from 'next/app'

const Styles = () => {
  return (
    <>
      <style id='stitches' dangerouslySetInnerHTML={{ __html: getCssText() }} />
      <style id='global' dangerouslySetInnerHTML={{ __html: globalStyles() }} />
    </>
  )
};

type MyAppProps = AppProps & {
  pagePaths: any[]
}

export default function MyApp({ Component, pageProps, pagePaths }: MyAppProps) {

  const router = useRouter()

  const [state, setState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  })

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }))
    }

    const handleRouteChangeEnd = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }))
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeEnd)
    router.events.on('routeChangeError', handleRouteChangeEnd)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeEnd)
      router.events.off('routeChangeError', handleRouteChangeEnd)
    }
  }, [router.events])
  
  return (
    <>
      <NProgress isRouteChanging={state.isRouteChanging} key={state.loadingKey} />

      <Screen>
        <AppContainer 
          pagePaths={pagePaths}
          linkComponent={Link}
        >
          <Component {...pageProps} />
        </AppContainer>
        <Styles />
      </Screen>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  const pagePaths = await client.pages.paths.query()

  return { 
    ...appProps,
    pagePaths
  }
}