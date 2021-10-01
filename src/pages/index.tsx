import { Button } from "antd";
import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { TranslationFiles } from "../core/core";
import Home from "../features/home/view/home.components";
import styles from "../styles/Home.module.css";

const HomePage: NextPage = () => {
  const { t } = useTranslation(TranslationFiles.HOME);
  return (
    <>
      <Head>
        <title>{t("home")}</title>
      </Head>
      <div className={styles.container}>
        <Home />
      </div>
    </>
  );
};

export default HomePage;
