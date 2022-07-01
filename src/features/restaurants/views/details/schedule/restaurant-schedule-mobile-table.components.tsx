import moment from "moment";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { DaysOfWeek } from "../../../../../core/constants";
import { TranslationFiles } from "../../../../../core/core";
import { OpeningTimeDto } from "../../../../customers/services/customer-restaurant/models/openingTimeDto";
import classes from "./style.module.css";

interface RestaurantScheduleMobileTableProps {
  openingTimes: OpeningTimeDto[];
}

const RestaurantScheduleMobileTable: FunctionComponent<
  RestaurantScheduleMobileTableProps
> = ({ openingTimes}) => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  return (
    <table cellPadding={"12rem"} className={classes.table}>
      <thead>
        <tr>
          <th className={classes.emptyTh}></th>
          <th>{t("from")}</th>
          <th>{t("to")}</th>
        </tr>
      </thead>
      <tbody>
        {openingTimes?.map((openingTime) => {
          return (
            <tr key={openingTime.id}>
              {openingTime.dayOfWeek !== undefined && (
                <th>
                  {t(
                    `daysOfWeek.${(DaysOfWeek as any)?.[openingTime.dayOfWeek]}`
                  )}
                </th>
              )}
              <td key={openingTime.id}>
                {moment(openingTime.fromTime).format("hh:mm a")}
              </td>
              <td key={openingTime.id}>
                {moment(openingTime.toTime).format("hh:mm a")}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RestaurantScheduleMobileTable;
