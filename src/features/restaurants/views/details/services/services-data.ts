import useTranslation from "next-translate/useTranslation";
import { TranslationFiles } from "../../../../../core/core";
import { bitwiseAnd } from "../../../../../core/functions";
import {
  CuisineType,
  MusicType,
  ParkingType,
} from "../../../../customers/constants/customer-restaurant.constants";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";

export const useServicesData = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);
  const { data } = useRestaurantDetails();

  return [
    {
      logo: "/images/restaurant/mobile.svg",
      title: t("mobile"),
      alt: t("mobile"),
      description: data?.phoneNumber ? data.phoneNumber : t("notAvailable"),
    },
    {
      logo: "/images/restaurant/phone.svg",
      title: t("phone"),
      alt: t("phone"),
      description: data?.tel ? data.tel : t("notAvailable"),
    },
    {
      logo: "/images/restaurant/chair.svg",
      title: t("capacity"),
      alt: t("capacity"),
      description: data?.settings?.maxPeopleAllowed
        ? `${t("upTo")} ${data.settings.maxPeopleAllowed} ${t("seats")}`
        : t("notAvailable"),
    },
    {
      logo: "/images/restaurant/clock.svg",
      title: t("schedule"),
      alt: t("schedule"),
      description: data?.is24Hour ? t("Is24Hour") : null,
    },
    {
      logo: "/images/restaurant/dish.svg",
      title: t("cuisine"),
      alt: t("cuisine"),
      description: data?.cuisineTypes
        ? Object.entries(CuisineType)
            .filter(([key]: any) => {
              return bitwiseAnd(key, data?.cuisineTypes!) > 0;
            })
            .map(([_, value]) => t(value))
            .join(", ")
        : t("notAvailable"),
    },
    {
      logo: "/images/restaurant/music.svg",
      title: t("music"),
      alt: t("music"),
      description: data?.musicTypes
        ? Object.entries(MusicType)
            .filter(([key]: any) => {
              return bitwiseAnd(key, data?.musicTypes!) > 0;
            })
            .map(([_, value]) => t(value))
            .join(", ")
        : t("notAvailable"),
    },
    {
      logo: "/images/restaurant/car.svg",
      title: t("parking"),
      alt: t("parking"),
      description: data?.parkingTypes
        ? Object.entries(ParkingType)
            .filter(([key]: any) => {
              return bitwiseAnd(key, data?.parkingTypes!) > 0;
            })
            .map(([_, value]) => t(value))
            .join(", ")
        : t("notAvailable"),
    },
    {
      logo: "/images/restaurant/shisha.svg",
      title: t("hookah"),
      alt: t("hookah"),
      description: data?.hasShisha ? t("hasShisha") : t("noShisha"),
    },
    {
      logo: "/images/restaurant/cups.svg",
      title: t("bear"),
      alt: t("bear"),
      description: data?.isAlcoholFree ? t("alcoholFree") : t("hasAlcohol"),
    },
    {
      logo: "/images/restaurant/no-smoking.svg",
      title: t("smoking"),
      alt: t("smoking"),
      description: data?.isSmokeFree ? t("noSmoking") : t("smokeAllowed"),
    },
    {
      logo: "/images/restaurant/table.svg",
      title: t("outdoor"),
      alt: t("outdoor"),
      description: data?.hasOutdoor
        ? t("thereIsOutdoor")
        : t("thereIsNoOutdoor"),
    },
  ];
};
