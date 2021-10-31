import useTranslation from "next-translate/useTranslation";
import { TranslationFiles } from "../../../../../core/core";

export const servicesData = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);
  return [
    {
      logo: "/images/restaurant/chair.svg",
      title: t("capacity"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/bed.svg",
      title: t("bedrooms"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/meeting.svg",
      title: t("meeting"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/clock.svg",
      title: t("openingHours"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/dish.svg",
      title: t("serviceAndFacilities"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/floor.svg",
      title: t("floorPlan"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/music.svg",
      title: t("music"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/car.svg",
      title: t("valet"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/shisha.svg",
      title: t("hookah"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/cups.svg",
      title: t("bear"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/no-smoking.svg",
      title: t("smoking"),
      description: t("upTo70Seats"),
    },
    {
      logo: "/images/restaurant/table.svg",
      title: t("table"),
      description: t("upTo70Seats"),
    },
  ];
};
