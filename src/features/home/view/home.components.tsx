import { FunctionComponent } from "react";
import HomeThird from "./third/home-third.components";
import classes from "./style.module.css";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className={classes.homeContainer}>
      <HomeThird />
    </div>
  );
};

export default Home;
