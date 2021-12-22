import { Col, Row } from "antd";
import type { GetStaticProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { PagesUrls, TimeInSeconds, TranslationFiles } from "../../core/core";
import { RESTAURANTS_INITIAL_PLACES_API_PARAMS } from "../../features/restaurants/constants/restaurants.constants";
import RestaurantsListContextProvider from "../../features/restaurants/contexts/restaurants-list.contexts";
import { useInfinityPlaces } from "../../features/restaurants/hooks/places.hooks";
import { RestaurantSummaryDto } from "../../features/restaurants/services/places/models/restaurant-summary-dto.models";
import { placesServices } from "../../features/restaurants/services/places/places.services";
import RestaurantsFilter from "../../features/restaurants/views/list/filter";
import RestaurantsListHeader from "../../features/restaurants/views/list/header";
import RestaurantList from "../../features/restaurants/views/list";
import styles from "../../styles/Restaurants.module.css";
import { PagedResultDto } from "../../utils/base-api/api-provider";
import { customerConfigurationServices } from "../../features/customers/services/customer-configuration/customer-configuration.services";
import { InitializationDto } from "../../features/customers/services/customer-configuration/models/initialization-dto.models";
import { useCustomerConfiguration } from "../../features/customers/hooks/customer-configuration.hooks";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useRouter } from "next/dist/client/router";

interface RestaurantsPageProps {
  places: PagedResultDto<RestaurantSummaryDto>;
  configurations: InitializationDto;
}

const RestaurantsPage: NextPage<RestaurantsPageProps> = ({
  places,
  configurations,
}) => {
  const { t } = useTranslation(TranslationFiles.RESTAURANTS);

  const { t: tCommon } = useTranslation(TranslationFiles.COMMON);

  const { locale } = useRouter();

  const { lg } = useBreakpoint();

  useInfinityPlaces(
    {
      skipCount: RESTAURANTS_INITIAL_PLACES_API_PARAMS.StartFromRestaurant,
      maxResultCount:
        RESTAURANTS_INITIAL_PLACES_API_PARAMS.MaxRestaurantsPerPage,
    },
    {
      initialData: () => ({
        pages: [places],
        pageParams: [1],
      }),
    }
  );

  useCustomerConfiguration({}, { initialData: configurations });

  return (
    <>
      <Head>
        <title>{`${t("restaurants")} | ${tCommon("paprika")}`}</title>
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_BASE_CLIENT_URL}${PagesUrls.RESTAURANTS}`}
        />
        <meta property="og:site_name" content={tCommon("paprika")} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${t("restaurants")} | ${tCommon("paprika")}`}
        />
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
      <RestaurantsListContextProvider>
        <div className={styles.container}>
          <Row style={{ width: "100%", marginBottom: "1rem" }} justify="center">
            <Col xs={22} lg={23}>
              <RestaurantsListHeader />
            </Col>
          </Row>
          <Row justify="center" gutter={[16, 16]} className={styles.filter}>
            <Col xs={22} lg={5} hidden={!lg}>
              <RestaurantsFilter />
            </Col>
            <Col xs={22} lg={18} className={styles.restaurantList}>
              <RestaurantList />
            </Col>
          </Row>
        </div>
      </RestaurantsListContextProvider>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const places = await placesServices.getAll({
    skipCount: RESTAURANTS_INITIAL_PLACES_API_PARAMS.StartFromRestaurant,
    maxResultCount: RESTAURANTS_INITIAL_PLACES_API_PARAMS.MaxRestaurantsPerPage,
  });

  const configurations =
    await customerConfigurationServices.getInitialConfigurations();

  return {
    props: { places: places.result, configurations: configurations.result },
    revalidate: TimeInSeconds.DAY,
  };
};

export default RestaurantsPage;
