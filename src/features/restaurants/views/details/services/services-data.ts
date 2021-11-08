import useTranslation from "next-translate/useTranslation";
import { TranslationFiles } from "../../../../../core/core";

export const useServicesData = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);
  return [
    {
      logo: "/images/restaurant/chair.svg",
      title: t("capacity"),
      alt: t("capacity"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/bed.svg",
      title: t("bedrooms"),
      alt: t("bedrooms"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/meeting.svg",
      title: t("meeting"),
      alt: t("meeting"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/clock.svg",
      title: t("openingHours"),
      alt: t("openingHours"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/dish.svg",
      title: t("serviceAndFacilities"),
      alt: t("serviceAndFacilities"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/floor.svg",
      title: t("floorPlan"),
      alt: t("floorPlan"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/music.svg",
      title: t("music"),
      alt: t("music"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/car.svg",
      title: t("valet"),
      alt: t("valet"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/shisha.svg",
      title: t("hookah"),
      alt: t("hookah"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/cups.svg",
      title: t("bear"),
      alt: t("bear"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/no-smoking.svg",
      title: t("smoking"),
      alt: t("smoking"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/table.svg",
      title: t("table"),
      alt: t("table"),
      description: t("upTo70Seats"),
    },
  ];
};
