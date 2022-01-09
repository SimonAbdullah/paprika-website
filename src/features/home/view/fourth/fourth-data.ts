import useTranslation from "next-translate/useTranslation";
import { TranslationFiles } from "../../../../core/core";

export interface HomeFourthData {
  id: string;
  image: {
    src: string;
    alt: string;
  };
  backgroundImage: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  learnMoreHref: string;
}

export const useFourthData = (): HomeFourthData[] => {
  const { t } = useTranslation(TranslationFiles.HOME);
  return [
    {
      id: "discoverRestaurants",
      image: {
        src: "/images/home/fourth-discover-restaurants.png",
        alt: t("fourth.discoverRestaurants"),
      },
      backgroundImage: {
        src: "/images/home/fourth-discover-restaurants-background.png",
        alt: t("fourth.discoverRestaurants"),
      },
      title: t("fourth.discoverRestaurants"),
      description: t("fourth.discoverRestaurantsDescription"),
      learnMoreHref: "#discoverRestaurants",
    },
    {
      id: "reservations",
      image: {
        src: "/images/home/fourth-reservation.png",
        alt: t("fourth.reservations"),
      },
      backgroundImage: {
        src: "/images/home/fourth-reservation-background.png",
        alt: t("fourth.reservations"),
      },
      title: t("fourth.reservations"),
      description: t("fourth.reservationDescription"),
      learnMoreHref: "#reservations",
    },
    {
      id: "pickupAndDelivery",
      image: {
        src: "/images/home/fourth-pickup-and-delivery.png",
        alt: t("fourth.pickupAndDelivery"),
      },
      backgroundImage: {
        src: "/images/home/fourth-pickup-and-delivery-background.png",
        alt: t("fourth.pickupAndDelivery"),
      },
      title: t("fourth.pickupAndDelivery"),
      description: t("fourth.pickupAndDeliveryDescription"),
      learnMoreHref: "#pickupAndDelivery",
    },
    {
      id: "paprikaInside",
      image: {
        src: "/images/home/fourth-paprika-inside.png",
        alt: t("fourth.paprikaInside"),
      },
      backgroundImage: {
        src: "/images/home/fourth-paprika-inside-background.png",
        alt: t("fourth.paprikaInside"),
      },
      title: t("fourth.paprikaInside"),
      description: t("fourth.paprikaInsideDescription"),
      learnMoreHref: "#paprikaInside",
    },
  ];
};
