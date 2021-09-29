import { useCookies } from "react-cookie";
import { PagesUrls } from "../core";
import { TOKEN_KEY } from "./auth.constants";
import { isBrowser } from "./auth.functions";

const ProtectedRoute = ({ router, children }: any) => {
  const [cookies] = useCookies([TOKEN_KEY]);

  const isAuthenticated = cookies[TOKEN_KEY];

  if (isBrowser() && !isAuthenticated) {
    router.push(PagesUrls.LOGIN);
  }

  return children;
};

export default ProtectedRoute;
