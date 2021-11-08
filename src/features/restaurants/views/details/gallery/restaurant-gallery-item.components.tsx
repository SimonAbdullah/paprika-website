import { Col } from "antd";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import classes from "./style.module.css";
import { GalleryItemDto } from "../../../../customers/services/customer-restaurant/models/galleryItemDto";
import RestaurantGalleryOfOneImages from "./restaurant-gallery-of-one-images.components";
import RestaurantGalleryOfTwoImages from "./restaurant-gallery-of-two-images.components";
import RestaurantGalleryOfThreeImages from "./restaurant-gallery-of-three-images.components";
import { GALLERY } from "../../../constants/restaurants.constants";

interface RestaurantGalleryItemProps {
  galleryItems: GalleryItemDto[];
  setVisible?: Dispatch<SetStateAction<boolean>>;
  setCurrent?: Dispatch<SetStateAction<number | undefined>>;
  rowNumber: number;
}

const RestaurantGalleryItem: FunctionComponent<RestaurantGalleryItemProps> = ({
  galleryItems,
  setCurrent,
  setVisible,
  rowNumber,
}) => {
  const galleryColumnOne = galleryItems?.slice(0, 1);

  const galleryColumnTwo = galleryItems?.slice(1, 3);

  const galleryColumnThree = galleryItems?.slice(3, 4);

  const galleryColumnFour = galleryItems?.slice(4, 7);

  const handleImageClick = (position?: number) => {
    setVisible && setVisible(true);
    setCurrent && setCurrent(position);
  };

  return (
    <>
      <Col xs={11} lg={5} className={classes.column}>
        <RestaurantGalleryOfOneImages
          galleryItems={galleryColumnOne}
          index={rowNumber * GALLERY.NUMBER_OF_IMAGES_PER_ROW + 0}
          handleImageClick={handleImageClick}
        />
      </Col>
      <Col xs={11} lg={6} className={classes.column}>
        <RestaurantGalleryOfTwoImages
          galleryItems={galleryColumnTwo}
          index={rowNumber * GALLERY.NUMBER_OF_IMAGES_PER_ROW + 1}
          handleImageClick={handleImageClick}
        />
      </Col>
      <Col xs={11} lg={5} className={classes.column}>
        <RestaurantGalleryOfOneImages
          galleryItems={galleryColumnThree}
          index={rowNumber * GALLERY.NUMBER_OF_IMAGES_PER_ROW + 3}
          handleImageClick={handleImageClick}
        />
      </Col>
      <Col xs={11} lg={6} className={classes.column}>
        <RestaurantGalleryOfThreeImages
          galleryItems={galleryColumnFour}
          index={rowNumber * GALLERY.NUMBER_OF_IMAGES_PER_ROW + 4}
          handleImageClick={handleImageClick}
        />
      </Col>
    </>
  );
};

export default RestaurantGalleryItem;
