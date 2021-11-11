import { Col, Row } from "antd";
import { FunctionComponent } from "react";
import Image from "next/image";
import classes from "./style.module.css";
import { GalleryItemDto } from "../../../../customers/services/customer-restaurant/models/galleryItemDto";
import { isDataEmpty } from "../../../../../core/functions";
import RestaurantGalleryOfOneImages from "./restaurant-gallery-of-one-images.components";

interface RestaurantGalleryOfTwoImagesProps {
  galleryItems: GalleryItemDto[];
  handleImageClick: (position?: number) => void;
  index: number;
}

const RestaurantGalleryOfTwoImages: FunctionComponent<RestaurantGalleryOfTwoImagesProps> =
  ({ galleryItems, handleImageClick, index }) => {
    if (isDataEmpty(galleryItems)) return null;

    if (galleryItems.length === 1) {
      return (
        <RestaurantGalleryOfOneImages
          galleryItems={galleryItems}
          index={index}
          handleImageClick={handleImageClick}
        />
      );
    }

    return (
      <Row className={classes.row}>
        <Col span={24} style={{ marginBottom: "0.8rem", position: "relative" }}>
          <Image
            src={galleryItems?.[0]?.image!}
            alt={galleryItems?.[0]?.title}
            blurDataURL={galleryItems?.[0]?.thumbnailImage}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className={classes.image}
            onClick={() => handleImageClick(index)}
          />
        </Col>
        {galleryItems?.[1] && (
          <Col span={24} style={{ position: "relative" }}>
            <Image
              src={galleryItems?.[1]?.image!}
              alt={galleryItems?.[1]?.title}
              blurDataURL={galleryItems?.[1]?.thumbnailImage}
              placeholder="blur"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className={classes.image}
              onClick={() => handleImageClick(index + 1)}
            />
          </Col>
        )}
      </Row>
    );
  };

export default RestaurantGalleryOfTwoImages;
