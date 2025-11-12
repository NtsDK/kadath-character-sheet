import { observer } from "mobx-react-lite";
import { Col, Form, Input, Row } from "antd";
import { Segmented } from "antd";

import { charSheetEditorUiStore } from "./CharSheetEditorUiStore";

import { SectionHeader } from "../unitComponents/SectionHeader";
import { PowerSectionBody } from "./components/PowerSectionBody";
import { DreamlandPowerSectionBody } from "./components/DreamlandPowerSectionBody";
import { RecollectionSectionBody } from "./components/RecollectionSectionBody";
import { MentalConditionSectionBody } from "./components/MentalConditionSectionBody";
import { BodyWoundSectionBody } from "./components/BodyWoundSectionBody";
import { TemporalConditionSectionBody } from "./components/TemporalConditionSectionBody";
import { ItemSectionBody } from "./components/ItemSectionBody";
import { useParams } from "react-router";
import { useEffect } from "react";

export const CharSheetEditor = observer(() => {
  const params = useParams();

  useEffect(() => {
    if (params.charSheetId) {
      charSheetEditorUiStore.setId(params.charSheetId);
    }
  }, [params.charSheetId]);

  if (!charSheetEditorUiStore.charSheetExists) {
    return null;
  }

  // const { playerName, characterName, weakness, luck, notes } =
  //   charSheetService._charSheet;
  const { weakness, luck, notes } = charSheetEditorUiStore.charSheet;
  return (
    <div style={{ width: "40rem" }}>
      {/* <Row>
        <Col span={12} className="tw-px-2">
          <SectionHeader>Имя персонажа</SectionHeader>
          <Input
            value={characterName}
            onChange={(e) => charSheetService.setCharacterName(e.target.value)}
          />
        </Col>
        <Col span={12} className="tw-px-2">
          <SectionHeader>Имя игрока</SectionHeader>
          <Input
            value={playerName}
            onChange={(e) => charSheetService.setPlayerName(e.target.value)}
          />
        </Col>
      </Row> */}
      <h1 className="tw-text-2xl">{charSheetEditorUiStore.charSheet.name}</h1>
      <div>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetEditorUiStore.createPower(),
            disabled: !charSheetEditorUiStore.canCreatePower,
          }}
        >
          Силы
        </SectionHeader>
        <PowerSectionBody />
      </div>
      <div>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetEditorUiStore.createDreamlandPower(),
            disabled: !charSheetEditorUiStore.canCreateDreamlandPower,
          }}
        >
          Силы Мира Грёз
        </SectionHeader>
        <DreamlandPowerSectionBody />
      </div>
      <div>
        <SectionHeader>Слабость</SectionHeader>
        <div className="tw-flex">
          <Input
            value={weakness.name}
            onChange={(e) =>
              charSheetEditorUiStore.setWeaknessName(e.target.value)
            }
          />
          <Segmented<number>
            options={[1, 2, 3, 4, 5, 6]}
            onChange={(value) => charSheetEditorUiStore.setWeaknessValue(value)}
          />
        </div>
      </div>
      <div>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetEditorUiStore.createRecollection(),
            disabled: !charSheetEditorUiStore.canCreateRecollection,
          }}
        >
          Воспоминания
        </SectionHeader>
        <RecollectionSectionBody />
      </div>
      <div>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetEditorUiStore.createMentalCondition(),
            disabled: !charSheetEditorUiStore.canCreateMentalCondition,
          }}
        >
          Душевные состояния
        </SectionHeader>
        <MentalConditionSectionBody />
      </div>
      <div>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetEditorUiStore.createBodyWound(),
            disabled: !charSheetEditorUiStore.canCreateBodyWound,
          }}
        >
          Телесные раны
        </SectionHeader>
        <BodyWoundSectionBody />
      </div>
      <div>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetEditorUiStore.createTemporalCondition(),
          }}
        >
          Трудности и преимущества
        </SectionHeader>
        <TemporalConditionSectionBody />
      </div>
      <div>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetEditorUiStore.createItem(),
          }}
        >
          Снаряжение
        </SectionHeader>
        <ItemSectionBody />
      </div>
      <div>
        <SectionHeader>Удача</SectionHeader>
        <Segmented<number>
          options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          value={luck}
          onChange={(value) => charSheetEditorUiStore.setLuck(value)}
        />
      </div>
      <div>
        <SectionHeader>Заметки</SectionHeader>
        <Input.TextArea
          value={notes}
          onChange={(e) => charSheetEditorUiStore.setNotes(e.target.value)}
          autoSize={{ minRows: 5 }}
        />
      </div>
    </div>
  );
});
