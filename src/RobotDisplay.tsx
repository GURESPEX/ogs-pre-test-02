import { RobotPlate } from "./Robot";

type Props = {
  robotSteps: [number, number][] | null;
};

export default function RobotDisplay({ robotSteps }: Props) {
  const robotPlate = new RobotPlate(robotSteps);
  const plate = robotPlate.getPlate();
  const cellSize = 32;
  const currentPosition = robotSteps && robotSteps[robotSteps.length - 1];

  return (
    <div className="flex flex-col gap-2">
      <div>
        ตำแหน่งปัจจุบัน ({currentPosition && currentPosition[0]},{" "}
        {currentPosition && currentPosition[1]})
      </div>
      <div className="flex flex-col items-center gap-2">
        <div
          className="border"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${plate.length}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${plate.length}, ${cellSize}px)`,
          }}
        >
          {plate.map((row: string[]) =>
            row.map((cell: string) => {
              let color = "bg-white";
              if (cell == "O") {
                color = "bg-white";
              } else if (cell == "S") {
                color = "bg-green-200";
              } else if (cell == "P") {
                color = "bg-slate-100";
              } else if (cell == "E") {
                color = "bg-red-200";
              }
              return (
                <div
                  className={`w-[${cellSize}px] h-[${cellSize}px] ${color} border`}
                ></div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
