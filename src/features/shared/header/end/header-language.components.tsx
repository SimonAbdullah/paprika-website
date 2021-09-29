import { Button, Dropdown } from "antd";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import { CaretDownFilled } from "@ant-design/icons";
import classes from "./style.module.css";
import { Menu } from "antd";
import { useRouter } from "next/dist/client/router";
import { LOCALS } from "../../../../core/app/app.constants";
import { TranslationFiles } from "../../../../core/core";

interface HeaderLanguageButtonProps {}

const HeaderLanguageButton: FunctionComponent<HeaderLanguageButtonProps> =
  () => {
    const { t } = useTranslation(TranslationFiles.COMMON);

    const { locale, pathname } = useRouter();

    const menu = (
      <Menu className={classes.localeList}>
        {Object.entries(LOCALS).map(([locale, value]) => (
          <Menu.Item key={value}>
            <Link href={{ pathname }} locale={locale} key={value}>
              <a>{t(value)}</a>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <Dropdown className={classes.languagesDropdown} overlay={menu}>
        <Button type="link" className={classes.languagesButton} size="large">
          {t(LOCALS[locale as string])}
          <CaretDownFilled className={classes.caretDownIcon} />
        </Button>
      </Dropdown>
    );
  };

export default HeaderLanguageButton;
