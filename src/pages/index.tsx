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
import { useEffect } from "react";
import AOS from "aos";
import { customerEventServices } from "../features/customers/services/customer-event/customer-event.services";
import {
  InitialUpcomingEventNumber,
  NumberOfUpcomingEventToShow,
} from "../features/customers/constants/customer-event.constants";
import { CustomerEventDto } from "../features/customers/services/customer-event/models/customer-event-dto.models";
import { useUpcomingEvents } from "../features/customers/hooks/customer-event.hooks";
import { useRouter } from "next/dist/client/router";

interface HomePageProps {
  places: PagedResultDto<RestaurantSummaryDto>;
  upComingEvents: PagedResultDto<CustomerEventDto>;
}

const HomePage: NextPage<HomePageProps> = ({ places, upComingEvents }) => {
  const { t } = useTranslation(TranslationFiles.HOME);

  const { t: tCommon } = useTranslation(TranslationFiles.COMMON);

  const { locale } = useRouter();

  useFeaturedPlaces(
    {},
    {
      initialData: places,
    }
  );

  useUpcomingEvents({}, { initialData: upComingEvents });

  useEffect(() => {
    AOS.init({ once: true, disable: "mobile" });
  }, []);

  return (
    <>
      <Head>
        <title>{t("paprika")}</title>
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_BASE_CLIENT_URL}
        />
        <meta property="og:site_name" content={tCommon("paprika")} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={tCommon("paprika")} />
        <meta property="og:description" content={tCommon("metaDescription")} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_CLIENT_URL}/images/logo/paprika.png`}
        />
        <meta
          property="og:image:secure_url"
          content={`${process.env.NEXT_PUBLIC_BASE_CLIENT_URL}/images/logo/paprika.png`}
        />
        <meta property="og:image:alt" content={tCommon("paprika")} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="600" />
        <meta property="og:locale" content={locale} />
      </Head>
      <div className={styles.container}>
        <Home />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const places = await placesServices.getAll({ isFeatured: true });

  const upComingEvents = await customerEventServices.getAllUpcomingEvent({
    SkipCount: InitialUpcomingEventNumber,
    MaxResultCount: NumberOfUpcomingEventToShow,
  });

  return {
    props: { places: places.result, upComingEvents: upComingEvents.result },
    revalidate: TimeInSeconds.DAY,
  };
};

export default HomePage;
