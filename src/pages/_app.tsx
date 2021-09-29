import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import AppLayout from "../core/app/app.layout";
import AppContextProvider from "../core/app/app.context";
import Header from "../features/shared/header/header.components";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AppContextProvider>
          <AppLayout>
            <Header />
            <Component {...pageProps} />
          </AppLayout>
        </AppContextProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
export default MyApp;
