import { FunctionComponent } from "react";
import GoogleMapReact from "google-map-react";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import LocationMarker from "./location-marker.components";
import { DEFAULT_MAP_VALUES } from "../../../constants/restaurants.constants";

interface LocationComponentProps {}

const LocationComponent: FunctionComponent<LocationComponentProps> = () => {
  const { data } = useRestaurantDetails();
  return (
    <div style={{ height: "25rem" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY! }}
        defaultCenter={DEFAULT_MAP_VALUES.CENTER}
        defaultZoom={DEFAULT_MAP_VALUES.ZOOM}
      >
        <LocationMarker lat={data?.latitude} lng={data?.longitude} />
      </GoogleMapReact>
    </div>
  );
};

export default LocationComponent;
