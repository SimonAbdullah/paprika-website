import { Avatar, Col, Modal, Row, Space } from "antd";
import useTranslation from "next-translate/useTranslation";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { PagesUrls, TranslationFiles } from "../../../../core/core";
import { CustomerEventDto } from "../../../customers/services/customer-event/models/customer-event-dto.models";
import classes from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import Title from "antd/lib/typography/Title";

interface HomeEventModalProps {
  event?: CustomerEventDto;
  visible?: boolean;
  setVisible?: Dispatch<SetStateAction<boolean>>;
}

const HomeEventModal: FunctionComponent<HomeEventModalProps> = ({
  event,
  visible,
  setVisible,
}) => {
  const { t } = useTranslation(TranslationFiles.HOME);

  const { locale } = useRouter();

  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible && setVisible(false)}
      cancelText={t("close")}
      okButtonProps={{ hidden: true }}
      centered
    >
      <Row gutter={[16, 16]} className={classes.modalBodyContainer}>
        <Col span={24} className={classes.modalImageContainer}>
          <Image
            src={event?.image || "/images/home/fallback-image.png"}
            alt={event?.name}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            {...(event?.thumbnailImage
              ? { blurDataURL: event?.thumbnailImage, placeholder: "blur" }
              : {})}
          />
        </Col>
        <Col span={24}>
          <Space>
            <Link
              href={`${PagesUrls.RESTAURANTS}/${event?.restaurantName}`}
              locale={locale}
            >
              <a>
                <Avatar
                  src={event?.restaurantImage}
                  alt={event?.restaurantName}
                  shape="circle"
                  size="large"
                  className={classes.modalAvatar}
                />
              </a>
            </Link>
            <div>
              <Text className={classes.modalTitle}>{event?.name}</Text>{" "}
              <Text className={classes.at}>{t("second.at")} </Text>
              <Link
                href={`${PagesUrls.RESTAURANTS}/${event?.restaurantName}`}
                locale={locale}
              >
                <a className={classes.modalRestaurantName}>
                  <Text>{event?.restaurantName}</Text>
                </a>
              </Link>
            </div>
          </Space>
          <Text className={classes.modalTime}>
            {moment(event?.time).format("YYYY/MM/DD hh:mm a")}
          </Text>
        </Col>
        <Col span={24}>
          <Title level={3}>{t("second.description")}</Title>
          <Text>{event?.description}</Text>
        </Col>
      </Row>
    </Modal>
  );
};

export default HomeEventModal;
