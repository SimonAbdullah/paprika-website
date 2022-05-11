import { Card, Col, Row, Avatar } from "antd";
import { FunctionComponent, useState } from "react";
import Image from "next/image";
import classes from "./style.module.css";
import { PagesUrls } from "../../../../core/core";
import Text from "antd/lib/typography/Text";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { CustomerEventDto } from "../../../customers/services/customer-event/models/customer-event-dto.models";
import moment from "moment";
import HomeEventModal from "./home-event-modal.components";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

interface HomeCardEventProps {
  event?: CustomerEventDto;
}

const HomeCardEvent: FunctionComponent<HomeCardEventProps> = ({ event }) => {
  const { sm } = useBreakpoint();

  const { locale } = useRouter();

  const [visible, setVisible] = useState(false);

  return (
    <>
      <Card
        hoverable
        className={classes.eventCard}
        cover={
          <div className={classes.eventCoverContainer}>
            <Image
              className={classes.eventImage}
              src={event?.image || "/images/home/fallback-image.png"}
              alt={event?.name}
              layout="fill"
              priority={true}
              objectFit="cover"
              objectPosition="center"
              onClick={() => setVisible(true)}
              {...(event?.thumbnailImage
                ? { blurDataURL: event?.thumbnailImage, placeholder: "blur" }
                : {})}
            />
            <div className={classes.eventContent}>
              <Row>
                <Col span={24}>
                  <Text
                    className={classes.eventCardTitle}
                    ellipsis={{
                      tooltip: event?.name,
                    }}
                    onClick={() => setVisible(true)}
                  >
                    {event?.name}
                  </Text>
                  <Text
                    className={classes.eventTime}
                    onClick={() => setVisible(true)}
                  >
                    {moment(event?.time).format("YYYY/MM/DD hh:mm a")}
                  </Text>
                </Col>
                {sm && (
                  <div className={classes.eventRestaurantAvatarContainer}>
                    <Link
                      href={`${PagesUrls.RESTAURANTS}/${event?.restaurantName}`}
                      locale={locale}
                    >
                      <a>
                        <Avatar
                          src={event?.restaurantImage}
                          alt={event?.restaurantName}
                          shape="circle"
                          size="large"
                          style={{ width: "36px", height: "36px" }}
                        />
                      </a>
                    </Link>
                  </div>
                )}
              </Row>
            </div>
          </div>
        }
        bodyStyle={{ display: "none" }}
      />
      {visible && (
        <HomeEventModal
          visible={visible}
          setVisible={setVisible}
          event={event}
        />
      )}
    </>
  );
};

export default HomeCardEvent;
