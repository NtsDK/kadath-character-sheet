import { observer } from "mobx-react-lite";
import { charSheetActionsUiStore } from "../CharSheetActionsUiStore";
import { Checkbox } from "antd";

type Props = {
  className?: string;
};

export const MentalConditionSelect = observer(({ className }: Props) => {
  const { mentalConditions, selectedMentalCondition } = charSheetActionsUiStore;

  if (mentalConditions.length === 0) {
    return null;
  }

  const maxAbs = Math.max(...mentalConditions.map((mc) => Math.abs(mc.value)));

  return (
    <div className={className}>
      {mentalConditions.map((condition, index) => {
        return (
          <Checkbox
            disabled={Math.abs(condition.value) !== maxAbs}
            key={condition.name}
            onChange={() =>
              charSheetActionsUiStore.selectMentalCondition(index)
            }
            checked={selectedMentalCondition === index}
          >
            {condition.name + " " + condition.value}
          </Checkbox>
        );
      })}
      <Checkbox
        onChange={() => charSheetActionsUiStore.selectMentalCondition(null)}
        checked={selectedMentalCondition === null}
      >
        Нет состояния
      </Checkbox>
    </div>
  );
});
