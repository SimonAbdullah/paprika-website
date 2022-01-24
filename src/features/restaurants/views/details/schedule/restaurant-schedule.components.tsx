import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../../core/core";
import { isDataEmpty } from "../../../../../core/functions";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import RestaurantScheduleDesktopTable from "./restaurant-schedule-desktop-table.components";
import RestaurantScheduleMobileTable from "./restaurant-schedule-mobile-table.components";
import classes from "./style.module.css";

interface RestaurantScheduleProps {}

const RestaurantSchedule: FunctionComponent<RestaurantScheduleProps> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { openingTimes, data } = useRestaurantDetails();

  const { md } = useBreakpoint();

  if (data?.is24Hour) return null;

  if (isDataEmpty(openingTimes))
    return (
      <>
        <Text className={classes.title}>{t("ourSchedule")}</Text>{" "}
        <Text>{t("notAvailable")}</Text>
      </>
    );

  return (
    <>
      <Text className={classes.title}>{t("ourSchedule")}</Text>
      <div className={classes.tableContainer}>
        {md ? (
          <RestaurantScheduleDesktopTable />
        ) : (
          <RestaurantScheduleMobileTable />
        )}
      </div>
    </>
  );
};

export default RestaurantSchedule;
