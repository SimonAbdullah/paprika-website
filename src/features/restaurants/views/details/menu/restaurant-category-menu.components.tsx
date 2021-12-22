import { Button, Empty, List } from "antd";
import { FunctionComponent, useState } from "react";
import { useRestaurantCategoryMeals } from "../../../../customers/hooks/customer-menu.hooks";
import { CategoryDto } from "../../../../customers/services/customer-menu/models/category-dto.models";
import classes from "./style.module.css";
import useTranslation from "next-translate/useTranslation";
import { TranslationFiles } from "../../../../../core/core";
import { NUMBER_OF_MEALS_TO_SHOW } from "../../../constants/restaurants.constants";
import RestaurantMealCard from "./restaurant-meal-card.components";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import { isDataEmpty } from "../../../../../core/functions";

interface RestaurantCategoryMenuProps {
  category: CategoryDto;
}

const RestaurantCategoryMenu: FunctionComponent<RestaurantCategoryMenuProps> =
  ({ category }) => {
    const { t } = useTranslation(TranslationFiles.RESTAURANT);

    const { data, isLoading } = useRestaurantCategoryMeals({ Id: category.id });

    const { hasReservation } = useRestaurantDetails();

    const [numberOfMealsToShow, setNumberOfMealsToShow] = useState<
      number | undefined
    >(NUMBER_OF_MEALS_TO_SHOW);

    if (isDataEmpty(data) && !isLoading)
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={t("noMeals")}
        />
      );

    return (
      <List
        dataSource={
          numberOfMealsToShow ? data?.slice(0, numberOfMealsToShow) : data
        }
        grid={{
          gutter: 16,
          xxl: hasReservation ? 4 : 6,
          xl: hasReservation ? 3 : 5,
          lg: hasReservation ? 2 : 4,
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
        renderItem={(meal) => {
          return (
            <List.Item key={meal.id} className={classes.listItem}>
              <RestaurantMealCard meal={meal} />
            </List.Item>
          );
        }}
      />
    );
  };

export default RestaurantCategoryMenu;
