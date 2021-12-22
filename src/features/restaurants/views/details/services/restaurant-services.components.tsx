import { List, Space } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../../core/core";
import Image from "next/image";
import classes from "./style.module.css";
import { useServicesData } from "./services-data";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";

interface RestaurantServicesProps {}

const RestaurantServices: FunctionComponent<RestaurantServicesProps> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { hasReservation } = useRestaurantDetails();

  return (
    <List
      header={<Text className={classes.title}>{t("howWeCanServeYou")}</Text>}
      split={false}
      grid={{
        column: 3,
        xxl: hasReservation ? 10 : 10,
        xl: hasReservation ? 10 : 10,
        lg: hasReservation ? 8 : 10,
        md: 7,
        sm: 6,
        xs: 3,
      }}
      dataSource={useServicesData()}
      renderItem={(item) => {
        return (
          <List.Item key={item.logo} className={classes.item}>
            <Space direction="vertical" className={classes.space}>
              <Image
                src={item.logo}
                alt={item.alt}
                width="38px"
                height="38px"
                objectFit="contain"
                objectPosition="center"
              />
              <Text className={classes.itemTitle}>{item.title}</Text>
              <Text className={classes.itemDescription}>
                {item.description}
              </Text>
            </Space>
          </List.Item>
        );
      }}
    />
  );
};

export default RestaurantServices;
