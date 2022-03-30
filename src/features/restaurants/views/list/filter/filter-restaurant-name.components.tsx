import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent, useState } from "react";
import { TranslationFiles } from "../../../../../core/core";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface FilterRestaurantNameProps {}

const FilterRestaurantName: FunctionComponent<
  FilterRestaurantNameProps
> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANTS);

  const [restaurantName, setRestaurantName] = useState("");

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
        {t("restaurantName")}
      </Text>
      <Input.Group compact>
        <Input
          placeholder={t("restaurantName")}
          style={{ width: "calc(100% - 20%)" }}
          defaultValue={restaurantName}
          onChange={(e) => {
            setRestaurantName(e.target.value);
          }}
        />
        <Button
          style={{ width: "20%" }}
          icon={<SearchOutlined style={{ color: "#ce4c42" }} />}
          onClick={() => console.log(restaurantName)}
        />
      </Input.Group>
    </>
  );
};
export default FilterRestaurantName;
