import { AutoComplete, Button, Form, Input } from "antd";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../core/app/app.context";
import { PagesUrls, TranslationFiles } from "../../../../core/core";
import { restaurantsServices } from "../../../restaurants/services/restaurants/restaurants.services";
import useDebounce from "../../../shared/hooks/debounce.hooks";
import classes from "./style.module.css";

const HomeFirstSearchBox = () => {
  const { direction } = useContext(AppContext);

  const { t } = useTranslation(TranslationFiles.HOME);

  const [form] = Form.useForm();

  const [restaurantName, setRestaurantName] = useState("");

  const debouncedSearchTerm = useDebounce(restaurantName, 2000);

  const { push } = useRouter();

  useEffect(() => {
    if (debouncedSearchTerm) {
      getRestaurants(restaurantName);
    }
  }, [debouncedSearchTerm]);

  const getRestaurants = async (value: any) => {
    try {
      let result = await restaurantsServices.getAll({
        size: 5,
        query: { fuzzy: { keywords: { vlaue: value } } },
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (value: any) => {
    console.log("handleSearch", value);
    setRestaurantName(value);
  };

  const onSelect = (value: any) => {
    console.log("onSelect", value);
  };

  const handleSubmit = () => {
    console.log("handleSubmit", restaurantName);
    push({
      pathname: `${PagesUrls.RESTAURANTS}`,
      query: { RestaurantName: restaurantName },
    });
  };
  return (
    <>
      <div>
        <div
          className={
            direction === "ltr" ? classes.searchBoxLeft : classes.searchBoxRight
          }
        >
          <Form form={form} onSubmitCapture={handleSubmit}>
            <Form.Item className={classes.searchField} name="restaurantName">
              <AutoComplete
                dropdownMatchSelectWidth={252}
                onSelect={onSelect}
                onSearch={handleSearch}
              >
                <Input
                  className={
                    direction === "ltr"
                      ? classes.searchInputEn
                      : classes.searchInputAr
                  }
                  placeholder={t("first.placeholder-search")}
                />
              </AutoComplete>
            </Form.Item>
            <Button
              className={
                direction === "ltr"
                  ? classes.searchButtonEn
                  : classes.searchButtonAr
              }
              htmlType="submit"
              type="primary"
            >
              {t("first.search-button")}
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};
export default HomeFirstSearchBox;
