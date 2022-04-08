import { Button, Row } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { UrlInApp } from "../../../../core/constants";
import { TranslationFiles } from "../../../../core/core";
import classes from "./style.module.css";

interface HeaderWebsiteButtonProps {}
const HeaderWebsiteButton: FunctionComponent<HeaderWebsiteButtonProps> = () => {
  const { xs } = useBreakpoint();

  const { t } = useTranslation(TranslationFiles.COMMON);

  const { pathname } = useRouter();

  return xs && window.location.href !== UrlInApp.paprikaUrlInApp ? (
    <Row justify="center" className={classes.container}>
      <Button
        type="primary"
        size="large"
        onClick={() => {
          window.location.href = `${UrlInApp.paprikaUrlInApp}${pathname}`;
        }}
      >
        {t("OpenWebsiteInPaprikaApp")}
      </Button>
    </Row>
  ) : null;
};
export default HeaderWebsiteButton;
