/// <reference types="vite/client" />
import type { ReactNode } from 'react';
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import TanStackQueryDevtools from '../integrations/devtools';
import appCss from '../styles.css?url';
import PageHeader from '../components/PageHeader';
import ImageLink from '../components/ImageLink';
import type { QueryClient } from '@tanstack/react-query';
import custom from '../custom.module.css';
import '../globals.css';

export interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <header className={custom.titleHeader}>
          <PageHeader />{' '}
          <ImageLink
            pageTarget="/courses"
            src="https://img.icons8.com/ios7/512/FFFFFF/settings.png"
            alt="Settings"
          />
          <ImageLink pageTarget="/courses" src="/inbox.png" alt="Inbox" />
        </header>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
