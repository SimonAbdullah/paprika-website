import { FunctionComponent } from "react";
import { LocationRedIcon } from "../../../../shared/icons/icons.components";

interface LocationMarkerProps {
  lat?: number | string;
  lng?: number | string;
}

const LocationMarker: FunctionComponent<LocationMarkerProps> = () => {
  return (
    <div>
      <LocationRedIcon />
    </div>
  );
};

export default LocationMarker;
