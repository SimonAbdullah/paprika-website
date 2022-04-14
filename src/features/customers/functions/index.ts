type CustomerConfigurationTypesDtoKeys =
  | "musicTypes"
  | "cuisineTypes"
  | "amenityTypes"
  | "ambianceTypes"
  | "parkingTypes"
  | "restaurantTypes";

type GetAllPlacesParamsKeys =
  | "parkingtypes"
  | "ambiancetypes"
  | "musictypes"
  | "cuisinetypes"
  | "amenitytypes"
  | "restauranttypes";

export const mapFromCustomerConfigurationTypesDtoToGetAllPlacesParamsDto = (
  types: CustomerConfigurationTypesDtoKeys
): GetAllPlacesParamsKeys => {
  switch (types) {
    case "ambianceTypes":
      return "ambiancetypes";
    case "amenityTypes":
      return "amenitytypes";
    case "cuisineTypes":
      return "cuisinetypes";
    case "musicTypes":
      return "musictypes";
    case "parkingTypes":
      return "parkingtypes";
    case "restaurantTypes":
      return "restauranttypes";
  }
};
