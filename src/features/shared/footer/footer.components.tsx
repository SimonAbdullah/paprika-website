import { FunctionComponent, useContext } from "react";
import { Footer as Foot } from "antd/lib/layout/layout";
import classes from "./style.module.css";
import FooterStart from "./start/footer-start.components";
import { Col, Row } from "antd";
import FooterEnd from "./end/footer-end.components";
import FooterMiddle from "./middle/footer-middle.components";
import { AppContext } from "../../../core/app/app.context";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  const { direction } = useContext(AppContext);

  const { lg, xl } = useBreakpoint();

  return (
    <Foot
      className={classes.foot}
      style={direction === "rtl" && lg ? { paddingInlineStart: "8rem" } : {}}
    >
      <Row justify={xl ? "center" : "space-between"} gutter={[16, 16]}>
        <Col xs={24} md={12} lg={4}>
          <FooterStart />
        </Col>
        <Col xs={24} md={12} lg={10} xl={8}>
          <FooterMiddle />
        </Col>
        <Col xs={24} md={24} lg={10} xl={8}>
          <FooterEnd />
        </Col>
      </Row>
    </Foot>
  );
};

export default Footer;
