import { Col, Modal, Rate, Row, Space } from "antd";
import useTranslation from "next-translate/useTranslation";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { TranslationFiles } from "../../../../../core/core";
import Image from "next/image";
import Title from "antd/lib/typography/Title";
import { MealDto } from "../../../../customers/services/customer-menu/models/meal-dto.models";
import Paragraph from "antd/lib/typography/Paragraph";
import classes from "./style.module.css";

interface RestaurantMealModalProps {
  meal: MealDto;
  visible?: boolean;
  setVisible?: Dispatch<SetStateAction<boolean>>;
}

const RestaurantMealModal: FunctionComponent<RestaurantMealModalProps> = ({
  meal,
  visible,
  setVisible,
}) => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible && setVisible(false)}
      cancelText={t("close")}
      okButtonProps={{ hidden: true }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24} className={classes.modalImageContainer}>
          <Image
            src={meal?.image || "/images/home/fallback-image.png"}
            alt={meal?.name}
            blurDataURL={meal?.thumbnailImage}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </Col>
        <Col span={24}>
          <Space direction="vertical">
            <Title level={4} className={classes.modalTitle}>
              {meal.name}
            </Title>
            <Rate
              className={classes.modalRateStars}
              disabled
              allowHalf
              value={meal.mealRate}
            />
            <Paragraph className={classes.modalDescription}>
              {meal.description}
            </Paragraph>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

export default RestaurantMealModal;
