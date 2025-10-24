import { observer } from "mobx-react-lite";
import { Form, Input } from "antd";
import { Segmented } from "antd";

import { charSheetService } from "../appServices/CharSheetService";

import { SectionHeader } from "./SectionHeader";
import { PowerSectionBody } from "./PowerSectionBody";
import { DreamlandPowerSectionBody } from "./DreamlandPowerSectionBody";
import { RecollectionSectionBody } from "./RecollectionSectionBody";
import { MentalConditionSectionBody } from "./MentalConditionSectionBody";
import { BodyWoundSectionBody } from "./BodyWoundSectionBody";
import { TemporalConditionSectionBody } from "./TemporalConditionSectionBody";
import { ItemSectionBody } from "./ItemSectionBody";

export const CharSheetEditor = observer(() => {
  const { playerName, characterName, weakness, luck, notes } =
    charSheetService._charSheet;
  return (
    <div>
      <Form.Item label="Имя персонажа" name="characterName" layout="vertical">
        <Input
          value={characterName}
          onChange={(e) => charSheetService.setCharacterName(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Имя игрока" name="playerName" layout="vertical">
        <Input
          value={playerName}
          onChange={(e) => charSheetService.setPlayerName(e.target.value)}
        />
      </Form.Item>
      <div>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetService.createPower(),
            disabled: !charSheetService.canCreatePower,
          }}
        >
          Силы
        </SectionHeader>
        <PowerSectionBody />
      </div>
      <div>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetService.createDreamlandPower(),
            disabled: !charSheetService.canCreateDreamlandPower,
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
            onChange={(e) => charSheetService.setWeaknessName(e.target.value)}
          />
          <Segmented<number>
            options={[1, 2, 3, 4, 5, 6]}
            onChange={(value) => charSheetService.setWeaknessValue(value)}
          />
        </div>
      </div>
      <div>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetService.createRecollection(),
            disabled: !charSheetService.canCreateRecollection,
          }}
        >
          Воспоминания
        </SectionHeader>
        <RecollectionSectionBody />
      </div>
      <div>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetService.createMentalCondition(),
            disabled: !charSheetService.canCreateMentalCondition,
          }}
        >
          Душевные состояния
        </SectionHeader>
        <MentalConditionSectionBody />
      </div>
      <div>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetService.createBodyWound(),
            disabled: !charSheetService.canCreateBodyWound,
          }}
        >
          Телесные раны
        </SectionHeader>
        <BodyWoundSectionBody />
      </div>
      <div>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetService.createTemporalCondition(),
          }}
        >
          Трудности и преимущества
        </SectionHeader>
        <TemporalConditionSectionBody />
      </div>
      <div>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetService.createItem(),
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
          onChange={(value) => charSheetService.setLuck(value)}
        />
      </div>
      <div>
        <SectionHeader>Заметки</SectionHeader>
        <Input.TextArea
          value={notes}
          onChange={(e) => charSheetService.setNotes(e.target.value)}
          autoSize={{ minRows: 5 }}
        />
      </div>
    </div>
  );
});
