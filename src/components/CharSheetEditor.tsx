import { observer } from "mobx-react-lite";
import { Button, Form, Input, Radio } from "antd";
import { Segmented } from "antd";
import { charSheetService } from "../appServices/CharSheetService";

import { PowerInput } from "./PowerInput";
import { SectionHeader } from "./SectionHeader";

export const CharSheetEditor = observer(() => {
  const { playerName, characterName, powers, dreamlandPowers } = charSheetService._charSheet;
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
        <h2></h2>
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
            onChangeName={(name) => charSheetService.setDreamlandPowerName(index, name)}
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
        <h2>Слабость</h2>
      </div>
    </div>
  );
});
