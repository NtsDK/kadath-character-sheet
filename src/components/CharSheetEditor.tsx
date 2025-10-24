import { observer } from "mobx-react-lite";
import { Button, Form, Input, Radio } from "antd";
import { Segmented } from "antd";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { charSheetService } from "../appServices/CharSheetService";

import { PowerInput } from "./PowerInput";
import { RecollectionInput } from "./RecollectionInput";
import { CharacterConditionInput } from "./CharacterConditionInput";
import { SectionHeader } from "./SectionHeader";
import { TemporalConditionInput } from "./TemporalConditionInput";

export const CharSheetEditor = observer(() => {
  const {
    playerName,
    characterName,
    powers,
    dreamlandPowers,
    weakness,
    recollections,
    mentalConditions,
    bodyWounds,
    temporalConditions,
    items,
    luck,
    notes
  } = charSheetService._charSheet;
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
        {powers.map((power, index) => (
          <PowerInput
            key={index}
            power={power}
            onChangeName={(name) => charSheetService.setPowerName(index, name)}
            onChangeValue={(value) =>
              charSheetService.setPowerValue(index, value)
            }
            removePower={() => {
              charSheetService.removePower(index);
            }}
          />
        ))}
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
        {dreamlandPowers.map((power, index) => (
          <PowerInput
            key={index}
            power={power}
            onChangeName={(name) =>
              charSheetService.setDreamlandPowerName(index, name)
            }
            onChangeValue={(value) =>
              charSheetService.setDreamlandPowerValue(index, value)
            }
            removePower={() => {
              charSheetService.removeDreamlandPower(index);
            }}
          />
        ))}
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
        {recollections.map((recollection, index) => (
          <RecollectionInput
            key={index}
            recollection={recollection}
            onChangeName={(name) =>
              charSheetService.setRecollectionName(index, name)
            }
            onChangeValue={(value) =>
              charSheetService.setRecollectionValue(index, value)
            }
            removeRecollection={() => {
              charSheetService.removeRecollection(index);
            }}
          />
        ))}
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
        {mentalConditions.map((mc, index) => (
          <CharacterConditionInput
            key={index}
            characterCondition={mc}
            onChangeName={(name) =>
              charSheetService.setMentalConditionName(index, name)
            }
            onChangeValue={(value) =>
              charSheetService.setMentalConditionValue(index, value)
            }
            onChangeInjury={(isInjury) =>
              charSheetService.setMentalConditionInjury(index, isInjury)
            }
            removeCondition={() => {
              charSheetService.removeMentalCondition(index);
            }}
          />
        ))}
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
        {bodyWounds.map((bw, index) => (
          <CharacterConditionInput
            key={index}
            characterCondition={bw}
            onChangeName={(name) =>
              charSheetService.setBodyWoundName(index, name)
            }
            onChangeValue={(value) =>
              charSheetService.setBodyWoundValue(index, value)
            }
            onChangeInjury={(isInjury) =>
              charSheetService.setBodyWoundInjury(index, isInjury)
            }
            removeCondition={() => {
              charSheetService.removeBodyWound(index);
            }}
          />
        ))}
      </div>
      <div>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetService.createTemporalCondition(),
          }}
        >
          Трудности и преимущества
        </SectionHeader>
        {temporalConditions.map((condition, index) => (
          <TemporalConditionInput
            key={index}
            temporalCondition={condition}
            onChangeName={(name) =>
              charSheetService.setTemporalConditionName(index, name)
            }
            onChangeValue={(value) =>
              charSheetService.setTemporalConditionValue(index, value)
            }
            removeCondition={() => {
              charSheetService.removeTemporalCondition(index);
            }}
          />
        ))}
      </div>
      <div>
        <SectionHeader
          buttonProps={{
            onCreate: () => charSheetService.createItem(),
          }}
        >
          Снаряжение
        </SectionHeader>
        {items.map((item, index) => (
          <div key={index} className="tw-flex tw-items-center">
            <Input value={item} onChange={(e) => charSheetService.setItemName(index, e.target.value)}/>
            <Button onClick={() => charSheetService.removeItem(index)}>
              <XMarkIcon className="tw-h-3" />
            </Button>
          </div>
        ))}
      </div>
      <div>
        <SectionHeader>Удача</SectionHeader>
        <Segmented<number>
          options={[0, 1, 2, 3, 4, 5, 6,7,8,9,10,11,12]}
          value={luck}
          onChange={(value) => charSheetService.setLuck(value)}
        />
      </div>
    </div>
  );
});
