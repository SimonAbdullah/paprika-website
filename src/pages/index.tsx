import type { GetStaticProps, NextPage } from "next";
import { TimeInSeconds, TranslationFiles } from "../core/core";
import Home from "../features/home/view/home.components";
import { useFeaturedPlaces } from "../features/restaurants/hooks/places.hooks";
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
import { HomeMetaData } from "../core/constants";
import { restaurantsServices } from "../features/restaurants/services/restaurants/restaurants.services";
import { BaseApiSearchResponse } from "../features/restaurants/services/restaurants/models/base-api-search-response.models";
import { SORT_IN_ELASTICSEARCH } from "../features/restaurants/constants/restaurants.constants";
import PaprikaHead from "../features/shared/head/paprika-head.components";
import useTranslation from "next-translate/useTranslation";

interface HomePageProps {
  restaurants: BaseApiSearchResponse;
  upComingEvents: PagedResultDto<CustomerEventDto>;
}

const HomePage: NextPage<HomePageProps> = ({ restaurants, upComingEvents }) => {
  const { t } = useTranslation(TranslationFiles.HOME);

  useFeaturedPlaces({
    initialData: restaurants,
  });

  useUpcomingEvents({}, { initialData: upComingEvents });

  useEffect(() => {
    AOS.init({ once: true, disable: "mobile" });
  }, []);

  return (
    <>
      <PaprikaHead
        pageTitle={t("paprika")}
        ogUrl={HomeMetaData.url!}
        ogTitle={HomeMetaData.title}
        ogDescription={HomeMetaData.description}
        ogImage={HomeMetaData.image}
      />
      <div className={styles.container}>
        <Home />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const upComingEvents = await customerEventServices.getAllUpcomingEvent({
    SkipCount: InitialUpcomingEventNumber,
    MaxResultCount: NumberOfUpcomingEventToShow,
  });

  let restaurants = await restaurantsServices.getAll({
    sort: [SORT_IN_ELASTICSEARCH.SORT],
    query: {
      bool: {
        must: [
          {
            term: {
              isfeatured: true,
            },
          },
        ],
      },
    },
  });

  return {
    props: {
      restaurants: restaurants,
      upComingEvents: upComingEvents.result,
    },
    revalidate: TimeInSeconds.DAY,
  };
};

export default HomePage;
