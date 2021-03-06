import { Button } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import React, { ReactNode, useContext } from "react";
import Carousel, {
  CarouselProps,
  ResponsiveType,
  ArrowProps,
} from "react-multi-carousel";
import { AppContext } from "../../../core/app/app.context";
import { ListLeftArrow, ListRightArrow } from "../icons/icons.components";
import classes from "./style.module.css";

export interface CardListProps<T> {
  dataSource?: T[];
  renderItem?: (item: T, index: number) => ReactNode;
  itemKey?: (item: T, index: number) => any;
}

function CardList<T>({ dataSource, renderItem, itemKey }: CardListProps<T>) {
  const dataSourceInter = dataSource ?? [];
  const renderItemInter = renderItem ?? ((_item, _index) => null);
  const keyInter = itemKey ?? ((_item, index) => index);

  const { direction } = useContext(AppContext);

  const { md } = useBreakpoint();

  const NextArrow = (props: ArrowProps) => {
    return (
      <Button
        dir={direction}
        className={classes.rightArrowButton}
        type="link"
        size="large"
        icon={direction === "ltr" ? <ListRightArrow /> : <ListLeftArrow />}
        onClick={() => {
          props.onClick && props.onClick();
        }}
      />
    );
  };

  const PrevArrow = (props: ArrowProps) => {
    return (
      <Button
        dir={direction}
        className={classes.leftArrowButton}
        type="link"
        size="large"
        icon={direction === "ltr" ? <ListLeftArrow /> : <ListRightArrow />}
        onClick={() => {
          props.onClick && props.onClick();
        }}
      />
    );
  };

  const responsive: ResponsiveType = {
    largeDesktop: {
      breakpoint: {
        max: 4000,
        min: 1200,
      },
      items: 4,
    },
    desktop: {
      breakpoint: {
        max: 1200,
        min: 900,
      },
      items: 3,
    },
    tablet: {
      breakpoint: {
        max: 900,
        min: 678,
      },
      items: 2,
    },
    mobile: {
      breakpoint: {
        max: 678,
        min: 500,
      },
      items: 1.5,
    },
    smallMobile: {
      breakpoint: {
        max: 500,
        min: 0,
      },
      items: 1,
    },
  };

  const carouselProps: CarouselProps = {
    responsive: responsive,
    children: dataSourceInter.map((item, index) => (
      <div className={classes.itemContainer} key={keyInter(item, index)}>
        {renderItemInter(item, index)}
      </div>
    )),
    arrows: true,
    customRightArrow: direction === "ltr" ? <NextArrow /> : <PrevArrow />,
    customLeftArrow: direction === "ltr" ? <PrevArrow /> : <NextArrow />,
    ssr: true,
    keyBoardControl: true,
    draggable: !md,
    partialVisible: true,
    autoPlay: false,
    autoPlaySpeed: 5000,
    pauseOnHover: true,
  };

  return (
    <div dir="ltr">
      <Carousel containerClass={classes.carousel} {...carouselProps} />
    </div>
  );
}

export default CardList;
