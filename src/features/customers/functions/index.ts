type CustomerConfigurationTypesDtoKeys =
  | "musicTypes"
  | "cuisineTypes"
  | "amenityTypes"
  | "ambianceTypes"
  | "parkingTypes"
  | "restaurantTypes";

type GetAllPlacesParamsKeys =
  | "parkingType"
  | "ambianceType"
  | "musicType"
  | "cuisineTypes"
  | "amenityTypes"
  | "restaurantTypes";

export const mapFromCustomerConfigurationTypesDtoToGetAllPlacesParamsDto = (
  types: CustomerConfigurationTypesDtoKeys
): GetAllPlacesParamsKeys => {
  switch (types) {
    case "ambianceTypes":
      return "ambianceType";
    case "amenityTypes":
      return "amenityTypes";
    case "cuisineTypes":
      return "cuisineTypes";
    case "musicTypes":
      return "musicType";
    case "parkingTypes":
      return "parkingType";
    case "restaurantTypes":
      return "restaurantTypes";
  }
};
