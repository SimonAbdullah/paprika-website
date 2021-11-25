import { Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent, useContext } from "react";
import { TranslationFiles } from "../../../../../core/core";
import {
  GridViewIcon,
  ListViewIcon,
} from "../../../../shared/icons/icons.components";
import ItemsCount from "../../../../shared/items-count/items-count.components";
import { RestaurantsListContext } from "../../../contexts/restaurants-list.contexts";
import { useInfinityPlaces } from "../../../hooks/places.hooks";
import classes from "./style.module.css";

interface RestaurantsHeaderFilterProps {}

const RestaurantsHeaderFilter: FunctionComponent<RestaurantsHeaderFilterProps> =
  () => {
    const { t } = useTranslation(TranslationFiles.RESTAURANTS);

    const { isGridView, setIsGridView } = useContext(RestaurantsListContext);

    const { data } = useInfinityPlaces();

    return (
      <Row justify="space-between">
        <div></div>
        <div>
          <Space>
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
              count={data?.pages?.[0].totalCount}
              text={t("restaurants")}
            />
          </Space>
        </div>
      </Row>
    );
  };

export default RestaurantsHeaderFilter;
