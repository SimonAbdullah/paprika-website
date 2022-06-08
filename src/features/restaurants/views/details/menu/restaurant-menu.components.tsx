import { message, Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent, useContext } from "react";
import { AppContext } from "../../../../../core/app/app.context";
import { TranslationFiles } from "../../../../../core/core";
import { isDataEmpty } from "../../../../../core/functions";
import { useRestaurantCategories } from "../../../../customers/hooks/customer-menu.hooks";
import RestaurantCategoryMenu from "./restaurant-category-menu.components";
import classes from "./style.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRouter } from "next/router";
import { LinkOutlined } from "@ant-design/icons";
import { paprikaUrl } from "../../../../../core/constants";
import urlJoin from "url-join";

interface RestaurantMenuProps {}

const RestaurantMenu: FunctionComponent<RestaurantMenuProps> = () => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { t: tCommon } = useTranslation(TranslationFiles.COMMON);

  const { direction } = useContext(AppContext);

  const { data } = useRestaurantCategories();

  const { asPath } = useRouter();

  return (
    <>
      <Text className={classes.title} id="ourMenu">{t("ourMenu")}</Text>
      <CopyToClipboard 
        text={`${urlJoin(`${paprikaUrl.paprikaWebsiteUrl}`, asPath)}#ourMenu`} 
        onCopy={() => message.success(tCommon("linkCopied"))}
      >
        <LinkOutlined style={{margin: "0 1rem", fontSize: "1.2rem"}}/>
      </CopyToClipboard>
      { isDataEmpty(data) ? 
        (
          <>
            {" "}<Text>{t("notAvailable")}</Text>
          </>
        )
      :
        <Tabs
          className={classes.tab}
          direction={direction}
          defaultActiveKey={String(data?.[0].id)}
        >
          {data?.map((category) => {
            return (
              <Tabs.TabPane tab={category.name} key={String(category.id)}>
                <RestaurantCategoryMenu category={category} />
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      }
    </>
  );
};

export default RestaurantMenu;
