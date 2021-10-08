import "../styles/globals.css";
import "react-multi-carousel/lib/styles.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import AppLayout from "../core/app/app.layout";
import AppContextProvider from "../core/app/app.context";
import Header from "../features/shared/header/header.components";
import Footer from "../features/shared/footer/footer.components";
import { Content } from "antd/lib/layout/layout";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AppContextProvider>
          <AppLayout>
            <Header />
            <Content>
              <Component {...pageProps} />
            </Content>
            <Footer />
          </AppLayout>
        </AppContextProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
export default MyApp;
