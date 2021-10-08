import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../core/core";

interface IconProps {
  className?: string;
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
      width="24px"
      height="24px"
      objectFit="contain"
      objectPosition="center"
      className={className}
    />
  );
};

export { RightArrow, LeftArrow, ListRightArrow, ListLeftArrow, LocationIcon };
