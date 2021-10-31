import { IngredientDto } from "./ingredient-dto.models";

export interface MealDto {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  thumbnailImage?: string;
  mealRate?: number;
  sequenceNumber?: number;
  isActive?: boolean;
  ingredients?: Array<IngredientDto>;
  oldUserRate?: number;
  id?: number;
}
