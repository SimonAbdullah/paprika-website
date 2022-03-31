import Aos from "aos";
import { GetServerSideProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useEffect } from "react";
import { HomeMetaData } from "../../core/constants";
import { PagesUrls, TranslationFiles } from "../../core/core";
import { PostLinksDto } from "../../features/customers/services/post-links/models/post-links-dto";
import { PostLinksParams } from "../../features/customers/services/post-links/models/post-links-params.models";
import { postLinksServices } from "../../features/customers/services/post-links/post-links.services";
import Home from "../../features/home/view/home.components";
import styles from "../../styles/Home.module.css";

interface PostLinksPageProps {
  postLinksInfo: PostLinksDto;
  urlParams: PostLinksParams;
}
const PostLinksPage: NextPage<PostLinksPageProps> = ({
  postLinksInfo,
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
          content={`${process.env.NEXT_PUBLIC_BASE_CLIENT_URL}${PagesUrls.Post}/${urlParams.postId}`}
        />
        <meta property="og:site_name" content={HomeMetaData.siteName} />
        <meta property="og:type" content="article" />
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
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postLinksInfo = (
    await postLinksServices.getForPost({
      postId: Number(params?.postId),
    })
  ).result;

  return {
    props: {
      postLinksInfo: postLinksInfo,
      urlParams: { postId: params?.postId },
    },
  };
};

export default PostLinksPage;
