import clsx from "clsx";

type Props = {
  cells: string[][];
  rowColors: string[];
  columnColors: string[];
  onSetRow: (row: number) => void;
  onSetColumn: (column: number) => void;
};

const CELL_SIZING = "w-12 h-12";
const CELL_GAP = "gap-2";

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
        <div className={clsx("flex flex-col", CELL_GAP)}>
          {cells.map((row, y) => (
            <div key={y} className={clsx("flex", CELL_GAP)}>
              {row.map((color, x) => (
                <div
                  key={`${y},${x}`}
                  className={clsx(
                    "rounded transition-colors duration-500",
                    color,
                    CELL_SIZING
                  )}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Row buttons */}
        <div className={clsx("ml-5 flex flex-col", CELL_GAP)}>
          {rowColors.map((color, idx) => (
            <button
              key={idx}
              className={clsx(
                "rounded-full hover:brightness-90 transition duration-100 text-xl text-white",
                color,
                CELL_SIZING
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
      <div className={clsx("mt-5 flex", CELL_GAP)}>
        {columnColors.map((color, idx) => (
          <button
            key={idx}
            className={clsx(
              "rounded-full hover:brightness-90 transition duration-100 text-xl text-white",
              color,
              CELL_SIZING
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
