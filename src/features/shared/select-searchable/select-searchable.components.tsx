import { Select, SelectProps } from "antd";
import { FunctionComponent } from "react";

interface SelectSearchableProps extends SelectProps<any> {}

const SelectSearchable: FunctionComponent<SelectSearchableProps> = ({
  children,
  ...props
}) => {
  return (
    <Select
      showSearch
      filterOption={(input, option) => {
        return (
          option?.children?.toLowerCase()?.indexOf(input.toLowerCase()) >= 0
        );
      }}
      showArrow={false}
      style={{ width: "100%" }}
      {...props}
    >
      {children}
    </Select>
  );
};

export default SelectSearchable;
