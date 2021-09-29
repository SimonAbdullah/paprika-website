import { FunctionComponent } from "react";
import HeaderLinks from "./header-links.components";
import HeaderLogo from "./header-logo.components";
import classes from "./style.module.css";

interface HeaderStartProps {}

const HeaderStart: FunctionComponent<HeaderStartProps> = () => {
  return (
    <div className={classes.headerStart}>
      <HeaderLogo />
      <HeaderLinks />
    </div>
  );
};

export default HeaderStart;
