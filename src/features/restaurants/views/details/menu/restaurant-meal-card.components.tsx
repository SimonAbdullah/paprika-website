import { Card } from "antd";
import { FunctionComponent, useContext, useState } from "react";
import Image from "next/image";
import classes from "./style.module.css";
import Text from "antd/lib/typography/Text";
import RestaurantMealModal from "./restaurant-meal-modal.components";
import { MealDto } from "../../../../customers/services/customer-menu/models/meal-dto.models";
import { currencyFormatter } from "../../../../../core/functions";
import { AppContext } from "../../../../../core/app/app.context";

interface RestaurantMealCardProps {
  meal: MealDto;
}

const RestaurantMealCard: FunctionComponent<RestaurantMealCardProps> = ({
  meal,
}) => {
  const [visible, setVisible] = useState(false);

  const { direction } = useContext(AppContext);

  return (
    <>
      <Card
        className={classes.card}
        onClick={() => setVisible(true)}
        hoverable
        cover={
          <div className={classes.coverContainer}>
            <div style={{ position: "relative", height: "10rem" }}>
              <Image
                className={classes.image}
                src={meal?.image || "/images/home/fallback-image.png"}
                alt={meal?.name}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                {...(meal?.thumbnailImage
                  ? { blurDataURL: meal?.thumbnailImage, placeholder: "blur" }
                  : {})}
              />
            </div>
            <div className={classes.content}>
              <Text
                className={classes.cardTitle}
                ellipsis={{ tooltip: meal?.name }}
              >
                {meal?.name}
              </Text>
              {meal?.price && (
                <Text className={classes.cardMealPrice}>
                  {currencyFormatter(
                    direction === "ltr" ? "en-SY" : "ar-SY"
                  ).format(meal.price)}
                </Text>
              )}
            </div>
          </div>
        }
        bodyStyle={{ display: "none" }}
      />
      {visible && (
        <RestaurantMealModal
          meal={meal}
          visible={visible}
          setVisible={setVisible}
        />
      )}
    </>
  );
};

export default RestaurantMealCard;
