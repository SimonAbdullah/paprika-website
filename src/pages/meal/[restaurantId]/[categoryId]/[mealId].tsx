import Aos from "aos";
import { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import { PagesUrls } from "../../../../core/core";
import { mealLinksServices } from "../../../../features/customers/services/meal-links/meal-links.services";
import { MealLinksDto } from "../../../../features/customers/services/meal-links/models/meal-links-dto";
import Home from "../../../../features/home/view/home.components";
import PaprikaHead from "../../../../features/shared/head/paprika-head.components";
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
  useEffect(() => {
    Aos.init({ once: true, disable: "mobile" });
  }, []);

  return (
    <>
      <PaprikaHead
        ogUrl={`${process.env.NEXT_PUBLIC_BASE_CLIENT_URL}${PagesUrls.MEAL}/${urlParams.restaurantId}/${urlParams.categoryId}/${urlParams.mealId}`}
        ogTitle={mealLinksInfo.title}
        isHome={false}
        ogDescription={mealLinksInfo.description}
        ogImage={mealLinksInfo.imageUrl}
      />
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
