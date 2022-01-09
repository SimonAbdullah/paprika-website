import { Button, Modal, notification } from "antd";
import { useForm } from "antd/lib/form/Form";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent, useState } from "react";
import { TranslationFiles } from "../../../../core/core";
import { customerVisitorServices } from "../../../customers/services/customer-visitor/services/customer-visitor.services";
import { CreateVisitorContactInfoDto } from "../../../customers/services/customer-visitor/services/models/create-visitor-contact-info-dto.models";
import RestaurantRegisterModal from "../../restaurant-register-modal/restaurant-register-modal.components";
import classes from "./style.module.css";

interface HeaderRegisterRestaurantButtonProps {}

const HeaderRegisterRestaurantButton: FunctionComponent<
  HeaderRegisterRestaurantButtonProps
> = () => {
  const { t } = useTranslation(TranslationFiles.COMMON);

  const { sm } = useBreakpoint();

  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form] = useForm();

  return (
    <>
      <Button
        className={classes.registerButton}
        size={sm ? "large" : "middle"}
        type="ghost"
        onClick={() => setVisible(true)}
      >
        {t("registerYourRestaurant")}
      </Button>
      <RestaurantRegisterModal
        visible={visible}
        onCancel={() => {
          form.resetFields();
          setVisible(false);
        }}
        form={form}
        onFinish={async (values: CreateVisitorContactInfoDto) => {
          setLoading(true);
          await customerVisitorServices
            .create(values)
            .then(() => {
              Modal.success({
                title: t("yourRequestHasBeenSubmit"),
              });
              setLoading(false);
              form.resetFields();
              setVisible(false);
            })
            .catch((error) => {
              notification.error({
                message: error.response.data.error.message,
              });
              setLoading(false);
            });
        }}
        loading={loading}
      />
    </>
  );
};

export default HeaderRegisterRestaurantButton;
