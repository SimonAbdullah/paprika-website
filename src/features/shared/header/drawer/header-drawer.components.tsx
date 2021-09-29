import { Drawer, DrawerProps } from "antd";
import { FunctionComponent } from "react";
import HeaderLinks from "../start/header-links.components";
import HeaderLogo from "../start/header-logo.components";

interface HeaderDrawerProps extends DrawerProps {}

const HeaderDrawer: FunctionComponent<HeaderDrawerProps> = (props) => {
  return (
    <Drawer title={<HeaderLogo />} {...props}>
      {props.children ?? (
        <>
          <HeaderLinks />
        </>
      )}
    </Drawer>
  );
};

export default HeaderDrawer;
