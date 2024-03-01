import clsx from "clsx";
import { useMemo } from "react";

const difficulties = [
  { label: "Easy", value: 3 },
  { label: "Medium", value: 4 },
  { label: "Hard", value: 5 },
];

function getDifficultyTiers(difficulty: number) {
  if (difficulty === 3) {
    return { excellent: 5, good: 8 };
  } else if (difficulty === 4) {
    return { excellent: 9, good: 13 };
  } else if (difficulty === 5) {
    return { excellent: 13, good: 17 };
  }
  return null;
}

function getNumberOfStars(moves: number, difficulty: number) {
  const tiers = getDifficultyTiers(difficulty);
  if (tiers == null) return 0;
  if (moves <= tiers.excellent) {
    return 3;
  } else if (moves <= tiers.good) {
    return 2;
  } else {
    return 1;
  }
}

type Props = {
  className?: string;
  moves: number;
  difficulty: number;
  onChangeDifficulty: (difficulty: number) => void;
};

export default function MatchOverlay({
  className,
  moves,
  difficulty,
  onChangeDifficulty,
}: Props) {
  const numberOfStars = useMemo(
    () => getNumberOfStars(moves, difficulty),
    [moves, difficulty]
  );

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center absolute z-50 bg-slate-900 bg-opacity-90 top-0 left-0 right-0 bottom-0",
        className
      )}
    >
      <p className="text-4xl text-white font-bold mb-5">It's a match!</p>
      <div className="text-2xl font-bold text-white">{moves} moves</div>
      <div className="text-2xl font-bold text-white tracking-widest">
        {Array(numberOfStars).fill(`⭐️`)}
      </div>
      <hr className="w-64 my-5" />

      <p className="text-white font-medium">Choose Difficulty:</p>
      <div className="flex gap-2 items-center mt-2">
        {difficulties.map((difficulty, idx) => (
          <button
            key={idx}
            className="bg-slate-500 text-white px-4 py-2 rounded mt-2 hover:brightness-90 transition duration-100"
            onClick={() => onChangeDifficulty(difficulty.value)}
          >
            {difficulty.label}
          </button>
        ))}
      </div>
    </div>
  );
}
