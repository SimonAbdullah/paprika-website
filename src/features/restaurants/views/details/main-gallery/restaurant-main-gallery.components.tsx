import { Col, Row, Space } from "antd";
import { FunctionComponent } from "react";
import Image from "next/image";
import classes from "./style.module.css";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

interface RestaurantMainGalleryProps {}

const RestaurantMainGallery: FunctionComponent<RestaurantMainGalleryProps> =
  () => {
    const { galleryItems } = useRestaurantDetails();

    const { lg } = useBreakpoint();

    if (!galleryItems || galleryItems.length === 0) return null;

    return (
      <Row
        className={classes.mainGalleryContainer}
        hidden={!lg}
        justify="center"
      >
        <Col span={16} style={{ marginBottom: "0.3rem" }}>
          <Image
            src={galleryItems?.[0]?.image!}
            alt={galleryItems?.[0]?.title}
            blurDataURL={galleryItems?.[0]?.thumbnailImage}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </Col>
        <Col span={8} style={{ paddingInlineStart: "0.3rem" }}>
          <Row>
            {galleryItems?.slice(1, 4)?.map((item) => (
              <Col span={24} style={{ paddingBottom: "0.3rem" }} key={item.id}>
                <Image
                  src={item?.image!}
                  alt={item?.title}
                  blurDataURL={item?.thumbnailImage}
                  placeholder={"blur"}
                  layout="responsive"
                  width="100%"
                  height="30%"
                  objectFit="cover"
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    );
  };

export default RestaurantMainGallery;
