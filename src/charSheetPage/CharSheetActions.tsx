import { Button, Checkbox } from "antd";
import { observer } from "mobx-react-lite";
import { charSheetEditorUiStore } from "./CharSheetEditorUiStore";
import { charSheetActionsUiStore } from "./CharSheetActionsUiStore";

export const CharSheetActions = observer(() => {
  if (!charSheetEditorUiStore.charSheetExists) {
    return null;
  }

  const { id, powers, checkedValues, diceRollResult } = charSheetActionsUiStore;

  return (
    <div key={id}>
      {powers.length > 0 && (
        <div>
          <div>Силы</div>
          {powers.map((power, index) => (
            <Checkbox
              key={power.name}
              onChange={(e) =>
                charSheetActionsUiStore.togglePowerSelection(index)
              }
            >
              {power.name + " " + power.value}
            </Checkbox>
          ))}
        </div>
      )}
      <div>
        <div>Силы Мира Грёз</div>
      </div>
      <div>
        <div>Слабость</div>
      </div>
      <div>
        <div>Трудности/раны</div>
      </div>
      <div>
        <div>Преимущества</div>
      </div>
      <div>
        <div>Удача</div>
      </div>
      <div className="tw-mt-4">
        <div>Выбранные значения</div>
        {checkedValues.values.map((value) => (
          <span>{value} </span>
        ))}
        <div>Сумма: {checkedValues.sum}</div>
        <Button
          type="primary"
          onClick={() => charSheetActionsUiStore.rollDices()}
        >
          Бросить кости
        </Button>
        <div>
          {diceRollResult.map((value) => (
            <span>{value} </span>
          ))}
        </div>
      </div>
    </div>
  );
});
