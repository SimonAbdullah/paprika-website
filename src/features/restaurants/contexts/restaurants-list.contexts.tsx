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

interface RestaurantsListContextProps {
  isGridView: boolean;
  setIsGridView: Dispatch<SetStateAction<boolean>>;
  options: PlacesGetAllParams;
  setOptions: Dispatch<SetStateAction<PlacesGetAllParams>>;
}

export const RestaurantsListContext =
  createContext<RestaurantsListContextProps>({
    isGridView: true,
    setIsGridView: INIT_FUNCTION,
    setOptions: INIT_FUNCTION,
    options: {},
  });

interface RestaurantsListContextProviderProps {}

const RestaurantsListContextProvider: FunctionComponent<RestaurantsListContextProviderProps> =
  (props) => {
    const { query } = useRouter();

    const [isGridView, setIsGridView] = useState(true);

    const [options, setOptions] = useState<PlacesGetAllParams>({});

    useEffect(() => {
      if (query)
        setOptions({
          ...query,
          countryId: query.countryId ? Number(query.countryId) : undefined,
          cityId: query.cityId ? Number(query.cityId) : undefined,
          regionId: query.regionId ? Number(query.regionId) : undefined,
        });
    }, [query]);

    return (
      <RestaurantsListContext.Provider
        value={{
          isGridView: isGridView,
          setIsGridView: setIsGridView,
          options: options,
          setOptions: setOptions,
        }}
      >
        {props.children}
      </RestaurantsListContext.Provider>
    );
  };

export default RestaurantsListContextProvider;
