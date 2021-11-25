import { Badge, Row } from "antd";
import Text from "antd/lib/typography/Text";
import { FunctionComponent, useContext } from "react";
import { AppContext } from "../../../core/app/app.context";
import { reverseString } from "../../../core/functions";
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
  const { direction } = useContext(AppContext);

  return (
    <Row align="middle" className={classes.itemsCount}>
      <Badge
        className={classes.badge}
        count={direction === "ltr" ? count : reverseString(String(count))}
        style={{ background: backgroundColor }}
      />
      <Text className={classes.text}>{text}</Text>
    </Row>
  );
};

export default ItemsCount;
