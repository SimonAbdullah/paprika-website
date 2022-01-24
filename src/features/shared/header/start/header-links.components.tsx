import { Dispatch, FunctionComponent, SetStateAction } from "react";
import LinkComponent from "../../link/link.components";
import useTranslation from "next-translate/useTranslation";
import classes from "./style.module.css";
import { PagesUrls, TranslationFiles } from "../../../../core/core";
import { useRouter } from "next/dist/client/router";

interface HeaderLinksProps {
  setVisible?: Dispatch<SetStateAction<boolean>>;
}

const HeaderLinks: FunctionComponent<HeaderLinksProps> = ({ setVisible }) => {
  const { t } = useTranslation(TranslationFiles.COMMON);

  const { locale } = useRouter();

  const onAnchorClick = () => {
    setVisible && setVisible(false);
  };

  return (
    <div className={classes.links}>
      <LinkComponent
        anchorProps={{
          className: classes.headerLinks,
          onClick: onAnchorClick,
        }}
        linkProps={{ href: PagesUrls.HOME, locale: locale }}
      >
        {t("home")}
      </LinkComponent>
      <LinkComponent
        anchorProps={{ className: classes.headerLinks, onClick: onAnchorClick }}
        linkProps={{ href: `${PagesUrls.HOME}#aboutUs`, locale: locale }}
      >
        {t("aboutUs")}
      </LinkComponent>
      <LinkComponent
        anchorProps={{ className: classes.headerLinks, onClick: onAnchorClick }}
        linkProps={{ href: `${PagesUrls.HOME}#services`, locale: locale }}
      >
        {t("ourServices")}
      </LinkComponent>
      <LinkComponent
        anchorProps={{ className: classes.headerLinks, onClick: onAnchorClick }}
        linkProps={{ href: PagesUrls.RESTAURANTS, locale: locale }}
      >
        {t("restaurants")}
      </LinkComponent>
    </div>
  );
};

export default HeaderLinks;
