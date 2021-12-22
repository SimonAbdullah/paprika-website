import {
  Card,
  Row,
  Form,
  Select,
  DatePicker,
  TimePicker,
  Input,
  Col,
  Button,
} from "antd";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../../../core/core";
import classes from "./style.module.css";

interface RestaurantReservationBoxProps {}

const RestaurantReservationBox: FunctionComponent<RestaurantReservationBoxProps> =
  () => {
    const { t } = useTranslation(TranslationFiles.RESTAURANT);

    const { t: tCommon } = useTranslation(TranslationFiles.COMMON);

    return (
      <Card>
        <Text className={classes.title}>{t("makeAReservation")}</Text>
        <Form
          layout="vertical"
          validateMessages={tCommon("form.validation.required")}
        >
          <Row justify="center" gutter={16}>
            <Col span={22}>
              <Form.Item
                name="numberOfPeople"
                label={t("numberOfPeople")}
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value={1}>2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                name="date"
                label={t("date")}
                rules={[{ required: true }]}
              >
                <DatePicker className={classes.dateTimePicker} />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                name="time"
                label={t("time")}
                rules={[{ required: true }]}
              >
                <TimePicker className={classes.dateTimePicker} />
              </Form.Item>
            </Col>
            <Col span={22}>
              <Form.Item name="note" label={t("note")}>
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
                  {t("reserve")}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  };

export default RestaurantReservationBox;
