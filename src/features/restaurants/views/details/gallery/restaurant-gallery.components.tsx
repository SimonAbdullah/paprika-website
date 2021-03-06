import { Row, List, Button, message } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent, useEffect, useState } from "react";
import { PagesUrls, TranslationFiles } from "../../../../../core/core";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import classes from "./style.module.css";
import RestaurantGalleryItem from "./restaurant-gallery-item.components";
import { GalleryItemDto } from "../../../../customers/services/customer-restaurant/models/galleryItemDto";
import { GALLERY } from "../../../constants/restaurants.constants";
import ImagesPreview from "../../../../shared/images-preview/images-preview.components";
import CopyToClipboard from "react-copy-to-clipboard";
import { LinkOutlined } from "@ant-design/icons";
import urlJoin from "url-join";

interface RestaurantGalleryProps {}

const RestaurantGallery: FunctionComponent<RestaurantGalleryProps> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { t: tCommon } = useTranslation(TranslationFiles.COMMON);

  const { data: restaurantDetails, galleryItems, isLoading } = useRestaurantDetails();

  const [visible, setVisible] = useState<boolean>(false);

  const [current, setCurrent] = useState<number>();

  const [numberOfGalleryRowsToShow, setNumberOfGalleryRowsToShow] =
    useState<number>(GALLERY.NUMBER_OF_ROWS_TO_SHOW);

  const [restaurantURL, setRestaurantURL] = useState("");

  useEffect(() => {
    setRestaurantURL(urlJoin(window.location.origin, PagesUrls.RESTAURANTS, restaurantDetails?.name ?? ""));
  },[restaurantDetails?.name]);


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

  return (
    <>
      <Text className={classes.title} id="gallery">{t("ourGallery")}</Text>
      <CopyToClipboard
        text={`${restaurantURL}#gallery`} 
        onCopy={() => message.success(tCommon("linkCopied"))}
      >
        <LinkOutlined style={{margin: "0 1rem", fontSize: "1.2rem"}}/>
      </CopyToClipboard>
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
