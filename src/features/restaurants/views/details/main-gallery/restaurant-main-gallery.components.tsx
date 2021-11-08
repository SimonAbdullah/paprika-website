import { Col, Row, Image as AntdImage } from "antd";
import { FunctionComponent, useState } from "react";
import Image from "next/image";
import classes from "./style.module.css";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { isDataEmpty } from "../../../../../core/functions";
import ImagesPreview from "../../../../shared/images-preview/images-preview.components";

interface RestaurantMainGalleryProps {}

const RestaurantMainGallery: FunctionComponent<RestaurantMainGalleryProps> =
  () => {
    const { galleryItems } = useRestaurantDetails();

    const { lg } = useBreakpoint();

    const [visible, setVisible] = useState(false);

    const [current, setCurrent] = useState<number>();

    const handleImageClick = (position?: number) => {
      setVisible(true);
      setCurrent(position);
    };

    if (isDataEmpty(galleryItems)) return null;

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
            onClick={() => handleImageClick(0)}
            className={classes.image}
          />
        </Col>
        <Col span={8} style={{ paddingInlineStart: "0.3rem" }}>
          <Row>
            {galleryItems?.slice(1, 4)?.map((item, index) => (
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
                  onClick={() => handleImageClick(index + 1)}
                  className={classes.image}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <ImagesPreview
          images={galleryItems}
          visible={visible}
          setVisible={setVisible}
          current={current}
        />
      </Row>
    );
  };

export default RestaurantMainGallery;
