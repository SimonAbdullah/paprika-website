import { Button, Col, Modal, Row } from "antd";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { PagesUrls, TimeInSeconds, TranslationFiles } from "../../core/core";
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
import { restaurantsServices } from "../../features/restaurants/services/restaurants/restaurants.services";
import { SORT_IN_ELASTICSEARCH } from "../../features/restaurants/constants/restaurants.constants";
import PaprikaHead from "../../features/shared/head/paprika-head.components";
import { useRouter } from "next/router";
import urlJoin from "url-join";
import { UrlInsideApp } from "../../core/constants";
import Image from "next/image";
import { isMobile } from "react-device-detect";
import DownloadIcons from "../../features/shared/download-icons/download-icons.components";

interface RestaurantPageProps {
  restaurant: RestaurantHomeDto;
}

const RestaurantPage: NextPage<RestaurantPageProps> = ({ restaurant }) => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { t: tCommon } = useTranslation(TranslationFiles.COMMON);

  const { query, replace, asPath } = useRouter();

  const { data, galleryItems, hasReservation } = useRestaurantDetails(
    {},
    { initialData: restaurant }
  );

  const { lg } = useBreakpoint();

  const [reservationModalVisible, setReservationModalVisible] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [pathInsideApp, setPathInsideApp] = useState("");

  const [openDownloadAppModal, setOpenDownloadAppModal] = useState(false);

  const [openInAppLoading, setOpenInAppLoading] = useState(false);
  
  useEffect(() => {
    if(query["inside-token"]){
      setPathInsideApp(asPath);
      replace(`${PagesUrls.RESTAURANTS}/${data?.name}`, undefined, { shallow: true });
      setOpenModal(true);
    }
  },[query, asPath, replace, data?.name]);

  let ogDescription = "";
  if (data?.country?.name) ogDescription += data?.country?.name + ", ";
  if (data?.city?.name) ogDescription += data?.city?.name + ", ";
  if (data?.region?.name) ogDescription += data?.region?.name + ", ";
  if (data?.address) ogDescription += data?.address + ".";

  return (
    <>
      <PaprikaHead
        pageTitle={`${data?.name} | ${tCommon("paprika")}`}
        ogUrl={`${process.env.NEXT_PUBLIC_BASE_CLIENT_URL}${PagesUrls.RESTAURANTS}/${data?.name}`}
        ogTitle={`${data?.name} | Paprika`}
        ogDescription={ogDescription}
        ogImage={data?.logoImage!}
      />
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

      {openModal && isMobile && (
        <Modal 
          visible={openModal}
          destroyOnClose={true}
          width={400}
          cancelText={tCommon("continueHere")}
          onCancel={()=> setOpenModal(false)}
          okText={tCommon("OpenInApp")}
          onOk={() => {
            setOpenInAppLoading(true);
            window.location.href = `${urlJoin(UrlInsideApp.paprikaUrlInsideApp, pathInsideApp)}`;
            setTimeout(() => {
              const state = document.visibilityState;
              if(state === "visible"){
                setOpenModal(false);
                setOpenInAppLoading(false);
                setOpenDownloadAppModal(true);
              } else {
                setOpenInAppLoading(false);
                setOpenModal(false);
              }
            }, 5000);
          }}
          okButtonProps= {{loading: openInAppLoading}}
        >
          <div style={{margin: "0 0.5rem", textAlign: "center", fontSize: "1rem"}}>
            <Image 
              src="/images/logo/paprika.png"
              alt="Paprika Logo"
              width={130}
              height={130}
            />
            <div style={{marginTop: "0.7rem"}}>
              {tCommon("thankYouForUsingPaprikaQR")}
            </div>
            <div style={{margin: "0.3rem 0"}}>
              {tCommon("pleaseScanQRFromApp")}
            </div>
          </div>
        </Modal>  
      )} 

      { isMobile && (
        <Modal 
          visible={openDownloadAppModal}
          destroyOnClose={true}
          width={400}
          cancelText={tCommon("continueHere")}
          onCancel={()=> setOpenDownloadAppModal(false)}
          cancelButtonProps= {{ type: "primary" }}
          okButtonProps={{ hidden: true }}
        >
          <div style={{margin: "0 0.5rem", textAlign: "center", fontSize: "1rem"}}>
            <Image 
              src="/images/logo/paprika.png"
              alt="Paprika Logo"
              width={130}
              height={130}
            />
            <div style={{marginTop: "0.7rem"}}>
              {tCommon("itSeemsThatYouDontHavePaprikaInstalledOnYouDevice")}
            </div>
            <div style={{margin: "0.3rem 0"}}>
              {tCommon("pleaseInstallItAndScanTheQRAgainFromTheAppAgain")}
            </div>
            <Row justify="center">
              <div style={{marginTop: "0.5rem"}}>
                <DownloadIcons />
              </div>
            </Row>
          </div>
        </Modal>  
      )}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  let restaurants = await restaurantsServices.getAll({
    sort: [SORT_IN_ELASTICSEARCH.SORT],
    size: 1000,
    query: {
      bool: {
        must: [],
      },
    },
  });

  const paths: PathsType = [];

  restaurants.hits.hits.forEach((item) => {
    locales?.forEach((locale) => {
      paths.push({
        params: { restaurantName: item._source.name },
        locale: locale,
      });
    });
  });

  return { paths: paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const restaurant = (
    await customerRestaurantServices.getDetails({
      tenancyName: String(params?.restaurantName),
    })
  ).result;

  return {
    props: {
      restaurant: restaurant,
    },
    revalidate: TimeInSeconds.DAY,
  };
};

export default RestaurantPage;
