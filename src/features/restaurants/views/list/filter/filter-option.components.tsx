import classes from "./style.module.css";
import { Checkbox } from "antd";
import { EnumValue } from "../../../../customers/services/customer-configuration/models/enum-value.models";
import { useContext } from "react";
import { RestaurantsListContext } from "../../../contexts/restaurants-list.contexts";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useRouter } from "next/dist/client/router";

export interface FilterOptionProps {
  attribute: EnumValue;
  optionName: string;
}

const FilterOption: React.FC<FilterOptionProps> = ({
  attribute,
  optionName,
}) => {
  const { push, pathname } = useRouter();

  const { options, setOptions } = useContext(RestaurantsListContext);

  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const temp = (options as any)?.[optionName]
        ? (options as any)?.[optionName].split(",")
        : [];

      temp?.push(String(attribute.value));

      const newOptions = temp?.join(",");

      const result = { ...options, [optionName]: newOptions };

      setOptions(result);

      push({ pathname: pathname, query: { ...result } });
    } else {
      const temp = (options as any)?.[optionName]
        ? (options as any)?.[optionName].split(",")
        : [];

      temp?.splice(temp.indexOf(String(attribute.value)), 1);

      const newOptions = temp?.join(",");

      const { [optionName]: _, ...optionsWithoutOptionName } = options as any;

      const result = newOptions
        ? { ...options, [optionName]: newOptions }
        : { ...(optionsWithoutOptionName || {}) };

      setOptions(result);

      push({ pathname: pathname, query: { ...result } });
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
        {attribute.name}
      </Checkbox>
    </p>
  );
};

export default FilterOption;
