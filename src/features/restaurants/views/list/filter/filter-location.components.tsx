import { Select, Space } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent, useContext } from "react";
import { TranslationFiles } from "../../../../../core/core";
import {
  useCities,
  useCustomerConfiguration,
  useRegions,
} from "../../../../customers/hooks/customer-configuration.hooks";
import SelectSearchable from "../../../../shared/select-searchable/select-searchable.components";
import { RestaurantsListContext } from "../../../contexts/restaurants-list.contexts";

interface FilterLocationProps {}

const FilterLocation: FunctionComponent<FilterLocationProps> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANTS);

  const { options, setOptions } = useContext(RestaurantsListContext);

  const { countries } = useCustomerConfiguration();

  const { cities } = useCities(options.countryId);

  const { regions } = useRegions(options.cityId);

  return (
    <>
      <Text
        style={{
          fontWeight: 600,
          fontFamily: "Poppins",
          fontSize: "0.9rem",
          display: "block",
          marginBottom: "0.5rem",
        }}
      >
        {t("location")}
      </Text>
      <Space direction="vertical" style={{ width: "100%" }}>
        <SelectSearchable
          placeholder={t("country")}
          value={options.countryId}
          onChange={(value) =>
            setOptions({
              ...options,
              countryId: value,
              cityId: undefined,
              regionId: undefined,
            })
          }
        >
          {countries?.items.map((country) => (
            <Select.Option key={country.id} value={country.id!}>
              {country.name}
            </Select.Option>
          ))}
        </SelectSearchable>
        <SelectSearchable
          placeholder={t("city")}
          disabled={options.countryId ? false : true}
          value={options.cityId}
          onChange={(value) =>
            setOptions({ ...options, cityId: value, regionId: undefined })
          }
        >
          {cities?.map((city) => (
            <Select.Option key={city.id} value={city.id!}>
              {city.name}
            </Select.Option>
          ))}
        </SelectSearchable>
        <SelectSearchable
          placeholder={t("region")}
          disabled={options.cityId ? false : true}
          value={options.regionId}
          onChange={(value) => setOptions({ ...options, regionId: value })}
        >
          {regions?.map((region) => (
            <Select.Option key={region.id} value={region.id!}>
              {region.name}
            </Select.Option>
          ))}
        </SelectSearchable>
      </Space>
    </>
  );
};

export default FilterLocation;
