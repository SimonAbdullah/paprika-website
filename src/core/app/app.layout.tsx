import { Layout } from "antd";
import { useContext } from "react";
import { AppContext } from "./app.context";

export interface AppLayoutProps {}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { direction } = useContext(AppContext);

  return <Layout dir={direction}>{children}</Layout>;
};

export default AppLayout;
