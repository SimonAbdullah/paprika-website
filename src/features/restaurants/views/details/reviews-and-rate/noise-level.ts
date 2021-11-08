import useTranslation from "next-translate/useTranslation";
import { TranslationFiles } from "../../../../../core/core";
import { RestaurantHomeDto } from "../../../../customers/services/customer-restaurant/models/restaurantHomeDto";

export const useNoiseLevel = (level?: RestaurantHomeDto.NoiseLevelEnum) => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  switch (level) {
    case RestaurantHomeDto.NoiseLevelEnum.LOW: {
      return t("low");
    }
    case RestaurantHomeDto.NoiseLevelEnum.MEDIUM: {
      return t("medium");
    }
    case RestaurantHomeDto.NoiseLevelEnum.HIGH: {
      return t("high");
    }
    default: {
      return level;
    }
  }
};
