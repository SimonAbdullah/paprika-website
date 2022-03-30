import { Button, Col, Modal, Row } from "antd";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { PagesUrls, TimeInSeconds, TranslationFiles } from "../../core/core";
import { placesServices } from "../../features/restaurants/services/places/places.services";
import styles from "../../styles/Restaurant.module.css";
import { PathsType } from "../../core/types";
import { customerRestaurantServices } from "../../features/customers/services/customer-restaurant/customer-restaurant.services";
import { useRestaurantDetails } from "../../features/customers/hooks/customer-restaurant.hooks";
import { RestaurantHomeDto } from "../../features/customers/services/customer-restaurant/models/restaurantHomeDto";
import RestaurantMainGallery from "../../features/restaurants/views/details/main-gallery/restaurant-main-gallery.components";
import RestaurantDetails from "../../features/restaurants/views/details/restaurant-details.components";
import RestaurantMainInfo from "../../features/restaurants/views/details/main-info/restaurant-main-info.components";
import RestaurantReservationBox from "../../features/restaurants/views/details/reservation-box/restaurant-reservation-box.components";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useEffect, useState } from "react";
import { isDataEmpty } from "../../core/functions";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/dist/client/router";
import { RestaurantDto } from "../../features/restaurants/services/links/models/restaurant-dto";
import { linksServices } from "../../features/restaurants/services/links/links.services";

interface RestaurantPageProps {
  restaurant: RestaurantHomeDto;
}

const RestaurantPage: NextPage<RestaurantPageProps> = ({ restaurant }) => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { t: tCommon } = useTranslation(TranslationFiles.COMMON);

  const { locale } = useRouter();

  const { data, galleryItems, hasReservation } = useRestaurantDetails(
    {},
    { initialData: restaurant }
  );

  const { lg } = useBreakpoint();

  const [reservationModalVisible, setReservationModalVisible] = useState(false);

  //const { data: restaurantLinkInformation } = useRestaurantLinkInformation();

  const [restaurantLinkInformation, setRestaurantLinkInformation] =
    useState<RestaurantDto>({} as RestaurantDto);
  useEffect(() => {
    (async () => {
      console.log(data);
      try {
        let result = await linksServices.getForRestaurant({
          restaurantId: data?.id,
        });
        setRestaurantLinkInformation(result.result);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [data]);

  return (
    <>
      <Head>
        <title>{`${data?.name} | ${tCommon("paprika")}`}</title>
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_BASE_CLIENT_URL}${PagesUrls.RESTAURANTS}/${data?.name}`}
        />
        <meta property="og:site_name" content={tCommon("paprika")} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${restaurantLinkInformation?.title} | ${tCommon(
            "paprika"
          )}`}
        />
        <meta
          property="og:description"
          content={restaurantLinkInformation?.description}
        />
        <meta
          property="og:image"
          content={restaurantLinkInformation?.imageUrl}
        />
        <meta
          property="og:image:secure_url"
          content={restaurantLinkInformation?.imageUrl}
        />
        <meta property="og:image:alt" content={data?.name} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="600" />
        <meta property="og:locale" content={locale} />
      </Head>
      <div className={styles.container}>
        <Row className={styles.row} justify="center" gutter={[0, 16]}>
          <Col span={24}>
            <RestaurantMainGallery />
          </Col>
          <Col xs={22} lg={hasReservation ? 16 : 22}>
            <Row justify="center" gutter={[0, 32]}>
              <Col span={22} lg={24}>
                <div
                  className={`${styles.mainInfo} ${
                    isDataEmpty(galleryItems) ? "" : styles.marginTopMinus6x
                  }`}
                >
                  <RestaurantMainInfo />
                </div>
              </Col>
              <Col span={24}>
                <RestaurantDetails />
              </Col>
            </Row>
          </Col>
          {hasReservation && (
            <Col xs={24} lg={8}>
              <Row
                className={`${styles.reservationBox} ${
                  isDataEmpty(galleryItems) ? "" : styles.marginTopMinus6x
                }`}
                justify="center"
              >
                <Col xs={24} lg={22}>
                  {lg ? (
                    <RestaurantReservationBox />
                  ) : (
                    <>
                      <Button
                        type="primary"
                        style={{ width: "50%", margin: "0.5rem" }}
                        onClick={() => setReservationModalVisible(true)}
                      >
                        {t("reserveNow")}
                      </Button>
                      <Modal
                        visible={reservationModalVisible}
                        onCancel={() => setReservationModalVisible(false)}
                        footer={null}
                      >
                        <RestaurantReservationBox />
                      </Modal>
                    </>
                  )}
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const restaurants = await placesServices.getAll({ maxResultCount: 1000 });

  const paths: PathsType = [];

  restaurants.result.items.forEach((item) => {
    locales?.forEach((locale) => {
      paths.push({
        params: { restaurantName: item.name },
        locale: locale,
      });
    });
  });

  return { paths: paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const restaurant = await customerRestaurantServices.getDetails({
    tenancyName: String(params?.restaurantName),
  });

  return {
    props: { restaurant: restaurant.result },
    revalidate: TimeInSeconds.DAY,
  };
};

export default RestaurantPage;
