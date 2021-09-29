import { Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent, useState } from "react";
import { TranslationFiles } from "../../../../core/core";
import RestaurantRegisterModal from "../../restaurant-register-modal/restaurant-register-modal.components";
import classes from "./style.module.css";

interface HeaderRegisterRestaurantButtonProps {}

const HeaderRegisterRestaurantButton: FunctionComponent<HeaderRegisterRestaurantButtonProps> =
  () => {
    const { t } = useTranslation(TranslationFiles.COMMON);

    const { sm } = useBreakpoint();

    const [visible, setVisible] = useState(false);

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
        />
      </>
    );
  };

export default HeaderRegisterRestaurantButton;
