import { Image } from "antd";
import { Dispatch, FunctionComponent, Key, SetStateAction } from "react";
import { isDataEmpty } from "../../../core/functions";

interface ImagesPreviewProps {
  images?: Array<{ id?: Key; image?: string; title?: string } & Object>;
  visible?: boolean;
  setVisible?: Dispatch<SetStateAction<boolean>>;
  current?: number;
}

const ImagesPreview: FunctionComponent<ImagesPreviewProps> = ({
  images,
  visible,
  setVisible,
  current,
}) => {
  if (!visible || isDataEmpty(images)) return null;

  return (
    <div style={{ display: "none" }}>
      <Image.PreviewGroup
        preview={{
          visible: visible,
          onVisibleChange: (visible) => setVisible && setVisible(visible),
          current: current,
        }}
      >
        {images?.map((image) => (
          <Image key={image.id} src={image.image} alt={image.title} />
        ))}
      </Image.PreviewGroup>
    </div>
  );
};

export default ImagesPreview;
