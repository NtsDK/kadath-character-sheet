import { observer } from "mobx-react-lite";
import { Button, Form, Input, Radio } from "antd";
import { charSheetService } from "../appServices/CharSheetService";

import { PlusIcon } from "@heroicons/react/24/outline";

export const CharSheetEditor = observer(() => {
  const { playerName, characterName, powers } = charSheetService._charSheet;
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
        <h2>
          Силы{" "}
          <Button onClick={() => charSheetService.createPower()}>
            <PlusIcon className="tw-h-5" />
          </Button>
        </h2>
        {powers.map((power, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <Input
              value={power.name}
              onChange={(e) =>
                charSheetService.setPowerName(index, e.target.value)
              }
            />
          </div>
        ))}
      </div>
      <div>
        <h2>Силы Мира Грёз</h2>
      </div>
      <div>
        <h2>Слабость</h2>
      </div>
    </div>
  );
});
