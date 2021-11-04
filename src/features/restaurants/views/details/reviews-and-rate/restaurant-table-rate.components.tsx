import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../../core/core";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import classes from "./style.module.css";

interface RestaurantTableRateProps {}

const RestaurantTableRate: FunctionComponent<RestaurantTableRateProps> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { data } = useRestaurantDetails();

  return (
    <div className={classes.tableContainer}>
      <table cellPadding={"16rem"} className={classes.table}>
        <thead>
          <tr>
            <th>{t("food")}</th>
            <th>{t("service")}</th>
            <th>{t("hookah")}</th>
            <th>{t("ambiance")}</th>
            <th>{t("noiseLevel")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data?.foodRate}</td>
            <td>{data?.serviceRate}</td>
            <td>{data?.shishaRate}</td>
            <td>{data?.ambianceRate}</td>
            <td>{data?.noiseLevel}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantTableRate;
