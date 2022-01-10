import { FunctionComponent } from "react";
import HomeThird from "./third/home-third.components";
import classes from "./style.module.css";
import HomeFourth from "./fourth/home-fourth.components";
import HomeFifth from "./fifth/home-fifth.components";
import HomeSecond from "./second/home-second.components";
import HomeFirst from "./first/home-first.components";
import HomeSixth from "./sixth/home-sixth.components";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className={classes.homeContainer}>
      <div data-aos="zoom-in" data-aos-duration="500" data-aos-delay="200">
        <HomeFirst />
      </div>
      <HomeSecond />
      <HomeThird />
      <HomeFourth />
      <div data-aos="fade-up" data-aos-duration="500">
        <HomeFifth />
      </div>
      <div data-aos="fade-down" data-aos-duration="500">
        <HomeSixth />
      </div>
    </div>
  );
};

export default Home;
