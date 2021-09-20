import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { TOKEN_KEY } from "./auth.constants";

export const useIsAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [cookies] = useCookies([TOKEN_KEY]);

  useEffect(() => {
    if (cookies[TOKEN_KEY]) setIsAuthenticated(true);
  }, [cookies]);

  return { isAuthenticated };
};
