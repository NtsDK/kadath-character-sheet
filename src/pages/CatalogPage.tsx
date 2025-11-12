import { observer } from "mobx-react-lite";
import { catalogPageUiStore } from "./CatalogPageUiStore";
import { Button } from "antd";
import { PlusIcon } from "@heroicons/react/24/outline";
import { charSheetEditorUiStore } from "../charSheetPage/CharSheetEditorUiStore";
import { useNavigate } from "react-router";

export const CatalogPage = observer(() => {
  const { charSheets } = catalogPageUiStore;
  const navigate = useNavigate();

  return (
    <div className="tw-px-8 tw-py-4 tw-w-full">
      <div className="tw-mb-4">
        <Button type="primary">
          <PlusIcon className="tw-h-4" /> Создать
        </Button>
      </div>
      <div>
        {charSheets.map((el) => (
          <div
            className="tw-bg-gray-300 tw-mb-2 tw-px-4 tw-py-2 tw-flex"
            key={el.name}
          >
            <div
              className="tw-cursor-pointer tw-flex-1"
              onClick={() => {
                // charSheetEditorUiStore.setId(el.id);
                // charSheetEditorUiStore.setCharSheet(el);
                navigate("/charSheet/" + el.id);
              }}
            >
              {el.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
