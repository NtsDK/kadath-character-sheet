import { Button } from "antd";
import { observer } from "mobx-react-lite";

import { getExportManager } from "../IoC";

export const AboutPage = observer(() => {
  const exportManager = getExportManager()
  return (
    <div className="tw-px-8 tw-py-4 tw-w-full">
      TODO - About Page
      <h2 className="tw-my-4">Функции для технического специалиста</h2>
      <div className="tw-my-4">
        <Button
          type="primary"
          onClick={() => {
            exportManager.exportTempStorage();
          }}
        >
          Скачать листы персонажей из браузерного хранилища
        </Button>
      </div>
    </div>
  );
});
