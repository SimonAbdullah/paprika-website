import { FunctionComponent } from "react";
import HeaderLanguageButton from "./header-language.components";
import HeaderRegisterRestaurantButton from "./header-register-restaurant.components";
import classes from "./style.module.css";

interface HeaderEndProps {}

const HeaderEnd: FunctionComponent<HeaderEndProps> = () => {
  return (
    <div className={classes.headerEnd}>
      <HeaderRegisterRestaurantButton />
      <HeaderLanguageButton />
    </div>
  );
};

export default HeaderEnd;
