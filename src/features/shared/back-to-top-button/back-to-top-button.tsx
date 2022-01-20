import { ToTopOutlined } from "@ant-design/icons";
import { BackTop } from "antd";
import { FunctionComponent, useContext } from "react";
import { AppContext } from "../../../core/app/app.context";

interface BackToTopButtonProps {}

const BackToTopButton: FunctionComponent<BackToTopButtonProps> = () => {
  const { direction } = useContext(AppContext);

  return (
    <BackTop
      duration={50}
      style={
        direction === "ltr"
          ? { right: "25px", bottom: "25px" }
          : { left: "25px", bottom: "25px" }
      }
    >
      <div
        style={{
          backgroundColor: "rgba(206, 76, 66, 0.9)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          borderRadius: "50%",
          height: "40px",
          width: "40px",
        }}
      >
        <ToTopOutlined
          style={{ margin: "0", padding: "0", fontSize: "1.2rem" }}
        />
      </div>
    </BackTop>
  );
};

export default BackToTopButton;
