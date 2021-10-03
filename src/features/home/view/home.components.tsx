import { FunctionComponent } from "react";
import HomeThird from "./third/home-third.components";
import classes from "./style.module.css";
import HomeFourth from "./fourth/home-fourth.components";
import HomeFifth from "./fifth/home-fifth.components";
import HomeSecond from "./second/home-second.components";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className={classes.homeContainer}>
      <HomeSecond />
      <HomeThird />
      <HomeFourth />
      <HomeFifth />
    </div>
  );
};

export default Home;
