import { FunctionComponent } from "react";
import Image from "next/image";
import classes from "./style.module.css";
import { GalleryItemDto } from "../../../../customers/services/customer-restaurant/models/galleryItemDto";
import { isDataEmpty } from "../../../../../core/functions";

interface RestaurantGalleryOfOneImagesProps {
  galleryItems: GalleryItemDto[];
  handleImageClick: (position?: number) => void;
  index: number;
}

const RestaurantGalleryOfOneImages: FunctionComponent<
  RestaurantGalleryOfOneImagesProps
> = ({ galleryItems, handleImageClick, index }) => {
  if (isDataEmpty(galleryItems)) return null;

  return (
    <Image
      src={galleryItems?.[0]?.image!}
      alt={galleryItems?.[0]?.title}
      blurDataURL={galleryItems?.[0]?.thumbnailImage}
      priority={true}
      placeholder="blur"
      layout="fill"
      objectFit="cover"
      objectPosition="center"
      className={classes.image}
      onClick={() => handleImageClick(index)}
    />
  );
};

export default RestaurantGalleryOfOneImages;
