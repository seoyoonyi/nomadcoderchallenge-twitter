import { SWRConfig } from "swr";
import { ReactElement, ComponentType } from "react";

interface AppProps {
  Component: ComponentType;
  pageProps: Record<string, any>;
}

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
