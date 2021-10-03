import type { GetStaticProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { TranslationFiles } from "../core/core";
import Home from "../features/home/view/home.components";
import { usePlaces } from "../features/places/hooks/places.hooks";
import { RestaurantSummaryDto } from "../features/places/services/models/restaurant-summary-dto.models";
import { placesServices } from "../features/places/services/places.services";
import styles from "../styles/Home.module.css";
import { PagedResultDto } from "../utils/base-api/api-provider";

interface HomePageProps {
  places: PagedResultDto<RestaurantSummaryDto>;
}

const HomePage: NextPage<HomePageProps> = ({ places }) => {
  const { t } = useTranslation(TranslationFiles.HOME);

  const {} = usePlaces({ isFeatured: true }, { initialData: places });

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
  const places = await placesServices.getAll({ isFeatured: true });

  return { props: { places: places.result } };
};

export default HomePage;
