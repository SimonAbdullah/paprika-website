import { Button, Col, Row, Space } from "antd";
import { FunctionComponent, useContext } from "react";
import useTranslation from "next-translate/useTranslation";
import { TranslationFiles } from "../../../../../core/core";
import { useRouter } from "next/dist/client/router";
import FilterBoolean from "./filter-boolean.components";
import { otherData, servicesData } from "./data";
import FilterLocation from "./filter-location.components";
import FilterOptions from "./filter-options.components";
import FilterRestaurantName from "./filter-restaurant-name.components";
import { RestaurantsListContext } from "../../../contexts/restaurants-list.contexts";
import FilterServices from "./filter-services.components";

interface RestaurantsFilterProps {}

const RestaurantsFilter: FunctionComponent<RestaurantsFilterProps> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANTS);

  const { push, pathname } = useRouter();

  const { setElasticSearchOptions } = useContext(RestaurantsListContext);

  return (
    <aside style={{ backgroundColor: "#fff" }}>
      <Row
        justify="space-around"
        gutter={[0, 24]}
        style={{ padding: "1rem 0" }}
      >
        <Col span={20}>
          <FilterRestaurantName />
        </Col>
        <Col span={20}>
          <FilterServices name={t("services")} data={servicesData} />
        </Col>
        <Col span={20}>
          <FilterLocation />
        </Col>
        <Col span={20}>
          <FilterOptions optionName={"restaurantTypes"} />
        </Col>
        <Col span={20}>
          <FilterOptions optionName={"cuisineTypes"} />
        </Col>
        <Col span={20}>
          <FilterOptions optionName={"amenityTypes"} />
        </Col>
        <Col span={20}>
          <FilterOptions optionName={"ambianceTypes"} />
        </Col>
        <Col span={20}>
          <FilterOptions optionName={"musicTypes"} />
        </Col>
        <Col span={20}>
          <FilterOptions optionName={"parkingTypes"} />
        </Col>
        <Col span={20}>
          <FilterBoolean name={t("other")} data={otherData} />
        </Col>
        <Col span={20}>
          <Space>
            <Button
              onClick={() => {
                push(pathname);
                setElasticSearchOptions([]);
              }}
            >
              {t("reset")}
            </Button>
          </Space>
        </Col>
      </Row>
    </aside>
  );
};

export default RestaurantsFilter;
