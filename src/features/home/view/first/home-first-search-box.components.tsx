import { AutoComplete, Button, Form, Input, Rate, Spin } from "antd";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../core/app/app.context";
import { PagesUrls, TranslationFiles } from "../../../../core/core";
import { SORT_IN_ELASTICSEARCH } from "../../../restaurants/constants/restaurants.constants";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (debouncedSearchTerm) {
      getRestaurants(restaurantName);
    }
  }, [debouncedSearchTerm, restaurantName]);

  const getRestaurants = async (value: any) => {
    setIsLoading(true);
    try {
      let result = await restaurantsServices.getAll({
        sort: [SORT_IN_ELASTICSEARCH.SORT],
        size: 5,
        query: { fuzzy: { keywords: { value: value } } },
      });
      setSearchResultsForRestaurants(result.hits.hits);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let option: any[] = [];
    searchResultsForRestaurants.forEach((item: SearchResultsRestaurants) => {
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
              <span style={{ margin: "0px 15px" }}>
                <Rate
                  disabled
                  style={{ fontSize: "18px" }}
                  value={item._source.rated_by}
                  allowHalf={true}
                />
              </span>
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
    setOptions(option);
  }, [searchResultsForRestaurants]);

  const handleSelect = (value: any) => {
    setRestaurantName(value);
  };
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
                onSelect={handleSelect}
                notFoundContent={isLoading ? <Spin size="small" /> : null}
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
