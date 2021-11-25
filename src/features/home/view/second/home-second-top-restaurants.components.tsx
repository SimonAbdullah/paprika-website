import Title from "antd/lib/typography/Title";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../core/core";
import { useFeaturedPlaces } from "../../../restaurants/hooks/places.hooks";
import CardList from "../../../shared/card-list";
import HomeCardRestaurant from "./home-card-restaurant.components";
import classes from "./style.module.css";

interface HomeSecondTopRestaurantsProps {}

const HomeSecondTopRestaurants: FunctionComponent<HomeSecondTopRestaurantsProps> =
  () => {
    const { t } = useTranslation(TranslationFiles.HOME);

    const { data } = useFeaturedPlaces();

    return (
      <>
        <Title level={3} className={`${classes.title} ${classes.bottomSpace}`}>
          {t("second.someTopRestaurantForYourDinner")}
        </Title>
        <CardList
          dataSource={data?.items}
          itemKey={(item) => item.id}
          renderItem={(item) => (
            <HomeCardRestaurant key={item.id} restaurant={item} />
          )}
        />
      </>
    );
  };

export default HomeSecondTopRestaurants;
