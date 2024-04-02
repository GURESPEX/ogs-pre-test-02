export class Robot {
  private x: number;
  private y: number;
  private angle: number;
  private robotSteps: [number, number][];

  constructor() {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.robotSteps = [[this.x, this.y]];
  }

  public execute = (code: string): void => {
    for (const char of code) {
      if (char.toUpperCase() == "W") {
        switch (this.angle % 4) {
          case 0: // Top
            this.y += 1;
            break;
          case 1: // Left
            this.x -= 1;
            break;
          case 2: // Bottom
            this.y -= 1;
            break;
          case 3: // Right
            this.x += 1;
            break;
          default:
            break;
        }
        this.robotSteps.push(this.getPosition());
      } else if (char.toUpperCase() == "L") {
        this.angle += 1;
      } else if (char.toUpperCase() == "R") {
        this.angle -= 1;
      }
    }
  };

  public getPosition = (): [number, number] => {
    return [this.x, this.y];
  };

  public getSteps = (): [number, number][] => {
    return this.robotSteps;
  };
}

export class RobotPlate {
  private robotSteps: [number, number][] | null;
  private plate: string[][];

  constructor(robotSteps: [number, number][] | null) {
    this.robotSteps = robotSteps;
    this.plate = [];

    if (this.robotSteps) {
      // Get max value from robot steps
      let maxSize = 0;
      for (let robotStep of this.robotSteps) {
        const positiveRobotStep = robotStep.map((e) => Math.abs(e));
        const maxRobotStepSize = Math.max(...positiveRobotStep);
        if (maxRobotStepSize > maxSize) {
          maxSize = maxRobotStepSize;
        }
      }

      // Create 2D plate
      for (let x of Array(maxSize * 2 + 1)) {
        let plateX: string[] = [];
        for (let y of Array(maxSize * 2 + 1)) {
          plateX.push("O");
        }
        this.plate.push(plateX);
      }

      for (let stepIndex = 0; stepIndex < this.robotSteps.length; stepIndex++) {
        let symbol = "O";
        if (stepIndex == 0) {
          symbol = "S";
        } else if (stepIndex == this.robotSteps.length - 1) {
          symbol = "E";
        } else {
          symbol = "P";
        }
        this.plate[-this.robotSteps[stepIndex][1] + maxSize][
          this.robotSteps[stepIndex][0] + maxSize
        ] = symbol;
      }
    }
  }

  public getPlate() {
    return this.plate;
  }

  public display() {
    for (let x of this.plate) {
      console.log(x.join(" "));
    }
  }
}
