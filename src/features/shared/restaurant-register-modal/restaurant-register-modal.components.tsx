import { Modal, ModalProps, Form, Input, FormInstance } from "antd";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../core/core";
import { CreateVisitorContactInfoDto } from "../../customers/services/customer-visitor/services/models/create-visitor-contact-info-dto.models";

interface RestaurantRegisterModalProps extends ModalProps {
  form?: FormInstance;
  onFinish?: (values: CreateVisitorContactInfoDto) => void;
}

const RestaurantRegisterModal: FunctionComponent<RestaurantRegisterModalProps> =
  ({ form, onFinish, ...props }) => {
    const { t } = useTranslation(TranslationFiles.COMMON);

    return (
      <Modal
        keyboard
        okText={t("submit")}
        onOk={() => {
          form?.submit();
        }}
        cancelText={t("cancel")}
        {...props}
      >
        <Form
          form={form}
          layout="vertical"
          validateMessages={{ required: t("form.validation.required") }}
          onFinish={onFinish}
        >
          <Form.Item
            label={t("form.fields.restaurantName")}
            name="name"
            rules={[
              { required: true },
              { max: 128, message: t("form.validation.range") },
            ]}
            required
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("form.fields.phoneNumber")}
            name="emailOrPhoneNumber"
            rules={[
              { required: true },
              { max: 128, message: t("form.validation.range") },
            ]}
            required
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

export default RestaurantRegisterModal;
