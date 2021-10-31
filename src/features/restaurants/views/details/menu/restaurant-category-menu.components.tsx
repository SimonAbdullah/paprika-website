import { Card, List } from "antd";
import { FunctionComponent } from "react";
import Image from "next/image";
import { useRestaurantCategoryMeals } from "../../../../customers/hooks/customer-menu.hooks";
import { CategoryDto } from "../../../../customers/services/customer-menu/models/category-dto.models";
import classes from "./style.module.css";
import Text from "antd/lib/typography/Text";

interface RestaurantCategoryMenuProps {
  category: CategoryDto;
}

const RestaurantCategoryMenu: FunctionComponent<RestaurantCategoryMenuProps> =
  ({ category }) => {
    const { data } = useRestaurantCategoryMeals({ Id: category.id });
    return (
      <List
        dataSource={data}
        grid={{
          gutter: 16,
          xxl: 4,
          xl: 3,
          lg: 2,
          md: 3,
          sm: 2,
          xs: 1,
        }}
        renderItem={(item) => {
          return (
            <List.Item key={item.id}>
              <Card
                className={classes.card}
                cover={
                  <>
                    <Image
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
                  </>
                }
              />
            </List.Item>
          );
        }}
      />
    );
  };

export default RestaurantCategoryMenu;
