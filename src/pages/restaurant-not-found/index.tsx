import { Button, Card, Col, Rate, Row, Spin } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { PagesUrls, TranslationFiles } from "../../core/core";
import { SORT_IN_ELASTICSEARCH } from "../../features/restaurants/constants/restaurants.constants";
import { SearchResultsRestaurants } from "../../features/restaurants/services/restaurants/models/search-results-restaurants.models";
import { restaurantsServices } from "../../features/restaurants/services/restaurants/restaurants.services";
import classes from "../../styles/RestaurantNotFound.module.css";

interface RestaurantNotFoundProps {}

const RestaurantNotFoundPage: FunctionComponent<
  RestaurantNotFoundProps
> = () => {
  const { t: tCommon } = useTranslation(TranslationFiles.COMMON);

  const { query, locale, push } = useRouter();

  const [searchResultsForRestaurants, setSearchResultsForRestaurants] =
    useState<SearchResultsRestaurants[]>([]);

  const [isRestaurantsLoading, setIsRestaurantsLoading] = useState(false);

  const [seeMoreRestaurants, setSeeMoreRestaurants] = useState(false);

  const [isSeeMoreRestaurantsLoading, setIsSeeMoreRestaurantsLoading] =
    useState(false);

  useEffect(() => {
    (async () => {
      setIsRestaurantsLoading(true);
      try {
        let result = await restaurantsServices.getAll({
          sort: [SORT_IN_ELASTICSEARCH.SORT],
          query: {
            bool: {
              must: [
                {
                  match: {
                    keywords: {
                      query: `${query?.restaurantName}`,
                      fuzziness: "AUTO",
                    },
                  },
                },
              ],
            },
          },
        });
        if (result.hits.hits?.length > 5) {
          setSeeMoreRestaurants(true);
        }
        setSearchResultsForRestaurants(result.hits.hits.slice(0, 5));
      } catch (error) {
        console.error(error);
      } finally {
        setIsRestaurantsLoading(false);
      }
    })();
  }, [query?.restaurantName]);

  return (
    <>
      <Head>
        <title>{`${query?.restaurantName} | ${tCommon("paprika")}`}</title>
      </Head>
      <Spin spinning={isRestaurantsLoading}>
        <div className={classes.firstContainer}>
          <Row justify="center">
            <Col xs={24} className={classes.imageContainer}>
              <Image
                src="/images/restaurant/search-rafiki.svg"
                width={300}
                height={300}
              />
            </Col>
            <Row style={{ width: "75%" }} justify="center">
              <Col xs={24}>
                <Title level={3} className={classes.titleText}>
                  {tCommon("restaurantNotFound")}
                  {searchResultsForRestaurants &&
                  searchResultsForRestaurants?.length !== 0
                    ? ` ${tCommon("doYouMean")}`
                    : ""}
                </Title>
              </Col>
              {searchResultsForRestaurants.map((item) => (
                <>
                  <Col xs={24} md={12} lg={8} xl={8} className={classes.column}>
                    <Link
                      href={`${PagesUrls.RESTAURANTS}/${item._source.name}`}
                      locale={locale}
                    >
                      <a style={{ display: "block", position: "relative" }}>
                        <Card
                          hoverable
                          className={classes.cardContainer}
                          bodyStyle={{ padding: "10px" }}
                        >
                          <Row gutter={12}>
                            <Col xs={7}>
                              <Image
                                className={classes.restaurantImage}
                                src={
                                  item._source.logoimage ||
                                  "/images/home/fallback-image.png"
                                }
                                alt={item._source.name}
                                width="100%"
                                height="100%"
                              />
                            </Col>
                            <Col xs={17}>
                              <div className={classes.textContainer}>
                                <Text
                                  className={classes.name}
                                  ellipsis={{ tooltip: item._source.name }}
                                >
                                  {item._source.name}
                                </Text>
                              </div>
                              <div className={classes.textContainer}>
                                <Text>
                                  <Rate
                                    disabled
                                    style={{ fontSize: "1rem", width: "100%" }}
                                    value={item._source.rated_by}
                                    allowHalf={true}
                                  />
                                </Text>
                              </div>
                              <div className={classes.textContainer}>
                                <Text
                                  className={classes.address}
                                  ellipsis={{ tooltip: item._source.address }}
                                >
                                  {item._source.address}
                                </Text>
                              </div>
                            </Col>
                          </Row>
                        </Card>
                      </a>
                    </Link>
                  </Col>
                </>
              ))}
              <Col xs={24}>
                <div className={classes.seeMore}>
                  {seeMoreRestaurants && (
                    <>
                      <Button
                        size="large"
                        type="primary"
                        loading={isSeeMoreRestaurantsLoading}
                        onClick={() => {
                          push({
                            pathname: `${PagesUrls.RESTAURANTS}`,
                            query: { RestaurantName: query?.restaurantName },
                          });
                          setIsSeeMoreRestaurantsLoading(true);
                        }}
                      >
                        {tCommon("seeMore")}
                      </Button>
                    </>
                  )}
                </div>
              </Col>
            </Row>
          </Row>
        </div>
      </Spin>
    </>
  );
};

export default RestaurantNotFoundPage;
