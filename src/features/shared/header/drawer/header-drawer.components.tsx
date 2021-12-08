import { Drawer, DrawerProps } from "antd";
import { FunctionComponent, useContext } from "react";
import { AppContext } from "../../../../core/app/app.context";
import HeaderLinks from "../start/header-links.components";
import HeaderLogo from "../start/header-logo.components";
import classes from "./style.module.css";

interface HeaderDrawerProps extends DrawerProps {}

const HeaderDrawer: FunctionComponent<HeaderDrawerProps> = (props) => {
  const { direction } = useContext(AppContext);
  return (
    <Drawer
      title={
        <div className={classes.logoContainer}>
          <HeaderLogo type="red" />
        </div>
      }
      placement={direction === "ltr" ? "right" : "left"}
      {...props}
    >
      {props.children ?? (
        <>
          <HeaderLinks />
        </>
      )}
    </Drawer>
  );
};

export default HeaderDrawer;
