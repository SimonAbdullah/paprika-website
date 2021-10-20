import type { GetStaticProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { TimeInSeconds, TranslationFiles } from "../core/core";
import Home from "../features/home/view/home.components";
import { useFeaturedPlaces } from "../features/restaurants/hooks/places.hooks";
import { RestaurantSummaryDto } from "../features/restaurants/services/places/models/restaurant-summary-dto.models";
import { placesServices } from "../features/restaurants/services/places/places.services";
import styles from "../styles/Home.module.css";
import { PagedResultDto } from "../utils/base-api/api-provider";
import Sal from "sal.js";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";

interface HomePageProps {
  places: PagedResultDto<RestaurantSummaryDto>;
}

const HomePage: NextPage<HomePageProps> = ({ places }) => {
  const { t } = useTranslation(TranslationFiles.HOME);

  const { pathname } = useRouter();

  const { xs, sm, md } = useBreakpoint();

  const isMobile = (xs || sm) && !md;

  useFeaturedPlaces(
    {},
    {
      initialData: places,
    }
  );

  useEffect(() => {
    Sal({ root: null, disabled: isMobile });
  }, [pathname, isMobile]);

  return (
    <>
      <Head>
        <title>{t("home")}</title>
      </Head>
      <div className={styles.container}>
        <Home />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const places = await placesServices.getAll({ IsFeatured: true });

  return { props: { places: places.result }, revalidate: TimeInSeconds.DAY };
};

export default HomePage;
