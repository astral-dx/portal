import * as React from 'react';
import Head from 'next/head';
import App, { AppProps, AppContext, AppInitialProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import {
  getTheme,
  Layout,
  User,
  UserProvider,
  Brand,
  BrandProvider,
  SnackbarProvider,
} from '@astral-dx/core';

import { createEmotionCache } from '../theme/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps {
  emotionCache?: EmotionCache;
  logoutPath: string;
  user?: User;
  brand: Brand;
}

export default function MyApp(props: MyAppProps & AppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, user, brand, logoutPath } = props;
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
      <SnackbarProvider>
        <ThemeProvider theme={ theme }>
          <UserProvider user={ user }>
            <BrandProvider brand={ brand }>
              <Layout logoutPath={ logoutPath }>
                <Component { ...pageProps } />
              </Layout>
            </BrandProvider>
          </UserProvider>
        </ThemeProvider>
      </SnackbarProvider>
    </CacheProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext): Promise<MyAppProps & AppInitialProps> => {
  const appProps = await App.getInitialProps(context);
  const { req, res } = context.ctx;

  if (typeof window !== "undefined") {
    const { user, brand, logoutPath } = await (await fetch('/api/bootstrap')).json(); 

    return {
      ...appProps,
      logoutPath,
      user,
      brand,
    }
  }

  if (!req || !res) {
    throw new Error('Unable to initialize app, no request in context');
  }

  const config = $config;

  const ctx = { req, res, config };
  const [ logoutPath, user, brand ] = await Promise.all([
    config.plugin.authentication.logoutPath({ ctx }),
    config.plugin.authentication.getUser({ ctx }),
    config.plugin.branding.getBrand({ ctx }),
  ]);

  return {
    ...appProps,
    logoutPath,
    user,
    brand,
  }
}