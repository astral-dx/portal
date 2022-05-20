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
  Reference,
  ReferencesProvider,
  TeamsProvider,
  Team,
  CredentialsProvider,
  Credential
} from '@astral-dx/core';

import { createEmotionCache } from '../theme/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps {
  emotionCache?: EmotionCache;
  user?: User;
  brand: Brand;
  references: Reference[];
  teams: Team[];
  credentials: Credential[];
}

export default function MyApp(props: MyAppProps & AppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, user, brand, references, teams, credentials } = props;
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
            'FILL' 0,
            'wght' 400,
            'GRAD' 0,
            'opsz' 48
          }
        ` }} />
        <title>{ brand.title }</title>
        <meta name="description" content={ brand.subtitle } />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <UserProvider user={user}>
          <TeamsProvider teams={teams}>
            <BrandProvider brand={brand}>
              <CredentialsProvider credentials={credentials}>
                <ReferencesProvider references={references}>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </ReferencesProvider>
              </CredentialsProvider>
            </BrandProvider>
          </TeamsProvider>
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
    const { user, brand, references, teams, credentials } = await (await fetch('/api/bootstrap')).json(); 

    return {
      ...appProps,
      user,
      brand,
      references,
      teams,
      credentials,
    }
  }

  const plugin = await getPlugin();
  const [ user, brand, references, teams, credentials ] = await Promise.all([
    plugin.authentication.getUser(req),
    plugin.branding.getBrand(),
    plugin.references.getReferences(),
    plugin.teamManagement.getUserTeams(req),
    plugin.credential.getUserCredentials(req),
  ]);

  return {
    ...appProps,
    user,
    brand,
    references,
    teams,
    credentials,
  }
}