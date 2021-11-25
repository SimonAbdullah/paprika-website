import { FunctionComponent } from "react";
import RestaurantsHeaderBreadcrumb from "./restaurants-header-breadcrumb.components";
import RestaurantsHeaderFilter from "./restaurants-header-filter.components";

interface RestaurantsListHeaderProps {}

const RestaurantsListHeader: FunctionComponent<RestaurantsListHeaderProps> =
  () => {
    return (
      <>
        <div style={{ marginBottom: "1rem" }}>
          <RestaurantsHeaderBreadcrumb />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <RestaurantsHeaderFilter />
        </div>
      </>
    );
  };

export default RestaurantsListHeader;
