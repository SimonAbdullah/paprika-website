import { Descriptions } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../../core/core";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import classes from "./style.module.css";

interface AboutRestaurantCenterProps {}

const AboutRestaurantCenter: FunctionComponent<AboutRestaurantCenterProps> =
  () => {
    const { t } = useTranslation(TranslationFiles.RESTAURANT);

    const { data } = useRestaurantDetails();

    if (!data?.description)
      return (
        <>
          <Text className={classes.title}>{t("aboutOurCenter")}</Text>{" "}
          <Text>{t("notAvailable")}</Text>
        </>
      );

    return (
      <Descriptions
        title={<Text className={classes.title}>{t("aboutOurCenter")}</Text>}
      >
        <Descriptions.Item className={classes.description}>
          {data?.description}
        </Descriptions.Item>
      </Descriptions>
    );
  };

export default AboutRestaurantCenter;
