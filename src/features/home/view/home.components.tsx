import { FunctionComponent } from "react";
import HomeThird from "./third/home-third.components";
import classes from "./style.module.css";
import HomeFourth from "./fourth/home-fourth.components";
import HomeFifth from "./fifth/home-fifth.components";
import HomeSecond from "./second/home-second.components";
import HomeFirst from "./first/home-first.components";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className={classes.homeContainer}>
      <div data-sal="zoom-in" data-sal-duration="500" data-sal-delay="200">
        <HomeFirst />
      </div>
      <HomeSecond />
      <div data-sal="zoom-out" data-sal-duration="500">
        <HomeThird />
      </div>
      <div data-sal="slide-left" data-sal-duration="500">
        <HomeFourth />
      </div>
      <div data-sal="slide-right" data-sal-duration="500">
        <HomeFifth />
      </div>
    </div>
  );
};

export default Home;
