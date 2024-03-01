import { useState } from "react";
import { Game } from "./components/Game";

export default function App() {
  const [difficulty, setDifficulty] = useState(3);
  const [seed, setSeed] = useState(0);

  return (
    <div className="w-screen h-screen h-[calc(100dvh)] bg-slate-200 flex items-center justify-center">
      <Game
        key={seed}
        difficulty={difficulty}
        onChangeDifficulty={(difficulty) => {
          setDifficulty(difficulty);
          setSeed((seed) => seed + 1);
        }}
      />
    </div>
  );
}
