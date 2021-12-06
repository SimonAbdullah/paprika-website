import classes from "./style.module.css";
import { Checkbox } from "antd";
import { EnumValue } from "../../../../customers/services/customer-configuration/models/enum-value.models";
import useTranslation from "next-translate/useTranslation";
import { TranslationFiles } from "../../../../../core/core";
import { useContext } from "react";
import { RestaurantsListContext } from "../../../contexts/restaurants-list.contexts";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

export interface FilterOptionProps {
  attribute: EnumValue;
  optionName: string;
}

const FilterOption: React.FC<FilterOptionProps> = ({
  attribute,
  optionName,
}) => {
  const { t } = useTranslation(TranslationFiles.RESTAURANTS);

  const { options, setOptions } = useContext(RestaurantsListContext);

  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const temp = (options as any)?.[optionName]
        ? (options as any)?.[optionName].split(",")
        : [];

      temp?.push(String(attribute.value));

      const newOptions = temp?.join(",");

      setOptions({ ...options, [optionName]: newOptions });
    } else {
      const temp = (options as any)?.[optionName]
        ? (options as any)?.[optionName].split(",")
        : [];

      temp?.splice(temp.indexOf(String(attribute.value)), 1);

      const newOptions = temp?.join(",");

      const { [optionName]: _, ...optionsWithoutOptionName } = options as any;

      setOptions(
        newOptions
          ? { ...options, [optionName]: newOptions }
          : { ...(optionsWithoutOptionName || {}) }
      );
    }
  };

  return (
    <p style={{ marginBottom: "0.1em", display: "block" }}>
      <Checkbox
        style={{ width: "100%" }}
        className={classes.checkbox}
        checked={(options as any)?.[optionName]
          ?.split(",")
          .includes(String(attribute.value))}
        onChange={onCheckboxChange}
      >
        {attribute.name && t(attribute.name)}
      </Checkbox>
    </p>
  );
};

export default FilterOption;
