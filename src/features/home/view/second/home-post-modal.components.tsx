import { Avatar, Col, Modal, Row, Space } from "antd";
import useTranslation from "next-translate/useTranslation";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { PagesUrls, TranslationFiles } from "../../../../core/core";
import classes from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import { CustomerPostDto } from "../../../customers/services/customer-post/models/customer-post-dto.models";

interface HomePostModalProps {
  post?: CustomerPostDto;
  visible?: boolean;
  setVisible?: Dispatch<SetStateAction<boolean>>;
}

const HomePostModal: FunctionComponent<HomePostModalProps> = ({
    post,
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
            src={post?.image || "/images/home/fallback-image.png"}
            alt={post?.restaurantName}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            {...(post?.image
              ? { blurDataURL: post?.image, placeholder: "blur" }
              : {})}
          />
        </Col>
        <Col span={24}>
          <Space>
            <Link
              href={`${PagesUrls.RESTAURANTS}/${post?.restaurantName}`}
              locale={locale}
            >
              <a>
                <Avatar
                  src={post?.restaurantImage}
                  alt={post?.restaurantName}
                  shape="circle"
                  size="large"
                  className={classes.modalAvatar}
                />
              </a>
            </Link>
            <div>
              <Link
                href={`${PagesUrls.RESTAURANTS}/${post?.restaurantName}`}
                locale={locale}
              >
                <a className={classes.modalRestaurantName}>
                  <Text>{post?.restaurantName}</Text>
                </a>
              </Link>
              <Text className={classes.modalTime}>
                {moment(post?.creationTime).format("YYYY/MM/DD hh:mm a")}
              </Text>
            </div>
          </Space>
        </Col>
        <Col span={24}>
          <div style={{marginTop: "0.8rem"}}>
            <div dangerouslySetInnerHTML={{ __html: post?.richDescription ?? "" }} />
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default HomePostModal;
