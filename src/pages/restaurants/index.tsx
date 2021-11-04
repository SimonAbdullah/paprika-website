import { Col, Row } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import type { GetStaticProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { TimeInSeconds, TranslationFiles } from "../../core/core";
import { RESTAURANTS_INITIAL_PLACES_API_PARAMS } from "../../features/restaurants/constants/restaurants.constants";
import { useInfinityPlaces } from "../../features/restaurants/hooks/places.hooks";
import { RestaurantSummaryDto } from "../../features/restaurants/services/places/models/restaurant-summary-dto.models";
import { placesServices } from "../../features/restaurants/services/places/places.services";
import RestaurantsFilter from "../../features/restaurants/views/list/filter/restaurants-filter.components";
import RestaurantList from "../../features/restaurants/views/list/restaurant-list.components";
import styles from "../../styles/Restaurants.module.css";
import { PagedResultDto } from "../../utils/base-api/api-provider";

interface RestaurantsPageProps {
  places: PagedResultDto<RestaurantSummaryDto>;
}

const RestaurantsPage: NextPage<RestaurantsPageProps> = ({ places }) => {
  const { t } = useTranslation(TranslationFiles.RESTAURANTS);

  const { lg } = useBreakpoint();

  useInfinityPlaces(
    {
      SkipCount: RESTAURANTS_INITIAL_PLACES_API_PARAMS.StartFromRestaurant,
      MaxResultCount:
        RESTAURANTS_INITIAL_PLACES_API_PARAMS.MaxRestaurantsPerPage,
    },
    {
      initialData: () => ({
        pages: [places],
        pageParams: [1],
      }),
    }
  );

  return (
    <>
      <Head>
        <title>{t("restaurants")}</title>
      </Head>
      <div className={styles.container}>
        <Row
          justify={lg ? "start" : "center"}
          gutter={[16, 16]}
          className={styles.filter}
        >
          <Col xs={20} sm={22} md={20} lg={6}>
            <RestaurantsFilter />
          </Col>
          <Col
            xs={20}
            sm={22}
            md={20}
            lg={17}
            className={styles.restaurantList}
          >
            <RestaurantList />
          </Col>
        </Row>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const places = await placesServices.getAll({
    SkipCount: RESTAURANTS_INITIAL_PLACES_API_PARAMS.StartFromRestaurant,
    MaxResultCount: RESTAURANTS_INITIAL_PLACES_API_PARAMS.MaxRestaurantsPerPage,
  });

  return { props: { places: places.result }, revalidate: TimeInSeconds.DAY };
};

export default RestaurantsPage;
