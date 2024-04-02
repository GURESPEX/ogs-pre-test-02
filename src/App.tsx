import { useRef, useState } from "react";
import { Robot } from "./Robot";

import RobotDisplay from "./RobotDisplay";

function App() {
  const inputCode = useRef(null);
  const [robotSteps, setRobotSteps] = useState<[number, number][] | null>(null);

  function execute() {
    const code = inputCode.current?.value;
    const robot = new Robot();
    robot.execute(code);
    setRobotSteps(robot.getSteps());
  }

  return (
    <div className="flex flex-row justify-center w-screen h-screen">
      <div className="container flex flex-row gap-4 p-4">
        <div className="flex flex-col p-4 gap-4 w-1/3 rounded border bg-slate-100">
          <h1 className="font-bold text-2xl">Robot Walk</h1>
          <div className="flex flex-col gap-4">
            <h2>ใส่คำสั่ง Robot Walk</h2>
            <input
              ref={inputCode}
              type="text"
              name="code"
              id="code"
              className="flex flex-row justify-center px-4 py-2 border bg-white text-slate-800 rounded"
            />
            <button
              onClick={execute}
              className="flex flex-row justify-center px-4 py-2 border bg-slate-800 text-white rounded drop-shadow-sm hover:bg-slate-900 active:bg-slate-700 transition"
            >
              คำนวณ
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center flex-1">
          {robotSteps ? (
            <RobotDisplay robotSteps={robotSteps} />
          ) : (
            <div>Enter the code to run.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
