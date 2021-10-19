import { Row } from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../core/core";
import { getPagesCount } from "../../../core/functions";
import classes from "./style.module.css";

interface PagesNumberProps {
  itemsTotalCount: number;
  itemsPerPage: number;
  currentItemsCount?: number;
}

const PagesNumber: FunctionComponent<PagesNumberProps> = ({
  itemsPerPage,
  itemsTotalCount,
  currentItemsCount,
}) => {
  const { t } = useTranslation(TranslationFiles.COMMON);

  const pagesCount = getPagesCount(itemsTotalCount, itemsPerPage);

  const currentPage = Math.ceil((currentItemsCount || 0) / itemsPerPage);

  return (
    <Row align="middle">
      <Text className={classes.title}>{t("page")}: </Text>
      {Array.from({ length: pagesCount }).map((_, index) => (
        <Text
          key={index}
          style={{ color: currentPage === index + 1 ? "#B12116" : "#151515" }}
          className={classes.pageNumber}
        >
          {index + 1}
        </Text>
      ))}
    </Row>
  );
};

export default PagesNumber;
