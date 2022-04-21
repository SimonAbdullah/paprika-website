import Aos from "aos";
import { GetServerSideProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";
import { PagesUrls, TranslationFiles } from "../../core/core";
import { PostLinksDto } from "../../features/customers/services/post-links/models/post-links-dto";
import { PostLinksParams } from "../../features/customers/services/post-links/models/post-links-params.models";
import { postLinksServices } from "../../features/customers/services/post-links/post-links.services";
import Home from "../../features/home/view/home.components";
import PaprikaHead from "../../features/shared/head/paprika-head.components";
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
      <PaprikaHead
        pageTitle={t("paprika")}
        ogUrl={`${process.env.NEXT_PUBLIC_BASE_CLIENT_URL}${PagesUrls.POST}/${urlParams.postId}`}
        ogTitle={postLinksInfo.title}
        ogDescription={postLinksInfo.description}
        ogImage={postLinksInfo.imageUrl}
      />
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
