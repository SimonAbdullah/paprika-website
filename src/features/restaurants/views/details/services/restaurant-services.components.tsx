import { Descriptions, List, Space } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../../core/core";
import Image from "next/image";
import classes from "./style.module.css";

interface RestaurantServicesProps {}

const data = [
  {
    logo: "/images/restaurant/chair.svg",
    title: "",
    description: "",
  },
  {
    logo: "/images/restaurant/bed.svg",
    title: "",
    description: "",
  },
  {
    logo: "/images/restaurant/meeting.svg",
    title: "",
    description: "",
  },
  {
    logo: "/images/restaurant/clock.svg",
    title: "",
    description: "",
  },
  {
    logo: "/images/restaurant/dish.svg",
    title: "",
    description: "",
  },
  {
    logo: "/images/restaurant/floor.svg",
    title: "",
    description: "",
  },
  {
    logo: "/images/restaurant/music.svg",
    title: "",
    description: "",
  },
  {
    logo: "/images/restaurant/car.svg",
    title: "",
    description: "",
  },
  {
    logo: "/images/restaurant/shisha.svg",
    title: "",
    description: "",
  },
  {
    logo: "/images/restaurant/cups.svg",
    title: "",
    description: "",
  },
  {
    logo: "/images/restaurant/no-smoking.svg",
    title: "",
    description: "",
  },
  {
    logo: "/images/restaurant/table.svg",
    title: "",
    description: "",
  },
];

const RestaurantServices: FunctionComponent<RestaurantServicesProps> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);
  return (
    <List
      header={<Text className={classes.title}>{t("howWeCanServeYou")}</Text>}
      split={false}
      grid={{
        gutter: 64,
      }}
      dataSource={data}
      renderItem={(item) => {
        console.log(item);
        return (
          <List.Item key={item.logo}>
            <Space direction="vertical">
              <Image
                src={item.logo}
                width="48px"
                height="48px"
                objectFit="contain"
                objectPosition="center"
              />
            </Space>
          </List.Item>
        );
      }}
    />
  );
};

export default RestaurantServices;
