import { Col, Row } from "antd";
import { FunctionComponent } from "react";
import Image from "next/image";
import classes from "./style.module.css";
import { GalleryItemDto } from "../../../../customers/services/customer-restaurant/models/galleryItemDto";

interface RestaurantGalleryItemProps {
  galleryColumn: GalleryItemDto[];
}

const RestaurantGalleryItem: FunctionComponent<RestaurantGalleryItemProps> = ({
  galleryColumn,
}) => {
  if (galleryColumn.length === 3) {
    return (
      <Col xs={11} lg={6} className={classes.column}>
        <Row className={classes.row}>
          <Col span={24} style={{ marginBottom: "0.8rem" }}>
            <Row justify="space-between" className={classes.row}>
              <Col span={11}>
                <Image
                  src={galleryColumn?.[0]?.image!}
                  alt={galleryColumn?.[0]?.title}
                  blurDataURL={galleryColumn?.[0]?.thumbnailImage}
                  placeholder="blur"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className={classes.image}
                />
              </Col>
              {galleryColumn?.[1] && (
                <Col span={11}>
                  <Image
                    src={galleryColumn?.[1]?.image!}
                    alt={galleryColumn?.[1]?.title}
                    blurDataURL={galleryColumn?.[1]?.thumbnailImage}
                    placeholder="blur"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className={classes.image}
                  />
                </Col>
              )}
            </Row>
          </Col>
          {galleryColumn?.[2] && (
            <Col span={24}>
              <Image
                src={galleryColumn?.[2]?.image!}
                alt={galleryColumn?.[2]?.title}
                blurDataURL={galleryColumn?.[2]?.thumbnailImage}
                placeholder="blur"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className={classes.image}
              />
            </Col>
          )}
        </Row>
      </Col>
    );
  }

  if (galleryColumn.length === 2) {
    return (
      <Col xs={11} lg={5} className={classes.column}>
        <Row className={classes.row}>
          <Col span={24} style={{ marginBottom: "0.8rem" }}>
            <Image
              src={galleryColumn?.[0]?.image!}
              alt={galleryColumn?.[0]?.title}
              blurDataURL={galleryColumn?.[0]?.thumbnailImage}
              placeholder="blur"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className={classes.image}
            />
          </Col>
          {galleryColumn?.[1] && (
            <Col span={24}>
              <Image
                src={galleryColumn?.[1]?.image!}
                alt={galleryColumn?.[1]?.title}
                blurDataURL={galleryColumn?.[1]?.thumbnailImage}
                placeholder="blur"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className={classes.image}
              />
            </Col>
          )}
        </Row>
      </Col>
    );
  }

  return (
    <Col xs={11} lg={5} className={classes.column}>
      <Image
        src={galleryColumn?.[0]?.image!}
        alt={galleryColumn?.[0]?.title}
        blurDataURL={galleryColumn?.[0]?.thumbnailImage}
        placeholder="blur"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className={classes.image}
      />
    </Col>
  );
};

export default RestaurantGalleryItem;
