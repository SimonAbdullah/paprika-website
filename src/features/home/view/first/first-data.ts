import useTranslation from "next-translate/useTranslation";
import { TranslationFiles } from "../../../../core/core";

export const useFirstData = () => {
  const { t } = useTranslation(TranslationFiles.HOME);

  return [
    {
      image: "/images/home/first-dish-0.png",
      alt: t("alt.dishImage"),
      title: t("first.first-title-0"),
      description: t("first.first-description-0"),
    },
    {
      image: "/images/home/first-dish-1.png",
      alt: t("alt.dishImage"),
      title: t("first.first-title-1"),
      description: t("first.first-description-1"),
    },
    {
      image: "/images/home/first-dish-2.png",
      alt: t("alt.dishImage"),
      title: t("first.first-title-2"),
      description: t("first.first-description-2"),
    },
    {
      image: "/images/home/first-dish-3.png",
      alt: t("alt.dishImage"),
      title: t("first.first-title-3"),
      description: t("first.first-description-3"),
    },
  ];
};
