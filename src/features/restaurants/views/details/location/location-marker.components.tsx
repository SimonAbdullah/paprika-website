import { FunctionComponent } from "react";
import { EnvironmentFilled } from "@ant-design/icons";
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
