import { FunctionComponent, RefObject, useContext } from "react";
import { Button, Space } from "antd";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { TranslationFiles } from "../../../../core/core";
import classes from "./style.module.css";
import { AppContext } from "../../../../core/app/app.context";
import Carousel from "react-multi-carousel";
import { LeftArrow, RightArrow } from "../../../shared/icons/icons.components";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

interface HomeFirstBackgroundProps {
  carouselRef: RefObject<Carousel>;
}

const HomeFirstBackground: FunctionComponent<HomeFirstBackgroundProps> = ({
  carouselRef,
}) => {
  const { t } = useTranslation(TranslationFiles.HOME);

  const { md } = useBreakpoint();

  const { direction } = useContext(AppContext);

  const NextArrow = () => {
    return (
      <Button
        dir={direction}
        className={classes.rightArrowButton}
        type="link"
        size="large"
        icon={direction === "ltr" ? <RightArrow /> : <LeftArrow />}
        onClick={() => {
          carouselRef.current?.next && carouselRef.current?.next(1);
        }}
      />
    );
  };

  const PrevArrow = () => {
    return (
      <Button
        dir={direction}
        className={classes.leftArrowButton}
        type="link"
        size="large"
        icon={direction === "ltr" ? <LeftArrow /> : <RightArrow />}
        onClick={() => {
          carouselRef.current?.previous && carouselRef.current?.previous(1);
        }}
      />
    );
  };

  return (
    <>
      <div
        className={classes.column}
        style={{
          inset: direction === "ltr" ? "0 0 auto auto" : "0 auto auto 0",
        }}
      >
        <div className={classes.buttons}>
          <Space size={md ? "large" : "small"}>
            <PrevArrow />
            <NextArrow />
          </Space>
        </div>
      </div>
      <Image
        src="/images/home/first-background.png"
        alt={t("alt.backgroundImage")}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    </>
  );
};

export default HomeFirstBackground;
