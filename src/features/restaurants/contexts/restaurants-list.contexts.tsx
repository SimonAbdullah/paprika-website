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

interface RestaurantsListContextProps {
  isGridView: boolean;
  setIsGridView: Dispatch<SetStateAction<boolean>>;
  options: PlacesGetAllParams;
  setOptions: Dispatch<SetStateAction<PlacesGetAllParams>>;
  options1: MustElasticSearchRestaurants[];
  setOptions1: Dispatch<SetStateAction<MustElasticSearchRestaurants[]>>;
}

export const RestaurantsListContext =
  createContext<RestaurantsListContextProps>({
    isGridView: true,
    setIsGridView: INIT_FUNCTION,
    setOptions: INIT_FUNCTION,
    options: {},
    setOptions1: INIT_FUNCTION,
    options1: [],
  });

interface RestaurantsListContextProviderProps {}

const RestaurantsListContextProvider: FunctionComponent<
  RestaurantsListContextProviderProps
> = (props) => {
  const { query } = useRouter();

  const [isGridView, setIsGridView] = useState(true);

  const [options, setOptions] = useState<PlacesGetAllParams>({});

  const [options1, setOptions1] = useState<MustElasticSearchRestaurants[]>([]);

  useEffect(() => {
    if (query) {
      const result: any = {
        ...query,
        ...(query.countryId ? { countryId: Number(query.countryId) } : {}),
        ...(query.cityId ? { cityId: Number(query.cityId) } : {}),
        ...(query.regionId ? { regionId: Number(query.regionId) } : {}),
      };

      setOptions(result);
    }
  }, [query]);

  return (
    <RestaurantsListContext.Provider
      value={{
        isGridView: isGridView,
        setIsGridView: setIsGridView,
        options: options,
        setOptions: setOptions,
        options1: options1,
        setOptions1: setOptions1,
      }}
    >
      {props.children}
    </RestaurantsListContext.Provider>
  );
};

export default RestaurantsListContextProvider;
