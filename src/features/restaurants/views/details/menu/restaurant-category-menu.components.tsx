import { Button, Card, List } from "antd";
import { FunctionComponent, useState } from "react";
import Image from "next/image";
import { useRestaurantCategoryMeals } from "../../../../customers/hooks/customer-menu.hooks";
import { CategoryDto } from "../../../../customers/services/customer-menu/models/category-dto.models";
import classes from "./style.module.css";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { TranslationFiles } from "../../../../../core/core";
import { NUMBER_OF_MEALS_TO_SHOW } from "../../../constants/restaurants.constants";

interface RestaurantCategoryMenuProps {
  category: CategoryDto;
}

const RestaurantCategoryMenu: FunctionComponent<RestaurantCategoryMenuProps> =
  ({ category }) => {
    const { t } = useTranslation(TranslationFiles.RESTAURANT);

    const { data, isLoading } = useRestaurantCategoryMeals({ Id: category.id });

    const [numberOfMealsToShow, setNumberOfMealsToShow] = useState<
      number | undefined
    >(NUMBER_OF_MEALS_TO_SHOW);

    return (
      <List
        dataSource={
          numberOfMealsToShow ? data?.slice(0, numberOfMealsToShow) : data
        }
        grid={{
          gutter: 16,
          xxl: 4,
          xl: 3,
          lg: 2,
          md: 3,
          sm: 2,
          xs: 1,
        }}
        loading={isLoading}
        loadMore={
          data && data.length > NUMBER_OF_MEALS_TO_SHOW ? (
            <div style={{ textAlign: "center" }}>
              <Button
                size="large"
                type="primary"
                onClick={() => {
                  setNumberOfMealsToShow(
                    numberOfMealsToShow ? undefined : NUMBER_OF_MEALS_TO_SHOW
                  );
                }}
                className={classes.showMoreButton}
              >
                {numberOfMealsToShow ? t("showMore") : t("showLess")}
              </Button>
            </div>
          ) : (
            <></>
          )
        }
        renderItem={(item) => {
          return (
            <List.Item key={item.id}>
              <Card
                className={classes.card}
                cover={
                  <div className={classes.coverContainer}>
                    <Image
                      className={classes.image}
                      src={item?.image || "/images/home/first-background.png"}
                      alt={item?.name}
                      blurDataURL={item?.thumbnailImage}
                      placeholder="blur"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                    <div className={classes.content}>
                      <Text className={classes.cardTitle}>{item?.name}</Text>
                    </div>
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />
    );
  };

export default RestaurantCategoryMenu;
