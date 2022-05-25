import * as React from 'react';
import Head from 'next/head';
import App, { AppProps, AppContext, AppInitialProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import {
  getTheme,
  Layout,
  getPlugin,
  User,
  UserProvider,
  Brand,
  BrandProvider,
} from '@astral-dx/core';

import { createEmotionCache } from '../theme/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps {
  emotionCache?: EmotionCache;
  user?: User;
  brand: Brand;
}

export default function MyApp(props: MyAppProps & AppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, user, brand } = props;
  const theme = getTheme(brand);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="shortcut icon" href={brand.faviconHref} />
        <style dangerouslySetInnerHTML={{ __html: `
          .material-symbols-rounded {
            font-variation-settings:
            'FILL' 1,
            'wght' 400,
            'GRAD' 0,
            'opsz' 48
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          }
        ` }} />
        <title>{ brand.title }</title>
        <meta name="description" content={ brand.subtitle } />
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <ThemeProvider theme={ theme }>
        <UserProvider user={ user }>
          <BrandProvider brand={ brand }>
            <Layout>
              <Component { ...pageProps } />
            </Layout>
          </BrandProvider>
        </UserProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext): Promise<MyAppProps & AppInitialProps> => {
  const appProps = await App.getInitialProps(context);
  const { req } = context.ctx;

  if (!req) {
    throw new Error('Unable to initialize app, no request in context');
  }

  if (typeof window !== "undefined") {
    const { user, brand } = await (await fetch('/api/bootstrap')).json(); 

    return {
      ...appProps,
      user,
      brand,
    }
  }

  const plugin = getPlugin();
  const [ user, brand ] = await Promise.all([
    plugin.authentication.getUser(req),
    plugin.branding.getBrand(),
  ]);

  return {
    ...appProps,
    user,
    brand,
  }
}