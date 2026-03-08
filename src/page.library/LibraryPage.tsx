import { observer } from "mobx-react-lite";
import { Button } from "antd";

import { getLibraryPageStore } from "../IoC";

export const LibraryPage = observer(() => {
  const store = getLibraryPageStore();
  return (
    <div className="tw-px-8 tw-py-4 tw-w-full">
      <div className="tw-mb-6">
        <h2 className="tw-text-2xl tw-mb-4">По ту сторону Врат</h2>
        <div className="tw-mb-4">
          <Button
            type="primary"
            onClick={() => store.createAllBeyondTheGatesChars()}
          >
            Создать всех
          </Button>
        </div>
        <div className="tw-mb-4">
          {store.getBeyondTheGatesChars().map((el) => (
            <Button
              key={el.value}
              type="primary"
              onClick={() => store.createCharacter(el.value)}
              className="tw-mr-4 tw-mb-4"
            >
              {el.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="tw-mb-6">
        <h2 className="tw-text-2xl tw-mb-4">Другое</h2>
        <div className="tw-mb-4">
          {store.getOtherChars().map((el) => (
            <Button
              key={el.value}
              type="primary"
              onClick={() => store.createCharacter(el.value)}
              className="tw-mr-4 tw-mb-4"
            >
              {el.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
});
