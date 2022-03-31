import Aos from "aos";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useEffect } from "react";
import { HomeMetaData } from "../../core/constants";
import { TimeInSeconds, TranslationFiles } from "../../core/core";
import { PathsType } from "../../core/types";
import { PostLinksDto } from "../../features/customers/services/post-links/models/post-links-dto";
import { postLinksServices } from "../../features/customers/services/post-links/post-links.services";
import Home from "../../features/home/view/home.components";
import styles from "../../styles/Home.module.css";

interface PostLinksPageProps {
  postLinksInfo: PostLinksDto;
}
const PostLinksPage: NextPage<PostLinksPageProps> = ({ postLinksInfo }) => {
  const { t } = useTranslation(TranslationFiles.HOME);

  useEffect(() => {
    Aos.init({ once: true, disable: "mobile" });
  }, []);

  return (
    <>
      <Head>
        <title>{t("paprika")}</title>
        <meta property="og:url" content={HomeMetaData.url} />
        <meta property="og:site_name" content={HomeMetaData.siteName} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={postLinksInfo.title} />
        <meta property="og:description" content={postLinksInfo.description} />
        <meta property="og:image" content={postLinksInfo.imageUrl} />
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

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: PathsType = [];

  locales?.forEach((locale) => {
    paths.push({
      params: { postId: "7" },
      locale: locale,
    });
  });
  return { paths: paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postLinksInfo = (
    await postLinksServices.getForPost({
      postId: Number(params?.postId),
    })
  ).result;

  return {
    props: {
      postLinksInfo: postLinksInfo,
    },
    revalidate: TimeInSeconds.DAY,
  };
};

export default PostLinksPage;
