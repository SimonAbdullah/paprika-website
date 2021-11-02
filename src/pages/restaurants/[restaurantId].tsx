import { Button, Col, Modal, Row } from "antd";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { TimeInSeconds } from "../../core/core";
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
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

interface RestaurantPageProps {
  restaurant: RestaurantHomeDto;
}

const RestaurantPage: NextPage<RestaurantPageProps> = ({ restaurant }) => {
  const { data } = useRestaurantDetails({}, { initialData: restaurant });

  const { lg } = useBreakpoint();

  const [reservationModalVisible, setReservationModalVisible] = useState(false);

  return (
    <>
      <Head>
        <title>{data?.name}</title>
      </Head>
      <div className={styles.container}>
        <Row className={styles.row} justify="center" gutter={[0, 16]}>
          <Col span={24}>
            <RestaurantMainGallery />
          </Col>
          <Col xs={19} sm={21} lg={16}>
            <Row justify="center">
              <Col span={22} lg={24}>
                <div className={styles.mainInfo}>
                  <RestaurantMainInfo />
                </div>
              </Col>
              <Col span={24}>
                <RestaurantDetails />
              </Col>
            </Row>
          </Col>
          <Col xs={1} sm={1} lg={8}>
            <Row className={styles.reservationBox}>
              <Col span={22}>
                {lg ? (
                  <RestaurantReservationBox />
                ) : (
                  <>
                    <Button
                      size="large"
                      type="link"
                      shape="circle"
                      icon={<PlusCircleOutlined style={{ fontSize: "2rem" }} />}
                      onClick={() => setReservationModalVisible(true)}
                    />
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
        </Row>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const restaurants = await placesServices.getAll({ MaxResultCount: 1000 });

  const paths: PathsType = [];

  restaurants.result.items.forEach((item) => {
    locales?.forEach((locale) => {
      paths.push({
        params: { restaurantId: String(item.id) },
        locale: locale,
      });
    });
  });

  return { paths: paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const restaurant = await customerRestaurantServices.getDetails({
    Id: Number(params?.restaurantId),
  });

  return { props: { restaurant }, revalidate: TimeInSeconds.DAY };
};

export default RestaurantPage;
