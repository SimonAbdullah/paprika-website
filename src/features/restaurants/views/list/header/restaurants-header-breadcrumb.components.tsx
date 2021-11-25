import { Breadcrumb } from "antd";
import { FunctionComponent } from "react";
import { PagesUrls, TranslationFiles } from "../../../../../core/core";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

interface RestaurantsHeaderBreadcrumbProps {}

const RestaurantsHeaderBreadcrumb: FunctionComponent<RestaurantsHeaderBreadcrumbProps> =
  () => {
    const { t } = useTranslation(TranslationFiles.RESTAURANTS);
    return (
      <Breadcrumb>
        <Breadcrumb.Item key={PagesUrls.HOME}>
          <Link href={PagesUrls.HOME}>
            <a style={{ color: "var(--primary-color)" }}>{t("homePage")}</a>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item key={PagesUrls.RESTAURANTS}>
          {t("restaurants")}
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  };

export default RestaurantsHeaderBreadcrumb;
