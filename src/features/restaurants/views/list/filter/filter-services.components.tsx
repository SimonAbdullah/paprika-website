import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FunctionComponent, useContext } from "react";
import { TranslationFiles } from "../../../../../core/core";
import { RestaurantsListContext } from "../../../contexts/restaurants-list.contexts";
import classes from "./style.module.css";

interface FilterServicesProps {
  name: string;
  data: Array<string>;
}
const FilterServices: FunctionComponent<FilterServicesProps> = ({
  name,
  data,
}) => {
  const { push, pathname } = useRouter();

  const { t } = useTranslation(TranslationFiles.RESTAURANTS);

  const { options, setOptions } = useContext(RestaurantsListContext);

  const onCheckboxChange = (e: CheckboxChangeEvent, attributeName: string) => {
    if (e.target.checked) {
      let result = {};

      switch (attributeName) {
        case "HasReservation":
          result = {
            ...options,
            [attributeName]: true,
          };
          break;

        case "HasDelivery":
          result = { ...options, [attributeName]: true };
          break;

        case "HasPickup":
          result = { ...options, [attributeName]: true };
          break;

        default:
          break;
      }
      setOptions(result);

      push({ pathname: pathname, query: { ...result } });
    } else {
      const { [attributeName]: _, ...optionsWithoutOptionName } =
        options as any;

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
export default FilterServices;
