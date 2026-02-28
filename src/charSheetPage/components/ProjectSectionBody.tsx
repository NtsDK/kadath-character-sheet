import { observer } from "mobx-react-lite";
import { Input, Button, InputNumber } from "antd";
import { v4 as uuid } from "uuid";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";

import { EditProjectModal } from "../../pages/EditProjectModal";
import { getCharSheetEditorUiStore } from "../../IoC";

type Props = {
  className?: string;
};

export const ProjectSectionBody = observer(({ className }: Props) => {
  const charSheetEditorUiStore = getCharSheetEditorUiStore();
  const { projects } = charSheetEditorUiStore.charSheet;
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [editProjectIndex, setEditProjectIndex] = useState(0);

  return (
    <div className={className}>
      {projects.map((project, index) => (
        <div
          key={index}
          title={project.description}
          className="tw-flex tw-gap-2 tw-mb-1"
        >
          <div className="tw-flex-1">{project.name}</div>
          <div>
            <InputNumber
              value={project.progress}
              min={0}
              max={project.successThreshold}
              onChange={(value) =>
                charSheetEditorUiStore.setProjectProgress(index, value || 0)
              }
            />{" "}
            из {project.successThreshold}
          </div>
          <Button
            onClick={() => {
              setEditProjectIndex(index);
              setIsEditProjectModalOpen(true);
            }}
            icon={<EditOutlined className="tw-w-3" />}
          />
          <Button
            onClick={() => charSheetEditorUiStore.removeProject(index)}
            icon={<CloseOutlined className="tw-w-2" />}
          />
        </div>
      ))}
      <EditProjectModal
        key={editProjectIndex}
        title="Изменить замысел"
        isModalOpen={isEditProjectModalOpen}
        handleOk={(project) => {
          charSheetEditorUiStore.updateProject(editProjectIndex, project);
          setIsEditProjectModalOpen(false);
        }}
        defaultProject={projects[editProjectIndex]}
        handleCancel={() => setIsEditProjectModalOpen(false)}
      />
    </div>
  );
});
