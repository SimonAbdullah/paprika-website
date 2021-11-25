import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import { INIT_FUNCTION } from "../../../core/app/app.constants";

interface RestaurantsListContextProps {
  isGridView: boolean;
  setIsGridView: Dispatch<SetStateAction<boolean>>;
}

export const RestaurantsListContext =
  createContext<RestaurantsListContextProps>({
    isGridView: true,
    setIsGridView: INIT_FUNCTION,
  });

interface RestaurantsListContextProviderProps {}

const RestaurantsListContextProvider: FunctionComponent<RestaurantsListContextProviderProps> =
  (props) => {
    const [isGridView, setIsGridView] = useState(true);
    return (
      <RestaurantsListContext.Provider
        value={{
          isGridView: isGridView,
          setIsGridView: setIsGridView,
        }}
      >
        {props.children}
      </RestaurantsListContext.Provider>
    );
  };

export default RestaurantsListContextProvider;
