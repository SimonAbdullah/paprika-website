import { FunctionComponent, useContext } from "react";
import { RestaurantsListContext } from "../../contexts/restaurants-list.contexts";
import RestaurantGridView from "./restaurants-grid-view.components";
import RestaurantListView from "./restaurants-list-view.components";

interface RestaurantListProps {}

const RestaurantList: FunctionComponent<RestaurantListProps> = () => {
  const { isGridView } = useContext(RestaurantsListContext);

  return isGridView ? <RestaurantGridView /> : <RestaurantListView />;
};

export default RestaurantList;
