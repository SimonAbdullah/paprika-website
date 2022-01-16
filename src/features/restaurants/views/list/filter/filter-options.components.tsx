import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../../core/core";
import { mapFromCustomerConfigurationTypesDtoToGetAllPlacesParamsDto } from "../../../../customers/functions";
import { useCustomerConfiguration } from "../../../../customers/hooks/customer-configuration.hooks";
import { EnumValue } from "../../../../customers/services/customer-configuration/models/enum-value.models";
import FilterOption from "./filter-option.components";

interface FilterOptionsProps {
  optionName: string;
}

const FilterOptions: FunctionComponent<FilterOptionsProps> = ({
  optionName,
}) => {
  const { t } = useTranslation(TranslationFiles.RESTAURANTS);

  const { types } = useCustomerConfiguration();

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
        {t(optionName)}
      </Text>
      {(types as any)?.[optionName]?.map((attribute: EnumValue) => (
        <FilterOption
          key={attribute.name}
          attribute={attribute}
          optionName={mapFromCustomerConfigurationTypesDtoToGetAllPlacesParamsDto(
            optionName as any
          )}
        />
      ))}
    </>
  );
};

export default FilterOptions;
