import clsx from "clsx";

type Props = {
  cells: string[][];
  rowColors: string[];
  columnColors: string[];
  onSetRow: (row: number) => void;
  onSetColumn: (column: number) => void;
};

export default function Grid({
  cells,
  rowColors,
  columnColors,
  onSetRow,
  onSetColumn,
}: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-col gap-3">
          {cells.map((row, y) => (
            <div key={y} className="flex gap-3">
              {row.map((color, x) => (
                <div
                  key={`${y},${x}`}
                  className={clsx(
                    "w-14 h-14 rounded transition-colors duration-500",
                    color
                  )}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Row buttons */}
        <div className="ml-6 flex flex-col gap-3">
          {rowColors.map((color, idx) => (
            <button
              key={idx}
              className={clsx(
                "w-14 h-14 rounded-full hover:brightness-90 transition duration-100 text-xl text-white",
                color
              )}
              onClick={() => {
                onSetRow(idx);
              }}
            >
              ←
            </button>
          ))}
        </div>
      </div>

      {/* Column buttons */}
      <div className="mt-6 flex gap-3">
        {columnColors.map((color, idx) => (
          <button
            key={idx}
            className={clsx(
              "w-14 h-14 rounded-full hover:brightness-90 transition duration-100 text-xl text-white",
              color
            )}
            onClick={() => {
              onSetColumn(idx);
            }}
          >
            ↑
          </button>
        ))}
      </div>
    </div>
  );
}
