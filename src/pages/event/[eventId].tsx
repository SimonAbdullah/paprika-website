import Aos from "aos";
import { GetServerSideProps, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { PagesUrls, TranslationFiles } from "../../core/core";
import { customerEventServices } from "../../features/customers/services/customer-event/customer-event.services";
import { CustomerEventDto } from "../../features/customers/services/customer-event/models/customer-event-dto.models";
import { eventLinksServices } from "../../features/customers/services/event-links/event-links.services";
import { EventLinksDto } from "../../features/customers/services/event-links/models/event-links-dto";
import { EventLinksParams } from "../../features/customers/services/event-links/models/event-links-params.models";
import Home from "../../features/home/view/home.components";
import HomeEventModal from "../../features/home/view/second/home-event-modal.components";
import PaprikaHead from "../../features/shared/head/paprika-head.components";
import styles from "../../styles/Home.module.css";

interface EventLinksPageProps {
  eventLinksInfo: EventLinksDto;
  urlParams: EventLinksParams;
  eventDetails: CustomerEventDto;
}
const EventLinksPage: NextPage<EventLinksPageProps> = ({
  eventLinksInfo,
  urlParams,
  eventDetails,
}) => {
  const { t } = useTranslation(TranslationFiles.HOME);

  const [openEventModal, setOpenEventModal] = useState(false);

  useEffect(() => {
    Aos.init({ once: true, disable: "mobile" });
  }, []);

  useEffect(() => {
    if(eventDetails)
      setOpenEventModal(true);
  },[eventDetails]);
  
  return (
    <>
      <PaprikaHead
        pageTitle={t("paprika")}
        ogUrl={`${process.env.NEXT_PUBLIC_BASE_CLIENT_URL}${PagesUrls.EVENT}/${urlParams.eventId}`}
        ogTitle={eventLinksInfo.title}
        ogDescription={eventLinksInfo.description}
        ogImage={eventLinksInfo.imageUrl}
      />
      <div className={styles.container}>
        <Home />
      </div>
      <HomeEventModal
        visible={openEventModal}
        setVisible={setOpenEventModal}
        event={eventDetails}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const eventLinksInfo = (
    await eventLinksServices.getForEvent({
      eventId: Number(params?.eventId),
    })
  ).result;

  const eventDetails = (
    await customerEventServices.getEvent({
      id: Number(params?.eventId),
    })
  ).result;

  return {
    props: {
      eventLinksInfo: eventLinksInfo,
      urlParams: { eventId: params?.eventId },
      eventDetails: eventDetails,
    },
  };
};

export default EventLinksPage;
