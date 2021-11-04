import { Row, List, Button } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent, useState } from "react";
import { TranslationFiles } from "../../../../../core/core";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import classes from "./style.module.css";
import RestaurantGalleryItem from "./restaurant-gallery-item.components";
import { GalleryItemDto } from "../../../../customers/services/customer-restaurant/models/galleryItemDto";
import { isOdd } from "../../../../../core/functions";
import { NUMBER_OF_Gallery_Rows_TO_SHOW } from "../../../constants/restaurants.constants";

interface RestaurantGalleryProps {}

const RestaurantGallery: FunctionComponent<RestaurantGalleryProps> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { galleryItems, isLoading } = useRestaurantDetails();

  const [numberOfGalleryRowsToShow, setNumberOfGalleryRowsToShow] = useState<
    number | undefined
  >(NUMBER_OF_Gallery_Rows_TO_SHOW);

  const galleryRows: { [key: string]: GalleryItemDto[][] } = {};

  if (galleryItems) {
    let rowsCount = 0;
    for (
      let outerIndex = 0;
      outerIndex < galleryItems.length;
      outerIndex = outerIndex + 7
    ) {
      let row = galleryItems.slice(outerIndex, outerIndex + 7);
      let isFirstOddInRow = true;
      let sectionNumber = 0;
      for (let innerIndex = 0; innerIndex < row.length; innerIndex++) {
        if (isOdd(sectionNumber) && isFirstOddInRow) {
          galleryRows[rowsCount] = galleryRows[rowsCount]
            ? [...galleryRows[rowsCount], row.slice(innerIndex, innerIndex + 2)]
            : [row.slice(innerIndex, innerIndex + 2)];
          isFirstOddInRow = !isFirstOddInRow;
          innerIndex++;
        } else if (isOdd(sectionNumber) && !isFirstOddInRow) {
          galleryRows[rowsCount] = galleryRows[rowsCount]
            ? [...galleryRows[rowsCount], row.slice(innerIndex, innerIndex + 3)]
            : [row.slice(innerIndex, innerIndex + 3)];
          isFirstOddInRow = !isFirstOddInRow;
          innerIndex = innerIndex + 2;
        } else {
          galleryRows[rowsCount] = galleryRows[rowsCount]
            ? [...galleryRows[rowsCount], row.slice(innerIndex, innerIndex + 1)]
            : [row.slice(innerIndex, innerIndex + 1)];
        }
        sectionNumber++;
      }
      rowsCount++;
    }
  }

  const data = Object.entries(galleryRows);

  if (!galleryItems || galleryItems.length === 0) return null;

  return (
    <>
      <Text className={classes.title}>{t("ourGallery")}</Text>
      <List
        split={false}
        dataSource={data}
        loading={isLoading}
        loadMore={
          data && data.length > NUMBER_OF_Gallery_Rows_TO_SHOW ? (
            <div style={{ textAlign: "center" }}>
              <Button
                size="large"
                type="primary"
                onClick={() => {
                  setNumberOfGalleryRowsToShow(
                    numberOfGalleryRowsToShow
                      ? undefined
                      : NUMBER_OF_Gallery_Rows_TO_SHOW
                  );
                }}
                className={classes.showMoreButton}
              >
                {numberOfGalleryRowsToShow ? t("showMore") : t("showLess")}
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
                key={rowNumber}
                className={classes.mainGalleryContainer}
                justify="space-between"
              >
                {row?.map((galleryItem, innerIndex) => {
                  return (
                    <RestaurantGalleryItem
                      key={innerIndex}
                      galleryColumn={galleryItem}
                    />
                  );
                })}
              </Row>
            </List.Item>
          );
        }}
      />
    </>
  );
};

export default RestaurantGallery;
