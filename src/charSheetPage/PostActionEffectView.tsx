import { observer } from "mobx-react-lite";
import { PostActionEffect } from "../domain/PostActionEffect";
import { assert } from "../utils/assert";
import { MAX_LUCK } from "../domain/constants";
import { getCharSheetActionsUiStore } from "../IoC";

type Props = {
  effect: PostActionEffect;
};

export const PostActionEffectView = observer(({ effect }: Props) => {
  const charSheetActionsUiStore = getCharSheetActionsUiStore();
  if (effect === "weakenMentalCondition") {
    const condition = charSheetActionsUiStore.selectedMentalConditionObject;
    assert(condition);
    return (
      <div>{`${condition.name} ${condition.value} => ${
        condition.value > 0 ? condition.value - 1 : condition.value + 1
      }`}</div>
    );
  }

  if (effect === "deductLuckPoints") {
    const { useLuckPoints, luck } = charSheetActionsUiStore;
    return <div>{`Удача ${luck} => ${luck - useLuckPoints}`}</div>;
  }

  if (effect === "overcomingWeakness") {
    const { weakness, luck } = charSheetActionsUiStore;
    return (
      <div>{`Слабость ${weakness.value} => 1, Удача ${luck} => ${Math.min(
        luck + 6,
        MAX_LUCK
      )}`}</div>
    );
  }

  if (effect === "increaseWeakness") {
    const { weakness } = charSheetActionsUiStore;
    return <div>{`Слабость ${weakness.value} => ${weakness.value + 1}`}</div>;
  }

  if (effect === "fiascoWeaknessReset") {
    const { weakness, luck } = charSheetActionsUiStore;
    return (
      <div>{`Слабость ${weakness.value} => 1, Удача ${luck} => ${Math.min(
        luck + weakness.value,
        MAX_LUCK
      )}`}</div>
    );
  }

  return <div>{effect}</div>;
});
