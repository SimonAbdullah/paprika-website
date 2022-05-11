import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../core/core";
import { NextImageLayoutType } from "../../../core/types";

interface IconProps {
  className?: string;
  width?: string;
  height?: string;
  layout?: NextImageLayoutType;
}

const RightArrow: FunctionComponent<IconProps> = ({ className }) => {
  const { t } = useTranslation(TranslationFiles.COMMON);
  return (
    <Image
      src="/icons/right-arrow.svg"
      alt={t("alt.rightArrow")}
      width="80px"
      height="80px"
      objectPosition="center"
      className={className}
      priority={true}
    />
  );
};

const LeftArrow: FunctionComponent<IconProps> = ({ className }) => {
  const { t } = useTranslation(TranslationFiles.COMMON);
  return (
    <Image
      src="/icons/left-arrow.svg"
      alt={t("alt.leftArrow")}
      width="80px"
      height="80px"
      objectPosition="center"
      className={className}
      priority={true}
    />
  );
};

const RightArrowBlack: FunctionComponent<IconProps> = ({ className }) => {
  const { t } = useTranslation(TranslationFiles.COMMON);
  return (
    <Image
      src="/icons/right-arrow-black.svg"
      alt={t("alt.rightArrow")}
      width="80px"
      height="80px"
      objectPosition="center"
      className={className}
      priority={true}
    />
  );
};

const LeftArrowBlack: FunctionComponent<IconProps> = ({ className }) => {
  const { t } = useTranslation(TranslationFiles.COMMON);
  return (
    <Image
      src="/icons/left-arrow-black.svg"
      alt={t("alt.leftArrow")}
      width="80px"
      height="80px"
      objectPosition="center"
      className={className}
      priority={true}
    />
  );
};

const ListRightArrow: FunctionComponent<IconProps> = ({ className }) => {
  const { t } = useTranslation(TranslationFiles.COMMON);
  return (
    <Image
      src="/icons/list-right-arrow.svg"
      alt={t("alt.rightArrow")}
      width="64px"
      height="64px"
      objectFit="contain"
      objectPosition="center"
      priority={true}
      className={className}
    />
  );
};

const ListLeftArrow: FunctionComponent<IconProps> = ({ className }) => {
  const { t } = useTranslation(TranslationFiles.COMMON);
  return (
    <Image
      src="/icons/list-left-arrow.svg"
      alt={t("alt.leftArrow")}
      width="64px"
      height="64px"
      objectFit="contain"
      objectPosition="center"
      priority={true}
      className={className}
    />
  );
};

const LocationIcon: FunctionComponent<IconProps> = ({ className }) => {
  const { t } = useTranslation(TranslationFiles.COMMON);
  return (
    <Image
      src="/icons/location.svg"
      alt={t("alt.location")}
      width="16px"
      height="16px"
      objectFit="contain"
      objectPosition="center"
      className={className}
      priority={true}
    />
  );
};

const LocationBlackIcon: FunctionComponent<IconProps> = ({ className }) => {
  const { t } = useTranslation(TranslationFiles.COMMON);
  return (
    <Image
      src="/icons/location-black.svg"
      alt={t("alt.location")}
      width="24px"
      height="24px"
      objectFit="contain"
      objectPosition="center"
      className={className}
      priority={true}
    />
  );
};

const LocationRedIcon: FunctionComponent<IconProps> = ({
  className,
  width,
  height,
  layout,
}) => {
  const { t } = useTranslation(TranslationFiles.COMMON);
  return (
    <Image
      src="/icons/location-red.svg"
      alt={t("alt.location")}
      width={width || "36px"}
      height={height || "36px"}
      layout={layout || "fixed"}
      objectFit="contain"
      objectPosition="center"
      className={className}
      priority={true}
    />
  );
};

const GridViewIcon: FunctionComponent<{ type?: "active" | "inactive" }> = ({
  type = "active",
}) => {
  const { t } = useTranslation(TranslationFiles.RESTAURANTS);
  return (
    <Image
      src={`/images/restaurants/grid-view-${type}.svg`}
      alt={t("gridView")}
      width={"18px"}
      height={"18px"}
      layout={"fixed"}
      objectFit="contain"
      objectPosition="center"
    />
  );
};

const ListViewIcon: FunctionComponent<{ type?: "active" | "inactive" }> = ({
  type = "active",
}) => {
  const { t } = useTranslation(TranslationFiles.RESTAURANTS);
  return (
    <Image
      src={`/images/restaurants/list-view-${type}.svg`}
      alt={t("listView")}
      width={"18px"}
      height={"18px"}
      layout={"fixed"}
      objectFit="contain"
      objectPosition="center"
    />
  );
};

export {
  RightArrow,
  LeftArrow,
  RightArrowBlack,
  LeftArrowBlack,
  ListRightArrow,
  ListLeftArrow,
  LocationIcon,
  LocationBlackIcon,
  LocationRedIcon,
  GridViewIcon,
  ListViewIcon,
};
