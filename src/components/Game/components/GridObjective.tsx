import clsx from "clsx";

type Props = {
  objective: string[][];
};

export default function GridObjective({ objective }: Props) {
  return (
    <div className="flex flex-col gap-1 items-center">
      {objective.map((row, y) => (
        <div key={y} className="flex gap-1">
          {row.map((color, x) => (
            <div
              key={`${y},${x}`}
              className={clsx("w-6 h-6 rounded-sm", color)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
