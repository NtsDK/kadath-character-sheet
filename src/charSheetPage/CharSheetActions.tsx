import { Button, Checkbox, Tag } from "antd";
import { observer } from "mobx-react-lite";
import { charSheetEditorUiStore } from "./CharSheetEditorUiStore";
import { charSheetActionsUiStore } from "./CharSheetActionsUiStore";

export const CharSheetActions = observer(() => {
  if (!charSheetEditorUiStore.charSheetExists) {
    return null;
  }

  const { id, powers, checkedValues, diceRollResult, dreamlandPowers } = charSheetActionsUiStore;

  return (
    <div key={id}>
      <Button type="primary" onClick={() => charSheetActionsUiStore.newAction()}>Новое действие</Button>
      {powers.length > 0 && (
        <div>
          <div>Силы</div>
          {powers.map((power, index) => (
            <Checkbox
              key={power.name}
              onChange={() =>
                charSheetActionsUiStore.togglePowerSelection(index)
              }
              checked={charSheetActionsUiStore.selectedPowers.has(index)}
            >
              {power.name + " " + power.value}
            </Checkbox>
          ))}
        </div>
      )}
      {
        dreamlandPowers.length > 0 && (
          <div>
            <div>Силы Мира Грёз</div>
            {dreamlandPowers.map((power, index) => (
              <Checkbox
                key={power.name}
                onChange={() =>
                  charSheetActionsUiStore.toggleDreamlandPowerSelection(index)
                }
                checked={charSheetActionsUiStore.selectedDreamlandPowers.has(index)}
              >
                {power.name + " " + power.value}
              </Checkbox>
            ))}
          </div>
        )
      }
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
          {diceRollResult.rawDiceRollResult.map((value) => (
            <span>{value} </span>
          ))}
          <div>Успехов: {diceRollResult.successCount} {diceRollResult.isFiasco && <Tag color="red">Фиаско</Tag>}</div>

        </div>
      </div>
    </div>
  );
});
