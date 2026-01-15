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
import { MAX_LUCK, MAX_WEAKNESS } from "../domain/constants";
import { range } from "../utils/range";

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
    <div style={{ width: "40rem" }} className="tw-px-8 tw-py-4">
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
      <h1 className="tw-text-2xl tw-mb-4">
        {charSheetEditorUiStore.charSheet.name}
      </h1>
      <Section>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetEditorUiStore.createPower(),
            disabled: !charSheetEditorUiStore.canCreatePower,
          }}
        >
          Силы
        </SectionHeader>
        <PowerSectionBody />
      </Section>
      <Section>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetEditorUiStore.createDreamlandPower(),
            disabled: !charSheetEditorUiStore.canCreateDreamlandPower,
          }}
        >
          Силы Мира Грёз
        </SectionHeader>
        <DreamlandPowerSectionBody />
      </Section>
      <Section>
        <SectionHeader>Слабость</SectionHeader>
        <div className="tw-flex">
          <Input
            value={weakness.name}
            onChange={(e) =>
              charSheetEditorUiStore.setWeaknessName(e.target.value)
            }
          />
          <Segmented<number>
            options={range(1, MAX_WEAKNESS + 1)}
            onChange={(value) => charSheetEditorUiStore.setWeaknessValue(value)}
            value={weakness.value}
          />
        </div>
      </Section>
      <Section>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetEditorUiStore.createRecollection(),
            disabled: !charSheetEditorUiStore.canCreateRecollection,
          }}
        >
          Воспоминания
        </SectionHeader>
        <RecollectionSectionBody />
      </Section>
      <Section>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetEditorUiStore.createMentalCondition(),
            disabled: !charSheetEditorUiStore.canCreateMentalCondition,
          }}
        >
          Душевные состояния
        </SectionHeader>
        <MentalConditionSectionBody />
      </Section>
      <Section>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetEditorUiStore.createBodyWound(),
            disabled: !charSheetEditorUiStore.canCreateBodyWound,
          }}
        >
          Телесные раны
        </SectionHeader>
        <BodyWoundSectionBody />
      </Section>
      <Section>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetEditorUiStore.createTemporalCondition(),
          }}
        >
          Трудности и преимущества
        </SectionHeader>
        <TemporalConditionSectionBody />
      </Section>
      <Section>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetEditorUiStore.createItem(),
          }}
        >
          Снаряжение
        </SectionHeader>
        <ItemSectionBody />
      </Section>
      <Section>
        <SectionHeader>Удача</SectionHeader>
        <Segmented<number>
          options={range(0, MAX_LUCK + 1)}
          value={luck}
          onChange={(value) => charSheetEditorUiStore.setLuck(value)}
        />
      </Section>
      <Section>
        <SectionHeader>Заметки</SectionHeader>
        <Input.TextArea
          value={notes}
          onChange={(e) => charSheetEditorUiStore.setNotes(e.target.value)}
          autoSize={{ minRows: 5 }}
        />
      </Section>
    </div>
  );
});

function Section({ children }: { children: React.ReactNode }) {
  return <div className="tw-mb-4">{children}</div>;
}
