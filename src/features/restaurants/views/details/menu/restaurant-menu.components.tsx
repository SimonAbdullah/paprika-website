import { Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent, useContext } from "react";
import { AppContext } from "../../../../../core/app/app.context";
import { TranslationFiles } from "../../../../../core/core";
import { isDataEmpty } from "../../../../../core/functions";
import { useRestaurantCategories } from "../../../../customers/hooks/customer-menu.hooks";
import RestaurantCategoryMenu from "./restaurant-category-menu.components";
import classes from "./style.module.css";

interface RestaurantMenuProps {}

const RestaurantMenu: FunctionComponent<RestaurantMenuProps> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { direction } = useContext(AppContext);

  const { data } = useRestaurantCategories();

  if (isDataEmpty(data)) return null;

  return (
    <>
      <Text className={classes.title}>{t("ourMenu")}</Text>
      <Tabs
        className={classes.tab}
        direction={direction}
        defaultActiveKey={String(data?.[0].id)}
      >
        {data?.map((category) => {
          return (
            <Tabs.TabPane tab={category.name} key={String(category.id)}>
              <RestaurantCategoryMenu category={category} />
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </>
  );
};

export default RestaurantMenu;
