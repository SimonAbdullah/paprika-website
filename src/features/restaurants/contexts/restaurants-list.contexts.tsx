import { useRouter } from "next/dist/client/router";
import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { INIT_FUNCTION } from "../../../core/app/app.constants";
import { arrayDecimalsForBinaryNumber } from "../../../core/functions";
import { PlacesGetAllParams } from "../services/places/models/places-get-all-params.models";
import { MustElasticSearchRestaurants } from "../services/restaurants/models/bool-elastic-search-restaurants.models";
import RestaurantServies from "../services/restaurants/models/restaurant-servies.models";
import { otherData } from "../views/list/filter/data";

interface RestaurantsListContextProps {
  isGridView: boolean;
  setIsGridView: Dispatch<SetStateAction<boolean>>;
  options: PlacesGetAllParams;
  setOptions: Dispatch<SetStateAction<PlacesGetAllParams>>;
  elasticSearchOptions: MustElasticSearchRestaurants[];
  setElasticSearchOptions: Dispatch<
    SetStateAction<MustElasticSearchRestaurants[]>
  >;
}

export const RestaurantsListContext =
  createContext<RestaurantsListContextProps>({
    isGridView: true,
    setIsGridView: INIT_FUNCTION,
    setOptions: INIT_FUNCTION,
    options: {},
    setElasticSearchOptions: INIT_FUNCTION,
    elasticSearchOptions: [],
  });

interface RestaurantsListContextProviderProps {}

const RestaurantsListContextProvider: FunctionComponent<
  RestaurantsListContextProviderProps
> = (props) => {
  const { query } = useRouter();

  const [isGridView, setIsGridView] = useState(true);

  const [options, setOptions] = useState<PlacesGetAllParams>({});

  const [elasticSearchOptions, setElasticSearchOptions] = useState<
    MustElasticSearchRestaurants[]
  >([]);

  useEffect(() => {
    if (query) {
      const result: any = {
        ...query,
        ...(query.countryId ? { countryId: Number(query.countryId) } : {}),
        ...(query.cityId ? { cityId: Number(query.cityId) } : {}),
        ...(query.regionId ? { regionId: Number(query.regionId) } : {}),
      };
      setOptions(result);

      let optionsResult: any[] = [];
      Object.entries(query).map(([key, value]) => {
        if (key === "RestaurantName") {
          const restaurantName = {
            match: {
              keywords: {
                query: value,
                fuzziness: "AUTO",
              },
            },
          };
          optionsResult.push(restaurantName);
          return;
        }
        switch (key) {
          case "HasReservation":
            const hasReservation = {
              term: {
                services: RestaurantServies.Reservation,
              },
            };
            optionsResult.push(hasReservation);
            return;

          case "HasDelivery":
            const hasDelivery = {
              term: {
                services: RestaurantServies.Delivery,
              },
            };
            optionsResult.push(hasDelivery);
            return;

          case "HasPickup":
            const hasPickup = {
              term: {
                services: RestaurantServies.Pickup,
              },
            };
            optionsResult.push(hasPickup);
            return;

          default:
            break;
        }
        if (!otherData.find((item) => item === key)) {
          const typesArray = arrayDecimalsForBinaryNumber(
            (Number(value) >>> 0).toString(2)
          );
          typesArray.forEach((item) => {
            const itemType = {
              terms: {
                [key]: [item],
              },
            };
            optionsResult.push(itemType);
          });
          return;
        }
        optionsResult.push({ term: { [key]: value } });
        return;
      });
      setElasticSearchOptions(optionsResult);
    }
  }, [query]);

  return (
    <RestaurantsListContext.Provider
      value={{
        isGridView: isGridView,
        setIsGridView: setIsGridView,
        options: options,
        setOptions: setOptions,
        elasticSearchOptions: elasticSearchOptions,
        setElasticSearchOptions: setElasticSearchOptions,
      }}
    >
      {props.children}
    </RestaurantsListContext.Provider>
  );
};

export default RestaurantsListContextProvider;
