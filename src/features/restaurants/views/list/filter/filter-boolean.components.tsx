import { FunctionComponent, useContext } from "react";
import Text from "antd/lib/typography/Text";
import { Checkbox } from "antd";
import classes from "./style.module.css";
import useTranslation from "next-translate/useTranslation";
import { TranslationFiles } from "../../../../../core/core";
import { RestaurantsListContext } from "../../../contexts/restaurants-list.contexts";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

interface FilterBooleanProps {
  name: string;
  data: Array<string>;
}

const FilterBoolean: FunctionComponent<FilterBooleanProps> = ({
  name,
  data,
}) => {
  const { t } = useTranslation(TranslationFiles.RESTAURANTS);

  const { options, setOptions } = useContext(RestaurantsListContext);

  const onCheckboxChange = (e: CheckboxChangeEvent, name: string) => {
    if (e.target.checked) {
      setOptions({ ...options, [name]: true });
    } else {
      const { [name]: _, ...optionsWithoutOptionName } = options as any;

      setOptions({ ...(optionsWithoutOptionName || {}) });
    }
  };

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
        {name}
      </Text>
      {data.map((attributeName) => (
        <p
          key={attributeName}
          style={{ marginBottom: "0.1em", display: "block" }}
        >
          <Checkbox
            style={{ width: "100%" }}
            className={classes.checkbox}
            checked={(options as any)?.[attributeName]}
            onChange={(e) => onCheckboxChange(e, attributeName)}
          >
            {t(attributeName)}
          </Checkbox>
        </p>
      ))}
    </>
  );
};

export default FilterBoolean;
