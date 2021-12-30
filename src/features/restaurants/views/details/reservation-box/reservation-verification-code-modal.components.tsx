import { ReloadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  notification,
  Space,
  Tooltip,
} from "antd";
import Countdown from "antd/lib/statistic/Countdown";
import Text from "antd/lib/typography/Text";
import useTranslation from "next-translate/useTranslation";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { TranslationFiles } from "../../../../../core/core";
import { useRestaurantDetails } from "../../../../customers/hooks/customer-restaurant.hooks";
import { CreateReservationForGuestDto } from "../../../../customers/services/customer-reservation/models/create-reservation-for-guest-dto.models";
import {
  createReservation,
  sendAndResendVerificationCode,
} from "../../../../guest/functions";
import classes from "./style.module.css";

interface ReservationVerificationCodeModalProps {
  data?: CreateReservationForGuestDto;
  setData: Dispatch<SetStateAction<CreateReservationForGuestDto | undefined>>;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  form: FormInstance<CreateReservationForGuestDto>;
  countDown: number;
  setCountDown: Dispatch<SetStateAction<number>>;
}

const ReservationVerificationCodeModal: FunctionComponent<ReservationVerificationCodeModalProps> =
  ({ data, setData, setVisible, visible, form, countDown, setCountDown }) => {
    const { t } = useTranslation(TranslationFiles.RESTAURANT);

    const { t: tCommon } = useTranslation(TranslationFiles.COMMON);

    const { data: restaurant } = useRestaurantDetails();

    const [resendEnabled, setResendEnabled] = useState(countDown === 0);

    return (
      <Modal visible={visible} onCancel={() => setVisible(false)} footer={null}>
        <Form
          layout="vertical"
          validateMessages={{ required: tCommon("form.validation.required") }}
          onFinish={(values) => {
            createReservation({
              ...data,
              ...values,
              restaurantId: restaurant?.id,
            })
              .then((result) => {
                Modal.success({
                  title: result.result.message,
                });
                setCountDown(0);
                setData(undefined);
                form.resetFields();
                setVisible(false);
              })
              .catch((error) => {
                notification.error({
                  message: error.response.data.error.message,
                });
              });
          }}
        >
          <Form.Item
            name="verficationCode"
            label={t("verificationCode")}
            rules={[{ required: true }]}
            extra={
              <>
                <Text className={classes.textInfo}>
                  <Space size="small">
                    {t("youWillGetTheCodeWithin5minutes")}
                    <Countdown
                      value={countDown}
                      format="(mm:ss)"
                      onFinish={() => {
                        setResendEnabled(true);
                        setCountDown(0);
                      }}
                    />
                  </Space>
                </Text>
              </>
            }
          >
            <Input
              suffix={
                <Tooltip title={t("resendVerificationCode")}>
                  <Button
                    disabled={!resendEnabled}
                    type="link"
                    icon={<ReloadOutlined />}
                    onClick={() => {
                      if (data?.phoneNumber && data?.key)
                        sendAndResendVerificationCode(
                          data.phoneNumber,
                          data.key
                        )
                          .then(() => {
                            notification.success({
                              message: t("resendVerificationCodeSuccessfully"),
                            });
                            setResendEnabled(false);
                            setCountDown(Date.now() + 1000 * 60 * 5);
                          })
                          .catch((error) => {
                            notification.error({
                              message: error.response.data.error.message,
                            });
                          });
                    }}
                  />
                </Tooltip>
              }
              placeholder={t("verificationCode")}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              {t("reserve")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

export default ReservationVerificationCodeModal;
