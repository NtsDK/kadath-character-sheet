import { Button, Checkbox, InputNumber, Tag } from "antd";
import { observer } from "mobx-react-lite";
import { charSheetEditorUiStore } from "./CharSheetEditorUiStore";
import { charSheetActionsUiStore } from "./CharSheetActionsUiStore";
import { MentalConditionSelect } from "./actionComponents/MentalConditionSelect";
import { PostActionEffectView } from "./PostActionEffectView";

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
    postActionEffects,
  } = charSheetActionsUiStore;

  return (
    <div key={id} className="tw-p-2">
      <Button
        type="primary"
        onClick={() => charSheetActionsUiStore.newAction()}
        className="tw-mb-4"
      >
        Новое действие
      </Button>
      {powers.length > 0 && (
        <div className="tw-mb-4">
          <div>Силы</div>
          <div className="tw-flex tw-flex-col">
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
        </div>
      )}
      {dreamlandPowers.length > 0 && (
        <div className="tw-mb-4">
          <div>Силы Мира Грёз</div>
          <div className="tw-flex tw-flex-col">
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
        </div>
      )}
      <div className="tw-mb-4">
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
        <div className="tw-mb-4">
          <div>Душевные состояния</div>
          <MentalConditionSelect className="tw-flex tw-flex-col" />
        </div>
      )}
      {bodyWounds.length > 0 && (
        <div className="tw-mb-4">
          <div>Телесные раны</div>
          <div className="tw-flex tw-flex-col">
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
        </div>
      )}
      <div className="tw-mb-4">
        <div>Трудности и преимущества</div>
        <div className="tw-flex tw-flex-col">
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
        </div>
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
        <div className="tw-mb-4">
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
        <div className="tw-mb-4">
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
        <div className="tw-mb-4">
          <div>Выбранные значения</div>
          {checkedValues.values.map((value) => (
            <span>{value} </span>
          ))}
          <div>Сумма: {checkedValues.sum}</div>
        </div>
        <Button
          type="primary"
          onClick={() => charSheetActionsUiStore.rollDices()}
          disabled={checkedValues.sum <= 0}
        >
          Бросить кости
        </Button>
        <div className="tw-mb-4">
          {diceRollResult.rawDiceRollResult.map((value) => (
            <span>{value} </span>
          ))}
          <div>
            Успехов: {diceRollResult.successCount}{" "}
            {diceRollResult.isFiasco && <Tag color="red">Фиаско</Tag>}
          </div>
        </div>
        <div>
          {/* <pre>
            {JSON.stringify(postActionEffects, null, 2)}
          </pre> */}
          {postActionEffects.map((effect, index) => (
            <PostActionEffectView key={index} effect={effect} />
          ))}
          <Button
            type="primary"
            onClick={() => charSheetActionsUiStore.applyPostActionEffects()}
            disabled={postActionEffects.length == 0}
          >
            Применить последствия
          </Button>
          {/* <div>TODO душевное состояние +-1</div>
          <div>TODO расход удачи</div>

          <div>TODO при достижении успеха при влиянии слабости слабость растет</div>
          <div>TODO преодоление слабости - удачный бросок при слабости 5, то слабость сбрасывается до 1, +6 удачи, можно изменить слабость</div>
          <div>TODO при фиаско и слабости - дается удача за каждую единицу слабости, слабость сбрасывается до 1</div> */}
        </div>
      </div>
    </div>
  );
});

// TODO - поддержка особого усилия - после броска
// Вопрос - особые усилия применимы к любой ситуации? К броскам на замысел тоже?
// TODO - поддержка замыслов и вызовов
// Пример зависимости - бросок на замысел, случается фиаско, тогда готовность замысла снижается на слабость персонажа.
// Вопрос - снижаются ли эффекты от душевных состояний на 1 при фиаско?
