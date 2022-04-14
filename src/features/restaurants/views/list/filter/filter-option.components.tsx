import classes from "./style.module.css";
import { Checkbox } from "antd";
import { EnumValue } from "../../../../customers/services/customer-configuration/models/enum-value.models";
import { useContext } from "react";
import { RestaurantsListContext } from "../../../contexts/restaurants-list.contexts";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useRouter } from "next/dist/client/router";
import {
  bitwiseAnd,
  bitwiseOr,
  bitwiseXor,
} from "../../../../../core/functions";

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

  const { options1, setOptions1 } = useContext(RestaurantsListContext);

  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const newOptions = (options as any)?.[optionName]
        ? bitwiseOr(Number((options as any)?.[optionName]), e.target.value)
        : e.target.value;

      const result = { ...options, [optionName]: newOptions };

      const index = options1.findIndex((emp) => emp.term?.[optionName]);

      if (index !== -1) {
        options1.splice(index, 1, {
          term: { [optionName]: newOptions },
        });
      } else {
        const optionsResults = [
          ...options1,
          { term: { [optionName]: newOptions } },
        ];
        setOptions1(optionsResults);
      }
      setOptions(result);

      push({ pathname: pathname, query: { ...result } });
    } else {
      const newOptions = (options as any)?.[optionName]
        ? bitwiseXor(Number((options as any)?.[optionName]), e.target.value)
        : 0;

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
        checked={
          (options as any)?.[optionName]
            ? bitwiseAnd(
                Number((options as any)?.[optionName]),
                attribute.value || 0
              ) > 0
            : false
        }
        onChange={onCheckboxChange}
        value={attribute.value}
      >
        {attribute.name}
      </Checkbox>
    </p>
  );
};

export default FilterOption;
