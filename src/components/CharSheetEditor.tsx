import { observer } from "mobx-react-lite";
import { charSheetService } from "../appServices/CharSheetService";

export const CharSheetEditor = observer(() => {
  const { playerName, characterName } = charSheetService._charSheet;
  return <div>
    <div>Имя персонажа: <input type="text" value={characterName} onChange={e => charSheetService.setCharacterName(e.target.value)} /></div>
    <div>Имя игрока: <input type="text" value={playerName} onChange={e => charSheetService.setPlayerName(e.target.value)} /></div>
  </div>;
});
