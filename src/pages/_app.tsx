import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";
import AppLayout from "../core/app/app.layout";
import AppContextProvider from "../core/app/app.context";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import moment from "moment";
import "moment/locale/ar";

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { refetchOnWindowFocus: false, refetchOnMount: true },
        },
      })
  );

  useEffect(() => {
    queryClient.refetchQueries();
    moment.locale(locale);
  }, [locale, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AppContextProvider>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </AppContextProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
export default MyApp;
