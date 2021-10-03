import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../components/layout'
import createEmotionCache from '../createEmotionCache';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../_core/utils/theme';

const clientSideEmotionCache = createEmotionCache();

function MyApp(props: AppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>      </ThemeProvider>

    </CacheProvider>
  )
}
export default MyApp
