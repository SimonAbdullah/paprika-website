import { FunctionComponent } from "react";
import GoogleMapReact from "google-map-react";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import LocationMarker from "./location-marker.components";
import { DEFAULT_MAP_VALUES } from "../../../constants/restaurants.constants";
import Text from "antd/lib/typography/Text";
import classes from "./style.module.css";
import useTranslation from "next-translate/useTranslation";
import { TranslationFiles } from "../../../../../core/core";
import { restaurantAddressDetails } from "../../../functions/restaurant.functions";
import { LocationRedIcon } from "../../../../shared/icons/icons.components";
import { Row } from "antd";

interface LocationComponentProps {}

const LocationComponent: FunctionComponent<LocationComponentProps> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { data } = useRestaurantDetails();

  return (
    <>
      <div className={classes.textContainer}>
        <Text className={classes.title}>{t("ourLocation")}</Text>
        <Row align="middle" className={classes.details}>
          <LocationRedIcon width="24px" height="24px" />
          <Text className={classes.text}>
            {restaurantAddressDetails({
              country: data?.country,
              city: data?.city,
              region: data?.region,
            })}
          </Text>
        </Row>
      </div>
      <div style={{ height: "25rem", overflow: "hidden" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY! }}
          defaultCenter={DEFAULT_MAP_VALUES.CENTER}
          defaultZoom={DEFAULT_MAP_VALUES.ZOOM}
        >
          <LocationMarker lat={data?.latitude} lng={data?.longitude} />
        </GoogleMapReact>
      </div>
    </>
  );
};

export default LocationComponent;
