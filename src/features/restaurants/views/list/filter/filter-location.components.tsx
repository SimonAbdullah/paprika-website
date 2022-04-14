import { Select, Space } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/dist/client/router";
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

  const { push, pathname } = useRouter();

  const { options, setOptions, options1, setOptions1 } = useContext(
    RestaurantsListContext
  );

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
          allowClear
          placeholder={t("country")}
          value={options.countryId}
          onChange={(value) => {
            const result = {
              ...options,
              countryId: value,
            };

            const countryIndex = options1.findIndex(
              (emp) => emp.term?.["countryId"]
            );

            const cityIndex = options1.findIndex((emp) => emp.term?.["cityId"]);

            options1.splice(cityIndex, 1);

            const regionIndex = options1.findIndex(
              (emp) => emp.term?.["regionId"]
            );
            options1.splice(regionIndex, 1);

            if (countryIndex !== -1) {
              options1.splice(countryIndex, 1, {
                term: { ["countryId"]: value },
              });
            } else {
              const optionsResults = [
                ...options1,
                { term: { ["countryId"]: value } },
              ];
              setOptions1(optionsResults);
            }
            if (!value) {
              delete result.countryId;
              options1.splice(countryIndex, 1);
            }

            delete result.cityId;
            delete result.regionId;

            setOptions(result);

            push({ pathname: pathname, query: { ...result } });
          }}
        >
          {countries?.items.map((country) => (
            <Select.Option key={country.id} value={country.id!}>
              {country.name}
            </Select.Option>
          ))}
        </SelectSearchable>
        <SelectSearchable
          allowClear
          placeholder={t("city")}
          disabled={options.countryId ? false : true}
          value={options.cityId}
          onChange={(value) => {
            const result = {
              ...options,
              cityId: value,
            };

            const cityIndex = options1.findIndex((emp) => emp.term?.["cityId"]);
            const regionIndex = options1.findIndex(
              (emp) => emp.term?.["regionId"]
            );
            if (cityIndex !== -1) {
              options1.splice(regionIndex, 1);
              options1.splice(cityIndex, 1, {
                term: { ["cityId"]: value },
              });
            } else {
              const optionsResults = [
                ...options1,
                { term: { ["cityId"]: value } },
              ];
              setOptions1(optionsResults);
            }

            if (!value) {
              options1.splice(cityIndex, 1);
              delete result.cityId;
            }

            delete result.regionId;

            setOptions(result);

            push({ pathname: pathname, query: { ...result } });
          }}
        >
          {cities?.map((city) => (
            <Select.Option key={city.id} value={city.id!}>
              {city.name}
            </Select.Option>
          ))}
        </SelectSearchable>
        <SelectSearchable
          allowClear
          placeholder={t("region")}
          disabled={options.cityId ? false : true}
          value={options.regionId}
          onChange={(value) => {
            const result = { ...options, regionId: value };

            const regionIndex = options1.findIndex(
              (emp) => emp.term?.["regionId"]
            );

            if (regionIndex !== -1) {
              options1.splice(regionIndex, 1, {
                term: { ["regionId"]: value },
              });
            } else {
              const optionsResults = [
                ...options1,
                { term: { ["regionId"]: value } },
              ];
              setOptions1(optionsResults);
            }
            if (!value) {
              options1.splice(regionIndex, 1);
              delete result.regionId;
            }

            setOptions(result);

            push({ pathname: pathname, query: { ...result } });
          }}
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
