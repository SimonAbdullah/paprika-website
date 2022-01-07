import { Col, Row } from "antd";
import { FunctionComponent } from "react";
import HeaderLogo from "../../header/start/header-logo.components";

interface FooterStartProps {}

const FooterStart: FunctionComponent<FooterStartProps> = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col>
        <HeaderLogo size="90px" image="/images/logo/paprika.png" />
      </Col>
    </Row>
  );
};

export default FooterStart;
