import { Button } from "antd";
import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { TranslationFiles } from "../core/core";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { t } = useTranslation(TranslationFiles.HOME);
  return (
    <>
      <Head>
        <title>{t("home")}</title>
      </Head>
      <div className={styles.container}>
        <Button type="primary">Hello</Button>
      </div>
    </>
  );
};

export default Home;
