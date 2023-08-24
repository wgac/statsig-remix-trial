import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import { StatsigSynchronousProvider } from "statsig-react";
import Statsig from "statsig-node";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];


export async function loader() {
  await Statsig.initialize("secret-key-here")
  return Statsig.getClientInitializeResponse({ userID: "1" }, "client-key-here");
}

export default function App() {
  const initalizeValues = useLoaderData();
  return (
    <StatsigSynchronousProvider
      sdkKey="client-key-here"
      user={{ userID: "1" }}
      initializeValues={initalizeValues}
    >
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </StatsigSynchronousProvider>
  );
}
