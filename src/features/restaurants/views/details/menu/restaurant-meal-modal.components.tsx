import { Col, Modal, Rate, Row, Space } from "antd";
import useTranslation from "next-translate/useTranslation";
import { Dispatch, FunctionComponent, SetStateAction, useContext } from "react";
import { TranslationFiles } from "../../../../../core/core";
import Image from "next/image";
import { MealDto } from "../../../../customers/services/customer-menu/models/meal-dto.models";
import Paragraph from "antd/lib/typography/Paragraph";
import classes from "./style.module.css";
import Text from "antd/lib/typography/Text";
import { currencyFormatter } from "../../../../../core/functions";
import { AppContext } from "../../../../../core/app/app.context";

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

  const { direction } = useContext(AppContext);

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
            src={meal?.image || "/images/home/fallback-image.png"}
            alt={meal?.name}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            {...(meal?.thumbnailImage
              ? { blurDataURL: meal?.thumbnailImage, placeholder: "blur" }
              : {})}
          />
        </Col>
        <Col span={24}>
          <Space direction="vertical" style={{width: "100%"}}>
            <div>
              <Space className={classes.modalTitleContent}>
                <Text className={classes.modalTitle}>{meal?.name}</Text>
                {meal?.price && (
                  <Text className={classes.mealPrice}>
                    {currencyFormatter(
                      direction === "ltr" ? "en-SY" : "ar-SY"
                    ).format(meal.price)}
                  </Text>
                )}
              </Space>
              <div>
                <Rate
                  className={classes.modalRateStars}
                  disabled
                  allowHalf
                  value={meal?.mealRate}
                />
              </div>
            </div>
            <Paragraph className={classes.modalDescription}>
              {meal?.description}
            </Paragraph>
            <Paragraph className={classes.modalDescription}>
              {meal.ingredients
                ?.map((ingredient) => ingredient.name)
                .join(", ")}
            </Paragraph>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

export default RestaurantMealModal;
