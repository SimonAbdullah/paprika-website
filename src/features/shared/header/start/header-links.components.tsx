import { FunctionComponent } from "react";
import LinkComponent from "../../link/link.components";
import useTranslation from "next-translate/useTranslation";
import classes from "./style.module.css";
import { PagesUrls, TranslationFiles } from "../../../../core/core";
import { useRouter } from "next/dist/client/router";

interface HeaderLinksProps {}

const HeaderLinks: FunctionComponent<HeaderLinksProps> = () => {
  const { t } = useTranslation(TranslationFiles.COMMON);

  const { locale } = useRouter();

  return (
    <div className={classes.links}>
      <LinkComponent
        anchorProps={{
          className: `${classes.homeLink} ${classes.headerLinks}`,
        }}
        linkProps={{ href: PagesUrls.HOME, locale: locale }}
      >
        {t("home")}
      </LinkComponent>
      <LinkComponent
        anchorProps={{ className: classes.headerLinks }}
        linkProps={{ href: PagesUrls.HOME, locale: locale }}
      >
        {t("aboutUs")}
      </LinkComponent>
      <LinkComponent
        anchorProps={{ className: classes.headerLinks }}
        linkProps={{ href: PagesUrls.HOME, locale: locale }}
      >
        {t("reviews")}
      </LinkComponent>
      <LinkComponent
        anchorProps={{ className: classes.headerLinks }}
        linkProps={{ href: PagesUrls.HOME, locale: locale }}
      >
        {t("restaurants")}
      </LinkComponent>
    </div>
  );
};

export default HeaderLinks;
