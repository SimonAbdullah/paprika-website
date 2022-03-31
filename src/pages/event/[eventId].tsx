import Aos from "aos";
import { GetServerSideProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useEffect } from "react";
import { HomeMetaData } from "../../core/constants";
import { PagesUrls, TranslationFiles } from "../../core/core";
import { eventLinksServices } from "../../features/customers/services/event-links/event-links.services";
import { EventLinksDto } from "../../features/customers/services/event-links/models/event-links-dto";
import { EventLinksParams } from "../../features/customers/services/event-links/models/event-links-params.models";
import Home from "../../features/home/view/home.components";
import styles from "../../styles/Home.module.css";

interface EventLinksPageProps {
  eventLinksInfo: EventLinksDto;
  urlParams: EventLinksParams;
}
const EventLinksPage: NextPage<EventLinksPageProps> = ({
  eventLinksInfo,
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
          content={`${process.env.NEXT_PUBLIC_BASE_CLIENT_URL}${PagesUrls.EVENT}/${urlParams.eventId}`}
        />
        <meta property="og:site_name" content={HomeMetaData.siteName} />
        <meta property="og:type" content="article" />
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const eventLinksInfo = (
    await eventLinksServices.getForEvent({
      eventId: Number(params?.eventId),
    })
  ).result;

  return {
    props: {
      eventLinksInfo: eventLinksInfo,
      urlParams: { eventId: params?.eventId },
    },
  };
};

export default EventLinksPage;
