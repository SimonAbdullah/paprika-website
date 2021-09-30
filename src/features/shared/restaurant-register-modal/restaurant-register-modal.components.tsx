import { Modal, ModalProps, Form, Input, FormInstance } from "antd";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { TranslationFiles } from "../../../core/core";

interface RestaurantRegisterModalProps extends ModalProps {
  form?: FormInstance;
}

const RestaurantRegisterModal: FunctionComponent<RestaurantRegisterModalProps> =
  ({ form, ...props }) => {
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
        >
          <Form.Item
            label={t("form.fields.name")}
            name="name"
            rules={[{ required: true }]}
            required
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("form.fields.phoneNumber")}
            name="phoneNumber"
            rules={[{ required: true }]}
            required
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

export default RestaurantRegisterModal;
