import { FunctionComponent } from "react";
import classes from "./style.module.css";
import LinkComponent from "../../link/link.components";
import { PagesUrls } from "../../../../core/core";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";

interface HeaderLogoProps {
  size?: string;
  type?: "default" | "red";
}

const HeaderLogo: FunctionComponent<HeaderLogoProps> = ({
  size,
  type = "default",
}) => {
  const { locale } = useRouter();

  return (
    <div className={classes.logo}>
      <LinkComponent
        linkProps={{ href: PagesUrls.HOME, locale: locale }}
        anchorProps={{ className: classes.logoLink }}
      >
        <Image
          alt="logo"
          src={
            type === "default"
              ? "/images/logo/logo.svg"
              : "/images/logo/logo-red.svg"
          }
          width={size || "66px"}
          height={size || "72px"}
          priority={true}
        />
      </LinkComponent>
    </div>
  );
};

export default HeaderLogo;
