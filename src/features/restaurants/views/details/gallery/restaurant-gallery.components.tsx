import { Row, List, Button } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent, useState } from "react";
import { TranslationFiles } from "../../../../../core/core";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import classes from "./style.module.css";
import RestaurantGalleryItem from "./restaurant-gallery-item.components";
import { GalleryItemDto } from "../../../../customers/services/customer-restaurant/models/galleryItemDto";
import { isDataEmpty, isOdd } from "../../../../../core/functions";
import { GALLERY } from "../../../constants/restaurants.constants";
import ImagesPreview from "../../../../shared/images-preview/images-preview.components";

interface RestaurantGalleryProps {}

const RestaurantGallery: FunctionComponent<RestaurantGalleryProps> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { galleryItems, isLoading } = useRestaurantDetails();

  const [visible, setVisible] = useState<boolean>(false);

  const [current, setCurrent] = useState<number>();

  const [numberOfGalleryRowsToShow, setNumberOfGalleryRowsToShow] =
    useState<number>(GALLERY.NUMBER_OF_ROWS_TO_SHOW);

  const galleryRows: { [key: string]: GalleryItemDto[] } = {};

  if (galleryItems) {
    let rowsCount = 0;
    for (
      let outerIndex = 0;
      outerIndex < galleryItems.length && rowsCount < numberOfGalleryRowsToShow;
      outerIndex = outerIndex + GALLERY.NUMBER_OF_IMAGES_PER_ROW
    ) {
      let row = galleryItems.slice(
        outerIndex,
        outerIndex + GALLERY.NUMBER_OF_IMAGES_PER_ROW
      );
      galleryRows[rowsCount] = row;
      rowsCount++;
    }
  }

  const data = Object.entries(galleryRows);

  if (isDataEmpty(galleryItems)) return null;

  return (
    <>
      <Text className={classes.title}>{t("ourGallery")}</Text>
      <List
        split={false}
        dataSource={data}
        loading={isLoading}
        loadMore={
          data && data.length > GALLERY.NUMBER_OF_ROWS_TO_SHOW ? (
            <div style={{ textAlign: "center" }}>
              <Button
                size="large"
                type="primary"
                onClick={() => {
                  setNumberOfGalleryRowsToShow(
                    numberOfGalleryRowsToShow
                      ? Math.ceil(
                          galleryItems?.length! /
                            GALLERY.NUMBER_OF_IMAGES_PER_ROW
                        )
                      : GALLERY.NUMBER_OF_ROWS_TO_SHOW
                  );
                }}
                className={classes.showMoreButton}
              >
                {numberOfGalleryRowsToShow <
                Math.ceil(
                  galleryItems?.length! / GALLERY.NUMBER_OF_IMAGES_PER_ROW
                )
                  ? t("showMore")
                  : t("showLess")}
              </Button>
            </div>
          ) : (
            <></>
          )
        }
        renderItem={([rowNumber, row]) => {
          return (
            <List.Item key={rowNumber} className={classes.galleryRowContainer}>
              <Row
                className={classes.mainGalleryContainer}
                justify="space-between"
              >
                <RestaurantGalleryItem
                  galleryItems={row}
                  setVisible={setVisible}
                  setCurrent={setCurrent}
                  rowNumber={Number(rowNumber)}
                />
              </Row>
            </List.Item>
          );
        }}
      />
      <ImagesPreview
        images={galleryItems}
        visible={visible}
        setVisible={setVisible}
        current={current}
      />
    </>
  );
};

export default RestaurantGallery;
