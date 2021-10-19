import { Row, Space } from "antd";
import { FunctionComponent } from "react";
import classes from "./style.module.css";

interface RestaurantsFilterProps {}

const RestaurantsFilter: FunctionComponent<RestaurantsFilterProps> = () => {
  return (
    <aside className={classes.aside}>
      <Row justify="end">
        <Space size="large" direction="vertical"></Space>
      </Row>
    </aside>
  );
};

export default RestaurantsFilter;
