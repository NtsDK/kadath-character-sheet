import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

import { CharSheet } from "../domain/CharSheet";

type Props = {
  charSheet: CharSheet;
};

export const CharacterLink = observer(({ charSheet }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className="tw-cursor-pointer tw-flex-1 tw-px-4 tw-py-2"
      onClick={() => {
        navigate("/charSheet/" + charSheet.id);
      }}
    >
      {charSheet.name}
    </div>
  );
});
