import { Breadcrumb, Button, Drawer, Row, Space } from "antd";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent, useContext, useState } from "react";
import { PagesUrls, TranslationFiles } from "../../../../../core/core";
import Link from "next/link";
import classes from "./style.module.css";
import {
  GridViewIcon,
  ListViewIcon,
} from "../../../../shared/icons/icons.components";
import Text from "antd/lib/typography/Text";
import { useInfinityPlaces } from "../../../hooks/places.hooks";
import { RestaurantsListContext } from "../../../contexts/restaurants-list.contexts";
import ItemsCount from "../../../../shared/items-count/items-count.components";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { FilterOutlined } from "@ant-design/icons";
import RestaurantsFilter from "../filter";
import { AppContext } from "../../../../../core/app/app.context";
import { useRouter } from "next/dist/client/router";

interface RestaurantsListHeaderProps {}

const RestaurantsListHeader: FunctionComponent<
  RestaurantsListHeaderProps
> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANTS);

  const { locale } = useRouter();

  const { direction } = useContext(AppContext);

  const { sm, md, lg } = useBreakpoint();

  const { isGridView, setIsGridView } = useContext(RestaurantsListContext);

  const { data } = useInfinityPlaces();

  const [visible, setVisible] = useState(false);

  const filterButton = (
    <Button
      size="small"
      type="primary"
      onClick={() => setVisible(true)}
      icon={<FilterOutlined />}
    >
      {t("filter")}
    </Button>
  );

  return (
    <div
      style={{ paddingBottom: "1rem", margin: 0, backgroundColor: "#ffffff" }}
    >
      {!lg && (
        <Drawer
          placement={direction === "ltr" ? "right" : "left"}
          visible={visible}
          onClose={() => setVisible(false)}
          width={!md ? (sm ? "50%" : "75%") : "33%"}
        >
          <RestaurantsFilter />
        </Drawer>
      )}
      <Row justify="space-between">
        <div style={{ padding: "1rem" }}>
          <Breadcrumb>
            <Breadcrumb.Item key={PagesUrls.HOME}>
              <Link href={PagesUrls.HOME} locale={locale}>
                <a style={{ color: "var(--primary-color)" }}>{t("homePage")}</a>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item key={PagesUrls.RESTAURANTS}>
              {t("restaurants")}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        {!sm && <div style={{ padding: "1rem" }}>{filterButton}</div>}
        <div style={{ padding: "1rem" }}>
          <Space>
            {sm && !lg && filterButton}
            <Row
              align="middle"
              className={classes.switchViewButton}
              onClick={() => setIsGridView(true)}
            >
              <GridViewIcon type={isGridView ? "active" : "inactive"} />
              <Text className={isGridView ? classes.active : classes.inactive}>
                {t("gridView")}
              </Text>
            </Row>
            <Row
              align="middle"
              className={classes.switchViewButton}
              onClick={() => setIsGridView(false)}
            >
              <ListViewIcon type={isGridView ? "inactive" : "active"} />
              <Text className={isGridView ? classes.inactive : classes.active}>
                {t("listView")}
              </Text>
            </Row>
            <ItemsCount
              count={data?.pages?.[0].hits.total.value}
              text={t("restaurants")}
            />
          </Space>
        </div>
      </Row>
    </div>
  );
};

export default RestaurantsListHeader;
