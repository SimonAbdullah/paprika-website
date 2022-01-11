import { Button, Col, Form, Input, Modal, notification, Row } from "antd";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent, useContext, useState } from "react";
import { TranslationFiles } from "../../../../core/core";
import classes from "./style.module.css";
import Image from "next/image";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { AppContext } from "../../../../core/app/app.context";
import { customerVisitorServices } from "../../../customers/services/customer-visitor/services/customer-visitor.services";
import { useForm } from "antd/lib/form/Form";

interface HomeFifthProps {}

const HomeFifth: FunctionComponent<HomeFifthProps> = () => {
  const { t } = useTranslation(TranslationFiles.HOME);

  const { t: tCommon } = useTranslation(TranslationFiles.COMMON);

  const { lg } = useBreakpoint();

  const { direction } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const [form] = useForm();

  return (
    <Row className={classes.fifthContainer} justify="center">
      <Col xs={24} lg={15} className={classes.contentContainer}>
        <Title level={3} className={classes.title}>
          {t("fifth.getYourGuests")}
        </Title>
        <Row justify={lg ? "start" : "center"}>
          <Col>
            <Row justify={lg ? "start" : "center"} gutter={16}>
              <Col>
                <Image
                  className={classes.chefWomanImage}
                  src="/images/home/fifth-open.svg"
                  alt={t("fifth.alt.openImage")}
                  width="80px"
                  height="80px"
                />
              </Col>
              <Col>
                <div className={classes.textContainer}>
                  <Text className={classes.text}>
                    {t("attractNewCustomersToYourRestaurant")}
                  </Text>
                </div>
                <div className={classes.textContainer}>
                  <Text className={classes.text}>
                    {t("fifth.partnerWithPaprikaToday")}
                  </Text>
                  <Text className={`${classes.text} ${classes.paprika}`}>
                    {t("paprika")}
                  </Text>
                  <Text className={classes.text}>
                    {t("fifth.todayItsEasyAndYouCanCancelAtAnyTime")}
                  </Text>
                </div>
              </Col>
            </Row>
            <Text className={classes.joinText}>
              {t("fifth.joinThePartner")}
              &nbsp; &nbsp;
              <div className={classes.guestContainer}>
                <div className={classes.red} />
                <div className={classes.black} />
                <Text className={classes.guest}>{t("fifth.guests")}</Text>
              </div>
              &nbsp; &nbsp;
              {t("fifth.toKnowYou")}
            </Text>
            <Form
              form={form}
              style={{ margin: "1.5rem 0" }}
              validateMessages={{
                required: tCommon("form.validation.required"),
              }}
              onFinish={async (values) => {
                setLoading(true);
                await customerVisitorServices
                  .create(values)
                  .then(() => {
                    Modal.success({
                      title: tCommon("yourRequestHasBeenSubmit"),
                    });
                    setLoading(false);
                    form.resetFields();
                  })
                  .catch((error) => {
                    notification.error({
                      message: error.response.data.error.message,
                    });
                    setLoading(false);
                  });
              }}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                  <Form.Item
                    name="name"
                    rules={[
                      { required: true },
                      { max: 128, message: tCommon("form.validation.range") },
                    ]}
                    required
                  >
                    <Input
                      placeholder={tCommon("form.fields.restaurantName")}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
                    name="emailOrPhoneNumber"
                    rules={[
                      { required: true },
                      { max: 128, message: tCommon("form.validation.range") },
                    ]}
                    required
                  >
                    <Input placeholder={tCommon("form.fields.phoneNumber")} />
                  </Form.Item>
                </Col>
                <Col span={24} style={{ textAlign: lg ? "end" : "center" }}>
                  <Form.Item>
                    <Button
                      size="large"
                      htmlType="submit"
                      type="primary"
                      loading={loading}
                    >
                      {tCommon("joinToPaprika")}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Col>
      <Col xs={24} lg={9} className={classes.chefWomanImageContainer}>
        <Image
          className={classes.chefWomanImage}
          src={`/images/home/fifth-group-picture${
            direction === "rtl" ? "-reverse" : ""
          }.png`}
          alt={t("fifth.alt.chefWomanImage")}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </Col>
    </Row>
  );
};

export default HomeFifth;
