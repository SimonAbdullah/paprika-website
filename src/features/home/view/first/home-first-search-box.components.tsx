import { AutoComplete, Button, Form, Input, Rate, Space, Spin } from "paprika-design";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Text from "antd/lib/typography/Text";
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

  const { sm, xs } = useBreakpoint();

  useEffect(() => {
    if (debouncedSearchTerm) {
      getRestaurants(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

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
          <Space direction="vertical" size={3} style={{ width: "100%" }}>
            <div
              style={{
                width: "100%",
              }}
            >
              <Text
                style={{
                  width: "60%",
                  display: "inline-flex",
                  fontSize: "1rem",
                }}
                ellipsis={{ tooltip: item._source.name }}
              >
                {item._source.name}
              </Text>

              <Text
                style={{
                  width: "40%",
                  display: "inline-flex",
                  textAlign: "end",
                }}
              >
                <Rate
                  disabled
                  style={{ fontSize: "1rem", width: "100%" }}
                  value={item._source.rated_by}
                  allowHalf={true}
                />
              </Text>
            </div>
            <Text
              style={{
                width: "100%",
                display: "inline-flex",
                fontSize: "0.8rem",
              }}
              ellipsis={{ tooltip: item._source.address }}
            >
              {item._source.address}
            </Text>
          </Space>
        ),
      });
    });
    setOptions(option);
  }, [searchResultsForRestaurants]);

  const handleSelect = (value: any) => {
    setRestaurantName(value);
    push(`${PagesUrls.RESTAURANTS}/${value}`);
  };
  const handleSearch = (value: any) => {
    setRestaurantName(value);
  };

  const handleSubmit = () => {
    if (restaurantName)
      push({
        pathname: `${PagesUrls.RESTAURANTS}`,
        query: { RestaurantName: restaurantName },
      });
    else {
      push({
        pathname: `${PagesUrls.RESTAURANTS}`,
      });
    }
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
                dropdownMatchSelectWidth={sm ? 300 : xs ? 325 : 300}
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
