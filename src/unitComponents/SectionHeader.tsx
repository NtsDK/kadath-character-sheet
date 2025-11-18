import { Button } from "antd";
import { observer } from "mobx-react-lite";

import { PlusOutlined } from "@ant-design/icons";

type Props = {
  children?: React.ReactNode;
  buttonProps?: {
    onCreate: () => void;
    disabled?: boolean;
  };
};

export const SectionHeader = observer(({ children, buttonProps }: Props) => {
  return (
    <h2 className="tw-text-lg tw-mb-2">
      {children}{" "}
      {buttonProps && (
        <Button
          size="small"
          shape="circle"
          onClick={buttonProps.onCreate}
          disabled={buttonProps.disabled}
          icon={<PlusOutlined className="tw-h-3" />}
        />
      )}
    </h2>
  );
});
