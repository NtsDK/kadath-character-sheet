import { Button, Checkbox, InputNumber, Tag } from "antd";
import { observer } from "mobx-react-lite";
import { charSheetEditorUiStore } from "./CharSheetEditorUiStore";
import { charSheetActionsUiStore } from "./CharSheetActionsUiStore";
import { MentalConditionSelect } from "./actionComponents/MentalConditionSelect";

export const CharSheetActions = observer(() => {
  if (!charSheetEditorUiStore.charSheetExists) {
    return null;
  }

  const {
    id,
    powers,
    checkedValues,
    diceRollResult,
    dreamlandPowers,
    weakness,
    mentalConditions,
    bodyWounds,
    temporalConditions,
    otherConditionEffect,
    items,
    luck,
  } = charSheetActionsUiStore;

  return (
    <div key={id}>
      <Button
        type="primary"
        onClick={() => charSheetActionsUiStore.newAction()}
      >
        Новое действие
      </Button>
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
      {dreamlandPowers.length > 0 && (
        <div>
          <div>Силы Мира Грёз</div>
          {dreamlandPowers.map((power, index) => (
            <Checkbox
              key={power.name}
              onChange={() =>
                charSheetActionsUiStore.toggleDreamlandPowerSelection(index)
              }
              checked={charSheetActionsUiStore.selectedDreamlandPowers.has(
                index
              )}
            >
              {power.name + " " + power.value}
            </Checkbox>
          ))}
        </div>
      )}
      <div>
        <div>Слабость</div>
        <Checkbox
          key={weakness.name}
          onChange={() => charSheetActionsUiStore.toggleApplyWeakness()}
          checked={charSheetActionsUiStore.applyWeakness}
        >
          {weakness.name + " " + -weakness.value}
        </Checkbox>
      </div>
      {mentalConditions.length > 0 && (
        <div>
          <div>Душевные состояния</div>
          <MentalConditionSelect />
        </div>
      )}
      {bodyWounds.length > 0 && (
        <div>
          <div>Телесные раны</div>
          {bodyWounds.map((wound, index) => (
            <Checkbox
              key={wound.name}
              onChange={() =>
                charSheetActionsUiStore.toggleBodyWoundSelection(index)
              }
              checked={charSheetActionsUiStore.selectedBodyWounds.has(index)}
            >
              {wound.name + " " + wound.value}
            </Checkbox>
          ))}
        </div>
      )}
      <div>
        <div>Трудности и преимущества</div>
        {temporalConditions.map((condition, index) => (
          <Checkbox
            key={condition.name}
            onChange={() =>
              charSheetActionsUiStore.toggleTemporalConditionSelection(index)
            }
            checked={charSheetActionsUiStore.selectedTemporalConditions.has(
              index
            )}
          >
            {condition.name + " " + condition.value}
          </Checkbox>
        ))}
        <div>
          Другое:{" "}
          <InputNumber
            value={otherConditionEffect}
            onChange={(value) =>
              charSheetActionsUiStore.changeOtherConditionEffect(value || 0)
            }
          />
        </div>
      </div>
      {items.length > 0 && (
        <div>
          <div>Снаряжение</div>
          {items.map((item, index) => (
            <Checkbox
              key={item}
              onChange={() =>
                charSheetActionsUiStore.toggleItemSelection(index)
              }
              checked={charSheetActionsUiStore.selectedItems.has(index)}
            >
              {item}
            </Checkbox>
          ))}
        </div>
      )}

      {luck > 0 && (
        <div>
          <div>Удача</div>
          <InputNumber
            value={charSheetActionsUiStore.useLuckPoints}
            onChange={(value) =>
              charSheetActionsUiStore.changeUseLuckPoints(value || 0)
            }
            max={luck}
            min={0}
          />
        </div>
      )}
      <div className="tw-mt-4">
        <div>Выбранные значения</div>
        {checkedValues.values.map((value) => (
          <span>{value} </span>
        ))}
        <div>Сумма: {checkedValues.sum}</div>
        <Button
          type="primary"
          onClick={() => charSheetActionsUiStore.rollDices()}
          disabled={checkedValues.sum <= 0}
        >
          Бросить кости
        </Button>
        <div>
          {diceRollResult.rawDiceRollResult.map((value) => (
            <span>{value} </span>
          ))}
          <div>
            Успехов: {diceRollResult.successCount}{" "}
            {diceRollResult.isFiasco && <Tag color="red">Фиаско</Tag>}
          </div>
        </div>
      </div>
    </div>
  );
});
