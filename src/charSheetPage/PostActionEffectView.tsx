import { observer } from "mobx-react-lite";
import { PostActionEffect } from "../domain/PostActionEffect";
import { charSheetActionsUiStore } from "./CharSheetActionsUiStore";
import { assert } from "../utils/assert";

type Props = {
  effect: PostActionEffect;
};

export const PostActionEffectView = observer(({ effect }: Props) => {
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
        12
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
        12
      )}`}</div>
    );
  }

  return <div>{effect}</div>;
});
