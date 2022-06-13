import { FunctionComponent, useContext, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import LocationMarker from "./location-marker.components";
import { DEFAULT_MAP_VALUES } from "../../../constants/restaurants.constants";
import Text from "antd/lib/typography/Text";
import classes from "./style.module.css";
import useTranslation from "next-translate/useTranslation";
import { PagesUrls, TranslationFiles } from "../../../../../core/core";
import { restaurantAddressDetails } from "../../../functions/restaurant.functions";
import { LocationRedIcon } from "../../../../shared/icons/icons.components";
import { message, Row } from "antd";
import CopyToClipboard from "react-copy-to-clipboard";
import { LinkOutlined } from "@ant-design/icons";
import { AppContext } from "../../../../../core/app/app.context";
import urlJoin from "url-join";

interface LocationComponentProps {}

const LocationComponent: FunctionComponent<LocationComponentProps> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { t: tCommon } = useTranslation(TranslationFiles.COMMON);

  const { data } = useRestaurantDetails();

  const [restaurantURL, setRestaurantURL] = useState("");

  const { direction } = useContext(AppContext);

  useEffect(() => {
    setRestaurantURL(urlJoin(window.location.origin, PagesUrls.RESTAURANTS, data?.name ?? ""));
  },[data?.name]);

  return (
    <>
      <div className={classes.textContainer} id="location">
        <Text className={classes.title}>{t("ourLocation")}</Text>
        <CopyToClipboard
          text={`${restaurantURL}#location`} 
          onCopy={() => message.success(tCommon("linkCopied"))}
        >
          <LinkOutlined className={direction === "rtl" ? classes.rightIcon : classes.leftIcon} />
        </CopyToClipboard>
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
          center={{
            lat: data?.latitude || DEFAULT_MAP_VALUES.CENTER.lat,
            lng: data?.longitude || DEFAULT_MAP_VALUES.CENTER.lng,
          }}
        >
          <LocationMarker lat={data?.latitude} lng={data?.longitude} />
        </GoogleMapReact>
      </div>
    </>
  );
};

export default LocationComponent;
