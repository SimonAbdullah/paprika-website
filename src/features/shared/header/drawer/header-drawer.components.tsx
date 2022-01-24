import { Drawer, DrawerProps } from "antd";
import { Dispatch, FunctionComponent, SetStateAction, useContext } from "react";
import { AppContext } from "../../../../core/app/app.context";
import HeaderLinks from "../start/header-links.components";
import HeaderLogo from "../start/header-logo.components";
import classes from "./style.module.css";

interface HeaderDrawerProps extends DrawerProps {
  setVisible?: Dispatch<SetStateAction<boolean>>;
}

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
          <HeaderLinks setVisible={props?.setVisible} />
        </>
      )}
    </Drawer>
  );
};

export default HeaderDrawer;
