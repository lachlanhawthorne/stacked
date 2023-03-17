import App from 'next/app'
import { AppContainer } from 'app/src/features/root'
import { getCssText, globalStyles } from 'ui';
import { client } from 'app/src/utils/trpc';
import { Screen } from 'ui'

import { Link } from '../components/Link'

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
  return (
    <Screen>
      <AppContainer 
        pagePaths={pagePaths}
        linkComponent={Link}
      >
          <Component {...pageProps} />
      </AppContainer>
      <Styles />
    </Screen>
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