import dynamic from "next/dynamic";
import { FunctionComponent } from "react";
import classes from "./style.module.css";
import HomeSecond from "./second/home-second.components";
import HomeFirst from "./first/home-first.components";

const HomeFourth = dynamic(() => import("./fourth/home-fourth.components"));
const HomeFifth = dynamic(() => import("./fifth/home-fifth.components"));
const HomeSixth = dynamic(() => import("./sixth/home-sixth.components"));
const HomeThird = dynamic(() => import("./third/home-third.components"));

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
