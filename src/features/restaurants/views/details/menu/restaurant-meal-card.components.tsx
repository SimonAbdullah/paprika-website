import { Card } from "antd";
import { FunctionComponent, useState } from "react";
import Image from "next/image";
import classes from "./style.module.css";
import Text from "antd/lib/typography/Text";
import RestaurantMealModal from "./restaurant-meal-modal.components";
import { MealDto } from "../../../../customers/services/customer-menu/models/meal-dto.models";

interface RestaurantMealCardProps {
  meal: MealDto;
}

const RestaurantMealCard: FunctionComponent<RestaurantMealCardProps> = ({
  meal,
}) => {
  const [visible, setVisible] = useState(false);

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
                priority={true}
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
