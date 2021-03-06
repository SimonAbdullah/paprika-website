import {
  Card,
  Row,
  Form,
  Select,
  DatePicker,
  Input,
  Col,
  Button,
  notification,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent, useEffect, useState } from "react";
import { TranslationFiles } from "../../../../../core/core";
import {
  aesEncodeWithBase64AndKeyConcat,
  disabledDate,
} from "../../../../../core/functions";
import { CreateReservationForGuestDto } from "../../../../customers/services/customer-reservation/models/create-reservation-for-guest-dto.models";
import { RestaurantHomeDto } from "../../../../customers/services/customer-restaurant/models/restaurantHomeDto";
import { sendAndResendVerificationCode } from "../../../../guest/functions";
import ReservationVerificationCodeModal from "./reservation-verification-code-modal.components";
import classes from "./style.module.css";

interface RestaurantReservationBoxProps {
  restaurantDetails: RestaurantHomeDto;
}

const RestaurantReservationBox: FunctionComponent<
  RestaurantReservationBoxProps
> = ({restaurantDetails}) => {
  const { t } = useTranslation(TranslationFiles.RESTAURANT);

  const { t: tCommon } = useTranslation(TranslationFiles.COMMON);

  const [form] = useForm<CreateReservationForGuestDto>();

  const [createReservationData, setCreateReservationData] =
    useState<CreateReservationForGuestDto>();

  const [countDown, setCountDown] = useState(0);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return () => setCreateReservationData(undefined);
  }, []);

  return (
    <Card size="small">
      <Text className={classes.title}>{t("makeAReservation")}</Text>
      <Form<CreateReservationForGuestDto>
        layout="vertical"
        validateMessages={{ required: tCommon("form.validation.required") }}
        onFinish={(values) => {
          let key = createReservationData?.key;
          if (
            !key ||
            createReservationData?.phoneNumber !== values?.phoneNumber
          )
            key = aesEncodeWithBase64AndKeyConcat();

          if (values?.phoneNumber && key) {
            if (
              countDown === 0 ||
              createReservationData?.phoneNumber !== values?.phoneNumber
            ) {
              sendAndResendVerificationCode(values.phoneNumber, key).catch(
                (error) => {
                  notification.error({
                    message: error.response.data.error.message,
                  });
                }
              );
              setCountDown(Date.now() + 1000 * 60 * 5);
            }
            setCreateReservationData({ ...values, key: key });
            setVisible(true);
          }
        }}
        form={form}
      >
        <Row justify="center">
          <Col span={22}>
            <Form.Item
              name="personName"
              label={t("customerName")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={22}>
            <Form.Item
              name="phoneNumber"
              label={t("phoneNumber")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={22}>
            <Form.Item
              name="numberOfPeople"
              label={t("numberOfPeople")}
              rules={[{ required: true }]}
            >
              <Select>
                {Array.from({
                  length: restaurantDetails?.settings?.maxPeopleAllowed || 0,
                }).map((_, index) => (
                  <Select.Option key={index} value={index + 1}>
                    {index + 1}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={22}>
            <Form.Item
              name="dateAndTime"
              label={t("dateAndTime")}
              rules={[{ required: true }]}
            >
              <DatePicker
                showTime
                showSecond={false}
                minuteStep={15}
                use12Hours
                showNow={false}
                placeholder={t("selectDateAndTime")}
                disabledDate={disabledDate}
                className={classes.dateTimePicker}
                format="YYYY/MM/DD hh:mm a"
              />
            </Form.Item>
          </Col>
          <Col span={22}>
            <Form.Item name="customerAdditionalInfo" label={t("note")}>
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={22}>
            <Form.Item className={classes.submitButtonContainer}>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                className={classes.submitButton}
              >
                {tCommon("submit")}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {visible && (
        <ReservationVerificationCodeModal
          form={form}
          data={createReservationData}
          setData={setCreateReservationData}
          visible={visible}
          setVisible={setVisible}
          countDown={countDown}
          setCountDown={setCountDown}
        />
      )}
    </Card>
  );
};

export default RestaurantReservationBox;
