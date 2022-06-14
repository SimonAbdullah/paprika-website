import { LinkOutlined } from "@ant-design/icons";
import { message } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent, useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import urlJoin from "url-join";
import { PagesUrls, TranslationFiles } from "../../../../../core/core";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import { RestaurantHomeDto } from "../../../../customers/services/customer-restaurant/models/restaurantHomeDto";
import RestaurantRate from "./restaurant-rate.components";
import RestaurantReviewsList from "./restaurant-reviews-list.components";
import RestaurantTableRate from "./restaurant-table-rate.components";
import classes from "./style.module.css";

interface RestaurantReviewsAndRateProps {}

const RestaurantReviewsAndRate: FunctionComponent<
  RestaurantReviewsAndRateProps
> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { t: tCommon } = useTranslation(TranslationFiles.COMMON);

  const { data } = useRestaurantDetails();

  const [restaurantURL, setRestaurantURL] = useState("");

  useEffect(() => {
    setRestaurantURL(urlJoin(window.location.origin, PagesUrls.RESTAURANTS, data?.name ?? ""));
  },[data?.name]);

  return (
    <div id="reviews-and-rate">
      {data?.restaurantTypes ===
        RestaurantHomeDto.RestaurantTypesEnum.BLOGGER ||
      data?.restaurantTypes === RestaurantHomeDto.RestaurantTypesEnum.CHEF ||
      data?.restaurantTypes ===
        RestaurantHomeDto.RestaurantTypesEnum.INFLUENCER ? (
        <>
          <Text className={classes.title}>{t("reviewsAndRate")}</Text>
          <CopyToClipboard
            text={`${restaurantURL}#reviews-and-rate`} 
            onCopy={() => message.success(tCommon("linkCopied"))}
          >
            <LinkOutlined style={{margin: "0 1rem", fontSize: "1.2rem"}}/>
          </CopyToClipboard>
          <RestaurantRate />
          <RestaurantReviewsList />
        </>
      ) : (
        <>
          <Text className={classes.title}>{t("reviewsAndRate")}</Text>
          <CopyToClipboard
            text={`${restaurantURL}#reviews-and-rate`} 
            onCopy={() => message.success(tCommon("linkCopied"))}
          >
            <LinkOutlined style={{margin: "0 1rem", fontSize: "1.2rem"}}/>
          </CopyToClipboard>
          <RestaurantTableRate />
          <RestaurantRate />
          <RestaurantReviewsList />
        </>
      )}
    </div>
  );
};

export default RestaurantReviewsAndRate;
