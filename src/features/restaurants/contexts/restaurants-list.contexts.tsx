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
import { PlacesGetAllParams } from "../services/places/models/places-get-all-params.models";
import { MustElasticSearchRestaurants } from "../services/restaurants/models/bool-elastic-search-restaurants.models";
import RestaurantServies from "../services/restaurants/models/restaurant-servies.models";

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

      const optionsResult = Object.entries(query).map(([key, value]) => {
        if (key === "RestaurantName") {
          return {
            match: {
              keywords: {
                query: value,
                fuzziness: "AUTO",
              },
            },
          };
        }
        switch (key) {
          case "HasReservation":
            return {
              term: {
                services: RestaurantServies.Reservation,
              },
            };

          case "HasDelivery":
            return {
              term: {
                services: RestaurantServies.Delivery,
              },
            };

          case "HasPickup":
            return {
              term: {
                services: RestaurantServies.Pickup,
              },
            };

          default:
            break;
        }
        return { term: { [key]: value } };
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
