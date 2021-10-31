import { Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../../core/core";
import { useRestaurantCategories } from "../../../../customers/hooks/customer-menu.hooks";
import RestaurantCategoryMenu from "./restaurant-category-menu.components";
import classes from "./style.module.css";

interface RestaurantMenuProps {}

const RestaurantMenu: FunctionComponent<RestaurantMenuProps> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { data } = useRestaurantCategories();

  if (!data || data.length === 0) return null;

  return (
    <>
      <Text className={classes.title}>{t("ourMenu")}</Text>
      <Tabs className={classes.tab} defaultActiveKey={String(data?.[0].id)}>
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
