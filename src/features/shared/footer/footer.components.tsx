import { FunctionComponent } from "react";
import { Footer as Foot } from "antd/lib/layout/layout";
import classes from "./style.module.css";
import FooterStart from "./start/footer-start.components";
import { Col, Row } from "antd";
import FooterEnd from "./end/footer-end.components";
import FooterMiddle from "./middle/footer-middle.components";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  const { lg, xl } = useBreakpoint();

  return (
    <Foot
      className={classes.foot}
      style={
        xl
          ? { paddingInlineStart: "6rem" }
          : lg
          ? { paddingInlineStart: "3rem" }
          : {}
      }
    >
      <Row justify="space-between" gutter={[16, 16]}>
        <Col xs={24} md={12} lg={4}>
          <FooterStart />
        </Col>
        <Col xs={24} md={{ order: 2 }} lg={{ span: 12, order: 0 }}>
          <FooterMiddle />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <FooterEnd />
        </Col>
      </Row>
    </Foot>
  );
};

export default Footer;
