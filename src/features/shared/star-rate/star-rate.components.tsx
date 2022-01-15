import { FunctionComponent } from "react";
import classes from "./style.module.css";

interface StarRateProps {
  size?: string;
  numberOfStars?: number;
  rate?: number;
  color?: string;
  backgroundColor?: string;
  display?: string;
}

const StarRate: FunctionComponent<StarRateProps> = (props) => {
  return (
    <div
      className={classes.rate}
      style={
        {
          "--display": props.display || "block",
          "--size": props.size || "20px",
          "--number-of-stars": props.numberOfStars || "1",
          "--value": props.rate || "0",
          "--color": props.color || "gold",
          "--background-color": props.backgroundColor || "#ccc",
        } as any
      }
    />
  );
};

export default StarRate;
