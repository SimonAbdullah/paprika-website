import Aos from "aos";
import { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import { PagesUrls } from "../../core/core";
import { eventLinksServices } from "../../features/customers/services/event-links/event-links.services";
import { EventLinksDto } from "../../features/customers/services/event-links/models/event-links-dto";
import { EventLinksParams } from "../../features/customers/services/event-links/models/event-links-params.models";
import Home from "../../features/home/view/home.components";
import PaprikaHead from "../../features/shared/head/paprika-head.components";
import styles from "../../styles/Home.module.css";

interface EventLinksPageProps {
  eventLinksInfo: EventLinksDto;
  urlParams: EventLinksParams;
}
const EventLinksPage: NextPage<EventLinksPageProps> = ({
  eventLinksInfo,
  urlParams,
}) => {
  useEffect(() => {
    Aos.init({ once: true, disable: "mobile" });
  }, []);

  return (
    <>
      <PaprikaHead
        ogUrl={`${process.env.NEXT_PUBLIC_BASE_CLIENT_URL}${PagesUrls.EVENT}/${urlParams.eventId}`}
        ogTitle={eventLinksInfo.title}
        ogDescription={eventLinksInfo.description}
        ogImage={eventLinksInfo.imageUrl}
      />
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
