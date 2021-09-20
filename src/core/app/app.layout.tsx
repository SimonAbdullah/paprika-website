import Layout from "antd/lib/layout/layout";
import { useContext } from "react";
import { AppContext } from "./app.context";
import classes from "./style.module.css";

export interface AppLayoutProps {}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { direction } = useContext(AppContext);

  return (
    <Layout dir={direction} className={classes.layout}>
      {children}
    </Layout>
  );
};

export default AppLayout;
