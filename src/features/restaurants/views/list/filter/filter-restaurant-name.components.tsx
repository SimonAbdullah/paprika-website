import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { TranslationFiles } from "../../../../../core/core";
import { Button, Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { AppContext } from "../../../../../core/app/app.context";
import classes from "./style.module.css";
import { RestaurantsListContext } from "../../../contexts/restaurants-list.contexts";

interface FilterRestaurantNameProps {}

const FilterRestaurantName: FunctionComponent<
  FilterRestaurantNameProps
> = () => {
  const { direction } = useContext(AppContext);

  const { t } = useTranslation(TranslationFiles.RESTAURANTS);

  const [restaurantName, setRestaurantName] = useState("");

  const { query, push, pathname } = useRouter();

  const [form] = Form.useForm();

  const { options, setOptions, elasticSearchOptions } = useContext(
    RestaurantsListContext
  );

  useEffect(() => {
    if (query) setRestaurantName(query.RestaurantName as string);
  }, [query, form]);

  const handleSubmit = (values: any) => {
    if (values.searchBox) {
      const index = elasticSearchOptions.findIndex(
        (emp) => emp.match?.keywords["query"]
      );
      if (index !== -1) {
        elasticSearchOptions.splice(index, 1, {
          match: {
            keywords: {
              query: restaurantName,
              fuzziness: "AUTO",
            },
          },
        });
      }

      setOptions({ ...options, RestaurantName: restaurantName });

      push({
        pathname: pathname,
        query: { ...options, RestaurantName: values.searchBox },
      });
    } else {
      const { RestaurantName: _, ...optionsWithoutRestaurantName } =
        options as any;

      const result = { ...(optionsWithoutRestaurantName || {}) };

      setOptions(result);

      push({
        pathname: pathname,
        query: { ...optionsWithoutRestaurantName },
      });
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
        {t("restaurantName")}
      </Text>

      <Form
        form={form}
        onFinish={handleSubmit}
        onValuesChange={(v) => setRestaurantName(v.searchBox)}
      >
        <Form.Item
          name="searchBox"
          style={{ display: "inline-block", width: "80%", margin: "0" }}
          getValueProps={(value) => value}
        >
          <Input
            className={
              direction === "ltr"
                ? classes.borderInputEn
                : classes.borderInputAr
            }
            placeholder={t("restaurantName")}
            value={restaurantName}
          />
        </Form.Item>
        <Button
          className={
            direction === "ltr"
              ? classes.borderButtonEn
              : classes.borderButtonAr
          }
          htmlType="submit"
          style={{ width: "20%" }}
          icon={<SearchOutlined style={{ color: "#ce4c42" }} />}
        />
      </Form>
    </>
  );
};
export default FilterRestaurantName;
