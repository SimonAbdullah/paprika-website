import { Descriptions } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
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

    //   if (!data?.description) {
    //     return null;
    //   }

    return (
      <Descriptions
        title={<Text className={classes.title}>{t("aboutOurCenter")}</Text>}
      >
        <Paragraph className={classes.description}>
          {data?.description}
          Bethel Convention Centre (BCC) is a conference venue renowned for its
          excellent facilities and friendly staff, situated just outside of
          Birmingham.Our venue is as elegant as it is practical and we pride
          ourselves in supporting our clients with the highest quality service,
          excellent facilities and a wide range of events packages.Whether you
          are holding a conference, seminar, meeting, concert, lecture, wedding
          or exhibition, we consistently stride towards ensuring that our
          clients are only ever met with a service that exceeds expectation.
        </Paragraph>
      </Descriptions>
    );
  };

export default AboutRestaurantCenter;
