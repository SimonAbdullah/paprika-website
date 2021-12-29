import Title from "antd/lib/typography/Title";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../core/core";
import { isDataEmpty } from "../../../../core/functions";
import { useUpcomingEvents } from "../../../customers/hooks/customer-event.hooks";
import CardList from "../../../shared/card-list";
import HomeCardEvent from "./home-card-event.components";
import classes from "./style.module.css";

interface HomeSecondHostMusicRestaurantsProps {}

const HomeSecondRestaurantsHostEvents: FunctionComponent<HomeSecondHostMusicRestaurantsProps> =
  () => {
    const { t } = useTranslation(TranslationFiles.HOME);

    const { data } = useUpcomingEvents();

    if (isDataEmpty(data?.items)) return null;

    return (
      <>
        <Title level={3} className={classes.title}>
          {t("second.upComingEvents")}
        </Title>
        <CardList
          dataSource={data?.items}
          itemKey={(item) => item.id}
          renderItem={(item) => <HomeCardEvent key={item.id} event={item} />}
        />
      </>
    );
  };

export default HomeSecondRestaurantsHostEvents;
