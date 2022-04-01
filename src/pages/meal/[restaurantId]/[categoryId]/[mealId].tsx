import Aos from "aos";
import { GetServerSideProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useEffect } from "react";
import { HomeMetaData } from "../../../../core/constants";
import { PagesUrls, TranslationFiles } from "../../../../core/core";
import { mealLinksServices } from "../../../../features/customers/services/meal-links/meal-links.services";
import { MealLinksDto } from "../../../../features/customers/services/meal-links/models/meal-links-dto";
import Home from "../../../../features/home/view/home.components";
import styles from "../../../../styles/Home.module.css";

interface urlParamsDto {
  restaurantId: number;
  categoryId: number;
  mealId: number;
}

interface MealLinksPageProps {
  mealLinksInfo: MealLinksDto;
  urlParams: urlParamsDto;
}
const MealLinksPage: NextPage<MealLinksPageProps> = ({
  mealLinksInfo,
  urlParams,
}) => {
  const { t } = useTranslation(TranslationFiles.HOME);

  useEffect(() => {
    Aos.init({ once: true, disable: "mobile" });
  }, []);

  return (
    <>
      <Head>
        <title>{t("paprika")}</title>
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_BASE_CLIENT_URL}${PagesUrls.MEAL}/${urlParams.restaurantId}/${urlParams.categoryId}/${urlParams.mealId}`}
        />
        <meta property="og:site_name" content={HomeMetaData.siteName} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={mealLinksInfo.title} />
        <meta property="og:description" content={mealLinksInfo.description} />
        <meta property="og:image" content={mealLinksInfo.imageUrl} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content={HomeMetaData.imageWidth} />
        <meta property="og:image:height" content={HomeMetaData.imageHeight} />
      </Head>
      <div className={styles.container}>
        <Home />
      </div>
      ;
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const mealLinksInfo = (
    await mealLinksServices.getForMeal({
      mealId: Number(params?.mealId),
    })
  ).result;

  return {
    props: {
      mealLinksInfo: mealLinksInfo,
      urlParams: {
        restaurantId: params?.restaurantId,
        categoryId: params?.categoryId,
        mealId: params?.mealId,
      },
    },
  };
};

export default MealLinksPage;
