import { FunctionComponent } from "react";
import classes from "./style.module.css";
import LinkComponent from "../../link/link.components";
import { PagesUrls } from "../../../../core/core";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";

interface HeaderLogoProps {}

const HeaderLogo: FunctionComponent<HeaderLogoProps> = () => {
  const { locale } = useRouter();

  return (
    <div className={classes.logo}>
      <LinkComponent
        linkProps={{ href: PagesUrls.HOME, locale: locale }}
        anchorProps={{ className: classes.logoLink }}
      >
        <Image
          alt="logo"
          src="/images/logo/logo.svg"
          width="58px"
          height="58px"
          priority={true}
        />
      </LinkComponent>
    </div>
  );
};

export default HeaderLogo;
