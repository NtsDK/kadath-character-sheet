import { observer } from "mobx-react-lite";
import { Modal } from "antd";

import { getImportModalUiStore } from "../IoC";

export const ImportModal = observer(() => {

  const importModalUiStore = getImportModalUiStore();

    return (
    <Modal
      title="Загрузка листов персонажей"
      open={importModalUiStore.isModalOpen}
      onCancel={() => importModalUiStore.setIsModalOpen(false)}
    >
      <div className="tw-max-h-80 tw-overflow-auto">
        body
      </div>
    </Modal>
  );
});
