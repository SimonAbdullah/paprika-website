import Aos from "aos";
import { GetServerSideProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { PagesUrls, TranslationFiles } from "../../core/core";
import { customerPostServices } from "../../features/customers/services/customer-post/customer-post.services";
import { CustomerPostDto } from "../../features/customers/services/customer-post/models/customer-post-dto.models";
import { PostLinksDto } from "../../features/customers/services/post-links/models/post-links-dto";
import { PostLinksParams } from "../../features/customers/services/post-links/models/post-links-params.models";
import { postLinksServices } from "../../features/customers/services/post-links/post-links.services";
import Home from "../../features/home/view/home.components";
import HomePostModal from "../../features/home/view/second/home-post-modal.components";
import PaprikaHead from "../../features/shared/head/paprika-head.components";
import styles from "../../styles/Home.module.css";

interface PostLinksPageProps {
  postLinksInfo: PostLinksDto;
  urlParams: PostLinksParams;
  postDetails: CustomerPostDto;
}
const PostLinksPage: NextPage<PostLinksPageProps> = ({
  postLinksInfo,
  urlParams,
  postDetails
}) => {
  const { t } = useTranslation(TranslationFiles.HOME);

  const [openPostModal, setOpenPostModal] = useState(false);

  useEffect(() => {
    Aos.init({ once: true, disable: "mobile" });
  }, []);

  useEffect(() => {
    if(postDetails)
      setOpenPostModal(true);
  },[postDetails]);
  
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
      <HomePostModal
        visible={openPostModal}
        setVisible={setOpenPostModal}
        post={postDetails}
      />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postLinksInfo = (
    await postLinksServices.getForPost({
      postId: Number(params?.postId),
    })
  ).result;

  const postDetails = (
    await customerPostServices.getPost({
      id: Number(params?.postId),
    })
  ).result;

  return {
    props: {
      postLinksInfo: postLinksInfo,
      urlParams: { postId: params?.postId },
      postDetails: postDetails,
    },
  };
};

export default PostLinksPage;
