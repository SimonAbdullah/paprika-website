import { Badge, Row } from "antd";
import Text from "antd/lib/typography/Text";
import { FunctionComponent } from "react";
import classes from "./style.module.css";

interface ItemsCountProps {
  count?: number;
  text?: string;
  backgroundColor?: string;
}

const ItemsCount: FunctionComponent<ItemsCountProps> = ({
  count,
  text,
  backgroundColor,
}) => {
  return (
    <Row align="middle" className={classes.itemsCount}>
      <Badge
        className={classes.badge}
        count={count}
        style={{ background: backgroundColor }}
      />
      <Text className={classes.text}>{text}</Text>
    </Row>
  );
};

export default ItemsCount;
