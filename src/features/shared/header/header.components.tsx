import { FunctionComponent, useState } from "react";
import { Header as Head } from "antd/lib/layout/layout";
import classes from "./style.module.css";
import HeaderStart from "./start/header-start.components";
import HeaderEnd from "./end/header-end.components";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import HeaderDrawer from "./drawer/header-drawer.components";
import HeaderLogo from "./start/header-logo.components";
import HeaderLanguageButton from "./end/header-language.components";
import HeaderRegisterRestaurantButton from "./end/header-register-restaurant.components";
import HeaderLinks from "./start/header-links.components";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const { lg, sm } = useBreakpoint();

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Head className={classes.head}>
      {lg ? (
        <>
          <HeaderStart />
          <HeaderEnd />
        </>
      ) : sm ? (
        <>
          <div className={classes.mobileHeaderStart}>
            <Button
              size="large"
              type="link"
              icon={<MenuOutlined className={classes.menuIcon} />}
              onClick={showDrawer}
            />
            <HeaderDrawer visible={visible} onClose={onClose} />
            <HeaderLogo />
          </div>
          <HeaderEnd />
        </>
      ) : (
        <>
          <div className={classes.mobileHeaderStart}>
            <Button
              size="large"
              type="link"
              icon={<MenuOutlined className={classes.menuIcon} />}
              onClick={showDrawer}
            />
            <HeaderDrawer visible={visible} onClose={onClose}>
              <div className={classes.drawerContent}>
                <HeaderLinks />
                <HeaderRegisterRestaurantButton />
              </div>
            </HeaderDrawer>
            <HeaderLogo />
          </div>
          <HeaderLanguageButton />
        </>
      )}
    </Head>
  );
};

export default Header;
