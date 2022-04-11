import { AutoComplete, Button, Form, Input } from "antd";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../core/app/app.context";
import { PagesUrls, TranslationFiles } from "../../../../core/core";
import { SearchResultsRestaurants } from "../../../restaurants/services/restaurants/models/search-results-restaurants.models";
import { restaurantsServices } from "../../../restaurants/services/restaurants/restaurants.services";
import useDebounce from "../../../shared/hooks/debounce.hooks";
import classes from "./style.module.css";

const HomeFirstSearchBox = () => {
  const { direction } = useContext(AppContext);

  const { t } = useTranslation(TranslationFiles.HOME);

  const [form] = Form.useForm();

  const [restaurantName, setRestaurantName] = useState("");

  const [searchResultsForRestaurants, setSearchResultsForRestaurants] =
    useState<SearchResultsRestaurants[]>([]);

  const [options, setOptions] = useState<any>([]);

  const debouncedSearchTerm = useDebounce(restaurantName, 500);

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
        query: { fuzzy: { keywords: { value: value } } },
      });
      setSearchResultsForRestaurants(result.hits.hits);
    } catch (error) {
      console.error(error);
    }
  };

  const searchResults = () => {
    let option: any[] = [];
    searchResultsForRestaurants.map((item: SearchResultsRestaurants) => {
      option.push({
        value: item._source.name,
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{item._source.name}</span>
            <span>
              <Button
                type="ghost"
                onClick={() => {
                  push(`${PagesUrls.RESTAURANTS}/${item._source.name}`);
                }}
              >
                {t("first.show-restaurant")}
              </Button>
            </span>
          </div>
        ),
      });
    });
    return option;
  };

  useEffect(() => {
    if (searchResultsForRestaurants.length > 0) {
      setOptions(searchResults());
    } else {
      setOptions([
        {
          value: "restaurantIsNotAvailable",
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{t("first.The-restaurant-is-not-available")}</span>
            </div>
          ),
        },
      ]);
    }
  }, [searchResultsForRestaurants]);

  const handleSearch = (value: any) => {
    setRestaurantName(value);
  };

  const handleSubmit = () => {
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
                onSearch={handleSearch}
                options={options}
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
