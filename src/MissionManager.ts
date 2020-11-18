import {
  CardinalPoint,
  FieldBoundary,
  Spacecraft,
  Position
} from './SpacecraftModule'

export class MissionManager {
  private readonly _spacecraft: Spacecraft

  constructor(fieldBoundarySetting: string, initialPositionSetting: string) {
    this._spacecraft = new Spacecraft({
      fieldBoundary: this.setFieldBoundary(fieldBoundarySetting),
      initialPosition: this.setInitialPosition(initialPositionSetting)
    })
  }

  private setFieldBoundary(fieldSetting: string): FieldBoundary {
    const re = /(^\d+)( \d+)$/
    const match = fieldSetting.match(re)

    if (!match) {
      throw new Error('Invalid params')
    }
    return { x: Number(match[1]), y: Number(match[2]) }
  }

  private setInitialPosition(initialPositionSetting: string): Position {
    const re = /^(\d+)( \d+)( [NESW])$/
    const match = initialPositionSetting.match(re)

    if (!match) {
      throw new Error('Invalid params')
    }
    return {
      x: Number(match[1]),
      y: Number(match[2]),
      d: CardinalPoint[match[3].trim()]
    }
  }

  public getFieldBoundary(): FieldBoundary {
    return this._spacecraft.fieldBoundary
  }

  public getPosition(): Position {
    return this._spacecraft.position
  }
}

// const foo = new MissionManager('0 1', '0 0 S')
// console.log(foo.getFieldBoundary())
// console.log(foo.getPosition())

// function regexTest1() {
//   const command = '0 0'
//   command.match('^[0-9]( [0-9])$')
// }

// function regexTest() {
//   const command = '31 11'
//   const re = /^\d+( \d+)$/gm
//   const result = command.match(re)
//   console.log(result)
// }

// regexTest()
