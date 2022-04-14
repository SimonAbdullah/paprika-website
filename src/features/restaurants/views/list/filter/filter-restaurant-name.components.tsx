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

  const { query } = useRouter();

  const [form] = Form.useForm();

  const { options1, setOptions1 } = useContext(RestaurantsListContext);

  useEffect(() => {
    if (query) setRestaurantName(query.RestaurantName as string);
  }, [query, form]);

  const handleSubmit = () => {
    console.log("handleSubmit", restaurantName);
    const index = options1.findIndex((emp) => emp.match?.keywords["query"]);
    if (index !== -1) {
      options1.splice(index, 1, {
        match: {
          keywords: {
            query: restaurantName,
            fuzziness: "AUTO",
          },
        },
      });
    } else {
      const optionsResults = [
        ...options1,
        {
          match: {
            keywords: {
              query: restaurantName,
              fuzziness: "AUTO",
            },
          },
        },
      ];
      setOptions1(optionsResults);
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

      <Form form={form} onSubmitCapture={handleSubmit}>
        <Form.Item style={{ display: "inline-block", width: "80%" }}>
          <Input
            className={
              direction === "ltr"
                ? classes.borderInputEn
                : classes.borderInputAr
            }
            placeholder={t("restaurantName")}
            value={restaurantName}
            onChange={(e) => {
              setRestaurantName(e.target.value);
            }}
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
