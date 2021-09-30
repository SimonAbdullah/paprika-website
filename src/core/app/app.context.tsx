import { useRouter } from "next/dist/client/router";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { TOKEN_KEY } from "../auth/auth.constants";
import { useIsAuthenticated } from "../auth/auth.hooks";
import { NEXT_LOCALE } from "./app.constants";
import { PagesUrls } from "../core";

export interface AppContextProviderProps {}

export type Directions = "rtl" | "ltr";

export interface AppContextProps {
  direction: Directions;
  isAuthenticated: boolean;
}

export const AppContext = createContext<AppContextProps>({
  direction: "ltr",
  isAuthenticated: false,
});

const AppContextProvider: React.FC<AppContextProviderProps> = (props) => {
  const [direction, setDirection] = useState<Directions>("ltr");

  const { locale, defaultLocale } = useRouter();

  const [_cookies, setCookies] = useCookies([TOKEN_KEY, NEXT_LOCALE]);

  const { isAuthenticated } = useIsAuthenticated();

  useEffect(() => {
    if (locale !== defaultLocale) {
      setCookies(NEXT_LOCALE, locale, {
        path: PagesUrls.HOME,
        sameSite: true,
      });
    } else {
      setCookies(NEXT_LOCALE, defaultLocale, {
        path: PagesUrls.HOME,
        sameSite: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  useEffect(() => {
    if (locale === "ar") setDirection("rtl");
    else setDirection("ltr");
  }, [locale]);

  return (
    <AppContext.Provider
      value={{
        direction,
        isAuthenticated,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
