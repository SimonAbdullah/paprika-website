import { Button, Col, message, Modal, Row, Space } from "antd";
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
import { generateUuid, isDataEmpty } from "../../core/functions";
import useTranslation from "next-translate/useTranslation";
import { restaurantsServices } from "../../features/restaurants/services/restaurants/restaurants.services";
import { SORT_IN_ELASTICSEARCH } from "../../features/restaurants/constants/restaurants.constants";
import PaprikaHead from "../../features/shared/head/paprika-head.components";
import { useRouter } from "next/router";
import urlJoin from "url-join";
import { UrlInsideApp } from "../../core/constants";
import Image from "next/image";
import { customerDownloadLinkServices } from "../../features/customers/services/customer-download-link/customer-download-link.services";
import { isMobile } from "react-device-detect";

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
  
  const [buttonDownloadDisabled, setButtonDownloadDisabled] = useState(false);

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

  const getPaprikaDownloadLink = async () => {
    try {
      setButtonDownloadDisabled(true);
      if(!localStorage.getItem("downloadToken")) {
        localStorage.setItem("downloadToken", generateUuid());
      }
      const result = await customerDownloadLinkServices.getCustomerDownloadLink({downloadToken: localStorage.getItem("downloadToken")!});
      window.open(result.result.paprikaDownloadLink, "_blank");
    } catch (error) {
      message.error(t("anErrorOccurredWhileDownloading"));
    } finally {
      setButtonDownloadDisabled(false);
    }
  };

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
            <Row>
              <Space style={{margin: "1.5rem auto"}}>
                <div className={styles.googlePlayContainer}>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.paprika_sy.customer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={`/icons/google-play-circle.png`}
                      alt={t("googlePlay")}
                      width="54px"
                      height="54px"
                      layout="fixed"
                      className={styles.image}
                    />
                  </a>
                </div>
                <div className={styles.appStoreContainer}>
                  <a
                    href="https://apps.apple.com/us/app/%D8%A8%D8%A7%D8%A8%D8%B1%D9%8A%D9%83%D8%A7/id1566120897#?platform=iphone"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={`/icons/app-store-circle.png`}
                      alt={t("appStore")}
                      width="54px"
                      height="54px"
                      layout="fixed"
                      className={styles.image}
                    />
                  </a>
                </div>
                <div className={styles.directLinkContainer}>
                  <Button
                    style={{padding: "0px", background: "none", border: "none"}}
                    onClick={() => getPaprikaDownloadLink()}
                    disabled={buttonDownloadDisabled}
                  >
                    <Image
                      src={`/icons/direct-link-circle.png`}
                      alt={t("directLink")}
                      width="54px"
                      height="54px"
                      layout="fixed"
                      className={styles.image}
                    />
                  </Button>
                </div>
              </Space>
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
