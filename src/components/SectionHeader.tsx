import { Button } from "antd";
import { observer } from "mobx-react-lite";

import { PlusIcon } from "@heroicons/react/24/outline";

type Props = {
  children?: React.ReactNode;
  buttonProps?: {
    onCreate: () => void;
    disabled?: boolean;
  };
};

export const SectionHeader = observer(({ children, buttonProps }: Props) => {
  return (
    <h2>
      {children}{" "}
      {
        buttonProps && (
          <Button onClick={buttonProps.onCreate} disabled={buttonProps.disabled}>
            <PlusIcon className="tw-h-5" />
          </Button>
        )
      }
    </h2>
  );
});
