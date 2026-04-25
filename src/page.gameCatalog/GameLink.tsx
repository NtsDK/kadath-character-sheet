import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

import type { Game } from "../domain/Game";

type Props = {
  game: Game;
};

export const GameLink = observer(({ game }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className="tw-cursor-pointer tw-flex-1 tw-px-4 tw-py-2"
      onClick={() => {
        navigate("/game/" + game.id);
      }}
    >
      {game.name}
    </div>
  );
});
