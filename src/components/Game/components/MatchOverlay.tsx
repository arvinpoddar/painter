type Props = {
  moves: number;
  onChangeDifficulty: (difficulty: number) => void;
};

const difficulties = [
  { label: "Easy", value: 3 },
  { label: "Medium", value: 4 },
  { label: "Hard", value: 5 },
];

export default function MatchOverlay({ moves, onChangeDifficulty }: Props) {
  return (
    <div className="flex flex-col items-center justify-center absolute z-50 bg-slate-900 bg-opacity-90 top-0 left-0 right-0 bottom-0 transition-opacity duration-1000">
      <p className="text-4xl text-white font-bold mb-5">It's a match!</p>
      <div className="text-2xl font-bold text-white">{moves} moves</div>

      <hr className="w-64 my-5" />

      <p className="text-white font-medium">Choose Difficulty:</p>
      <div className="flex gap-2 items-center mt-2">
        {difficulties.map((difficulty, idx) => (
          <button
            key={idx}
            className="bg-slate-600 text-white px-4 py-2 rounded mt-2"
            onClick={() => onChangeDifficulty(difficulty.value)}
          >
            {difficulty.label}
          </button>
        ))}
      </div>
    </div>
  );
}
