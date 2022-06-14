import { LinkOutlined } from "@ant-design/icons";
import { message } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent, useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import urlJoin from "url-join";
import { PagesUrls, TranslationFiles } from "../../../../../core/core";
import { isDataEmpty } from "../../../../../core/functions";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import RestaurantScheduleDesktopTable from "./restaurant-schedule-desktop-table.components";
import RestaurantScheduleMobileTable from "./restaurant-schedule-mobile-table.components";
import classes from "./style.module.css";

interface RestaurantScheduleProps {}

const RestaurantSchedule: FunctionComponent<RestaurantScheduleProps> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { data: restaurantDetails, openingTimes } = useRestaurantDetails();

  const { md } = useBreakpoint();

  const { t: tCommon } = useTranslation(TranslationFiles.COMMON);

  const [restaurantURL, setRestaurantURL] = useState("");

  useEffect(() => {
    setRestaurantURL(urlJoin(window.location.origin, PagesUrls.RESTAURANTS, restaurantDetails?.name ?? ""));
  },[restaurantDetails?.name]);

  return (
    <>
      <Text className={classes.title} id="working-hours">{t("ourSchedule")}</Text>
      <CopyToClipboard
        text={`${restaurantURL}#working-hours`} 
        onCopy={() => message.success(tCommon("linkCopied"))}
      >
        <LinkOutlined style={{margin: "0 1rem", fontSize: "1.2rem"}}/>
      </CopyToClipboard>
      { isDataEmpty(openingTimes) ? 
        (
          <>
            {" "}<Text>{t("notAvailable")}</Text>
          </>
        )
      :
        <div className={classes.tableContainer}>
          {md ? (
            <RestaurantScheduleDesktopTable />
          ) : (
            <RestaurantScheduleMobileTable />
          )}
        </div>
      }
    </>
  );
};

export default RestaurantSchedule;
