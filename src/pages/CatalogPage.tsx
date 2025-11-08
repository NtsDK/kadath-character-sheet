import { observer } from "mobx-react-lite";
import { catalogService } from "../appServices/CatalogService";
import { Button } from "antd";
import { PlusIcon } from "@heroicons/react/24/outline";
import { charSheetService } from "../appServices/CharSheetService";
import { useNavigate } from "react-router";

export const CatalogPage = observer(() => {
  const { _charSheets } = catalogService;
  const navigate = useNavigate();

  return (
    <div className="tw-px-8 tw-py-4 tw-w-full">
      <div className="tw-mb-4">
        <Button type="primary">
          <PlusIcon className="tw-h-4" /> Создать
        </Button>
      </div>
      <div>
        {_charSheets.map((el) => (
          <div
            className="tw-bg-gray-300 tw-mb-2 tw-px-4 tw-py-2 tw-flex"
            key={el.name}
          >
            <div
              className="tw-cursor-pointer tw-flex-1"
              onClick={() => {
                charSheetService.setCharSheet(el);
                navigate("/charSheet");
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
