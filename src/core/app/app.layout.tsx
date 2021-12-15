import { ConfigProvider, Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useContext } from "react";
import Footer from "../../features/shared/footer/footer.components";
import Header from "../../features/shared/header/header.components";
import { AppContext } from "./app.context";

export interface AppLayoutProps {}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { direction } = useContext(AppContext);

  return (
    <ConfigProvider direction={direction}>
      <Layout dir={direction}>
        <Header />
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
};

export default AppLayout;
