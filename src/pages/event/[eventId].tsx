import Aos from "aos";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useEffect } from "react";
import { HomeMetaData } from "../../core/constants";
import { TimeInSeconds, TranslationFiles } from "../../core/core";
import { PathsType } from "../../core/types";
import { eventLinksServices } from "../../features/customers/services/event-links/event-links.services";
import { EventLinksDto } from "../../features/customers/services/event-links/models/event-links-dto";
import Home from "../../features/home/view/home.components";
import styles from "../../styles/Home.module.css";

interface EventLinksPageProps {
  eventLinksInfo: EventLinksDto;
}
const EventLinksPage: NextPage<EventLinksPageProps> = ({ eventLinksInfo }) => {
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
        <meta property="og:title" content={eventLinksInfo.title} />
        <meta property="og:description" content={eventLinksInfo.description} />
        <meta property="og:image" content={eventLinksInfo.imageUrl} />
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
      params: { eventId: "1" },
      locale: locale,
    });
  });
  return { paths: paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const eventLinksInfo = (
    await eventLinksServices.getForEvent({
      eventId: Number(params?.eventId),
    })
  ).result;

  return {
    props: {
      eventLinksInfo: eventLinksInfo,
    },
    revalidate: TimeInSeconds.DAY,
  };
};

export default EventLinksPage;
