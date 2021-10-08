import { FunctionComponent, RefObject, useContext } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { TranslationFiles } from "../../../../core/core";
import classes from "./style.module.css";
import { AppContext } from "../../../../core/app/app.context";
import Carousel, { CarouselProps } from "react-multi-carousel";
import Title from "antd/lib/typography/Title";
import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

interface HomeFirstCarouselProps {
  carouselRef: RefObject<Carousel>;
}

const HomeFirstCarousel: FunctionComponent<HomeFirstCarouselProps> = ({
  carouselRef,
}) => {
  const { t } = useTranslation(TranslationFiles.HOME);

  const { md } = useBreakpoint();

  const { direction } = useContext(AppContext);

  const carouselProps: CarouselProps = {
    responsive: {
      bla: { breakpoint: { max: 5000, min: 0 }, items: 1 },
    },
    children: Array(8)
      .fill(null)
      .map((_, index) => (
        <Row
          key={index}
          align="middle"
          justify={md ? "start" : "center"}
          className={classes.carouselItem}
          dir={direction}
        >
          {md && (
            <Image
              src={`/images/home/first-dish-${index + 1}${
                direction === "rtl" ? "-reverse" : ""
              }.png`}
              alt={t("alt.dishImage")}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          )}
          <Col md={17} lg={13} xl={11} className={classes.content}>
            <Title className={classes.title}>{t("first.enjoyYourMeal")}</Title>
            <div className={classes.textContainer}>
              <Text className={classes.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor
                facilisi nibh venenatis pellentesque sapien. Et etiam et et
                pulvinar dignissim enim nec nulla.
              </Text>
            </div>
          </Col>
        </Row>
      )),
    arrows: false,
    ssr: true,
    infinite: true,
    keyBoardControl: true,
    draggable: false,
    swipeable: true,
    autoPlay: true,
    autoPlaySpeed: 5000,
    pauseOnHover: true,
  };
  return <Carousel ref={carouselRef} {...carouselProps} />;
};

export default HomeFirstCarousel;
