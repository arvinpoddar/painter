import { useEffect, useMemo, useState } from "react";
import Grid from "./components/Grid";
import GridObjective from "./components/GridObjective";
import MatchOverlay from "./components/MatchOverlay";
import clsx from "clsx";

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-amber-500",
  "bg-violet-400",
];

function chooseNRandomColors(n: number) {
  const result = new Set<string>();
  while (result.size < n) {
    result.add(colors[Math.floor(Math.random() * colors.length)]);
  }
  return Array.from(result);
}

function getBlankGridState(width: number, height: number): string[][] {
  return Array(height)
    .fill("")
    .map((_) => new Array(width).fill("bg-slate-200"));
}

function createRandomGridState(columnColors: string[], rowColors: string[]) {
  const width = columnColors.length;
  const height = rowColors.length;

  const cellBuffer = getBlankGridState(width, height);

  function applyColumnColor(column: number) {
    for (let i = 0; i < height; i++) {
      cellBuffer[i][column] = columnColors[column];
    }
  }

  function applyRowColor(row: number) {
    for (let i = 0; i < width; i++) {
      cellBuffer[row][i] = rowColors[row];
    }
  }

  for (let i = 0; i < 40; i++) {
    if (i % 2 === 0) {
      applyColumnColor(Math.floor(Math.random() * width));
    } else {
      applyRowColor(Math.floor(Math.random() * height));
    }
  }

  return cellBuffer;
}

type Props = {
  difficulty: number;
  onChangeDifficulty: (difficulty: number) => void;
};

export function Game({ difficulty, onChangeDifficulty }: Props) {
  const rowColors = useMemo(
    () => chooseNRandomColors(difficulty),
    [difficulty]
  );
  const columnColors = useMemo(
    () => chooseNRandomColors(difficulty),
    [difficulty]
  );

  const width = columnColors.length;
  const height = rowColors.length;

  const [objective, setObjective] = useState<string[][]>(
    getBlankGridState(width, height)
  );

  const [cells, setCells] = useState<string[][]>(
    getBlankGridState(width, height)
  );

  const [moves, setMoves] = useState(0);

  const setColumn = (column: number) => {
    const color = columnColors[column];
    setCells(
      cells.map((row) =>
        row.map((cell, index) => (index === column ? color : cell))
      )
    );
    setMoves((prev) => prev + 1);
  };

  const setRow = (row: number) => {
    const color = rowColors[row];
    setCells(cells.map((r, index) => (index === row ? r.map(() => color) : r)));
    setMoves((prev) => prev + 1);
  };

  const [isMatch, setIsMatch] = useState(false);

  /**
   * Generate the initial objective
   */
  useEffect(() => {
    const randomState = createRandomGridState(columnColors, rowColors);
    setObjective(randomState);
    setCells(getBlankGridState(columnColors.length, rowColors.length));
  }, [columnColors, rowColors]);

  /**
   * Check if the cells match the objective
   */
  useEffect(() => {
    if (cells.length === 0 || objective.length === 0) {
      return;
    }
    if (
      cells.length !== objective.length ||
      cells.at(0)?.length !== objective.at(0)?.length
    ) {
      return;
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (cells.at(y)?.at(x) !== objective.at(y)?.at(x)) {
          setIsMatch(false);
          return;
        }
      }
    }
    setIsMatch(true);
  }, [cells, objective, height, width]);

  return (
    <>
      <div className="w-screen h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col gap-6">
          <div>
            <GridObjective objective={objective} />
          </div>
          <div className="w-full flex items-center justify-center gap-4">
            <hr className="flex-1" />
            <p className="text-3xl font-bold">{moves}</p>
            <hr className="flex-1" />
          </div>
          <div className="w-full">
            <Grid
              cells={cells}
              rowColors={rowColors}
              columnColors={columnColors}
              onSetColumn={setColumn}
              onSetRow={setRow}
            />
          </div>
        </div>
      </div>

      <MatchOverlay
        difficulty={difficulty}
        moves={moves}
        onChangeDifficulty={onChangeDifficulty}
        className={clsx(
          isMatch ? "opacity-100" : "opacity-0 pointer-events-none",
          "transition-all duration-1000"
        )}
      />
    </>
  );
}
