import { Button } from "antd";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return <div className={styles.container}>
    <Button type="primary" >Hello</Button>
  </div>;
};

export default Home;
