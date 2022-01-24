import moment from "moment";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { DaysOfWeek } from "../../../../../core/constants";
import { TranslationFiles } from "../../../../../core/core";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import classes from "./style.module.css";

interface RestaurantScheduleDesktopTableProps {}

const RestaurantScheduleDesktopTable: FunctionComponent<
  RestaurantScheduleDesktopTableProps
> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { openingTimes } = useRestaurantDetails();

  return (
    <table cellPadding={"12rem"} className={classes.table}>
      <thead>
        <tr>
          <th className={classes.emptyTh}></th>
          {openingTimes?.map((openingTime) => {
            return (
              openingTime.dayOfWeek !== undefined && (
                <th key={openingTime.id}>
                  {t(
                    `daysOfWeek.${(DaysOfWeek as any)?.[openingTime.dayOfWeek]}`
                  )}
                </th>
              )
            );
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{t("from")}</th>
          {openingTimes?.map((openingTime) => {
            return (
              <td key={openingTime.id}>
                {moment(openingTime.fromTime).format("hh:mm a")}
              </td>
            );
          })}
        </tr>
        <tr>
          <th>{t("to")}</th>
          {openingTimes?.map((openingTime) => {
            return (
              <td key={openingTime.id}>
                {moment(openingTime.toTime).format("hh:mm a")}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default RestaurantScheduleDesktopTable;
