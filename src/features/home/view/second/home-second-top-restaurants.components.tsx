import Title from "antd/lib/typography/Title";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../core/core";
import { isDataEmpty } from "../../../../core/functions";
import { useFeaturedPlaces } from "../../../restaurants/hooks/places.hooks";
import CardList from "../../../shared/card-list";
import HomeCardRestaurant from "./home-card-restaurant.components";
import classes from "./style.module.css";

interface HomeSecondTopRestaurantsProps {}

const HomeSecondTopRestaurants: FunctionComponent<
  HomeSecondTopRestaurantsProps
> = () => {
  const { t } = useTranslation(TranslationFiles.HOME);

  const { data } = useFeaturedPlaces();

  if (isDataEmpty(data?.hits.hits)) return null;

  return (
    <>
      <Title level={3} className={classes.title}>
        {t("second.topRestaurants")}
      </Title>
      <CardList
        dataSource={data?.hits.hits}
        itemKey={(item) => item._id}
        renderItem={(item) => (
          <HomeCardRestaurant key={item._id} restaurant={item._source} />
        )}
      />
    </>
  );
};

export default HomeSecondTopRestaurants;
