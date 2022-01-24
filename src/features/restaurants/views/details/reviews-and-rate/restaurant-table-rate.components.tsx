import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../../core/core";
import { NoiseLevelType } from "../../../../customers/constants/customer-restaurant.constants";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import classes from "./style.module.css";

interface RestaurantTableRateProps {}

const RestaurantTableRate: FunctionComponent<RestaurantTableRateProps> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { data } = useRestaurantDetails();

  const { sm } = useBreakpoint();

  return (
    <div className={classes.tableContainer}>
      <table cellPadding={"16rem"} className={classes.table}>
        {sm ? (
          <>
            <thead>
              <tr>
                <th>{t("food")}</th>
                <th>{t("service")}</th>
                <th>{t("shisha")}</th>
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
                <td>
                  {data?.noiseLevel
                    ? t(NoiseLevelType?.[data.noiseLevel])
                    : t("notAvailable")}
                </td>
              </tr>
            </tbody>
          </>
        ) : (
          <>
            <tbody>
              <tr>
                <th>{t("food")}</th>
                <td>{data?.foodRate}</td>
              </tr>
              <tr>
                <th>{t("service")}</th>

                <td>{data?.serviceRate}</td>
              </tr>
              <tr>
                <th>{t("shisha")}</th>
                <td>{data?.shishaRate}</td>
              </tr>
              <tr>
                <th>{t("ambiance")}</th>
                <td>{data?.ambianceRate}</td>
              </tr>
              <tr>
                <th>{t("noiseLevel")}</th>
                <td>
                  {data?.noiseLevel
                    ? t(NoiseLevelType?.[data.noiseLevel])
                    : t("notAvailable")}
                </td>
              </tr>
            </tbody>
          </>
        )}
      </table>
    </div>
  );
};

export default RestaurantTableRate;
