import { FunctionComponent, useContext } from "react";
import Text from "antd/lib/typography/Text";
import { Checkbox } from "antd";
import classes from "./style.module.css";
import useTranslation from "next-translate/useTranslation";
import { TranslationFiles } from "../../../../../core/core";
import { RestaurantsListContext } from "../../../contexts/restaurants-list.contexts";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useRouter } from "next/dist/client/router";

interface FilterBooleanProps {
  name: string;
  data: Array<string>;
}

const FilterBoolean: FunctionComponent<FilterBooleanProps> = ({
  name,
  data,
}) => {
  const { t } = useTranslation(TranslationFiles.RESTAURANTS);

  const { push, pathname } = useRouter();

  const { options, setOptions } = useContext(RestaurantsListContext);

  const { options1, setOptions1 } = useContext(RestaurantsListContext);

  const onCheckboxChange = (e: CheckboxChangeEvent, name: string) => {
    if (e.target.checked) {
      const result = { ...options, [name]: true };

      const optionsResults = [...options1, { term: { [name]: true } }];
      setOptions1(optionsResults);
      setOptions(result);

      push({ pathname: pathname, query: { ...result } });
    } else {
      const { [name]: _, ...optionsWithoutOptionName } = options as any;

      const result = { ...(optionsWithoutOptionName || {}) };

      setOptions(result);

      push({ pathname: pathname, query: { ...result } });
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
