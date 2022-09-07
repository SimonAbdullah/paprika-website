type CustomerConfigurationTypesDtoKeys =
  | "musicTypes"
  | "cuisineTypes"
  | "amenityTypes"
  | "ambianceTypes"
  | "parkingTypes"
  | "restaurantTypes";

type GetAllPlacesParamsKeys =
  | "parkingtypesarray"
  | "ambiancetypesarray"
  | "musictypesarray"
  | "cuisinetypesarray"
  | "amenitytypesarray"
  | "restauranttypesarray";

export const mapFromCustomerConfigurationTypesDtoToGetAllPlacesParamsDto = (
  types: CustomerConfigurationTypesDtoKeys
): GetAllPlacesParamsKeys => {
  switch (types) {
    case "ambianceTypes":
      return "ambiancetypesarray";
    case "amenityTypes":
      return "amenitytypesarray";
    case "cuisineTypes":
      return "cuisinetypesarray";
    case "musicTypes":
      return "musictypesarray";
    case "parkingTypes":
      return "parkingtypesarray";
    case "restaurantTypes":
      return "restauranttypesarray";
  }
};
