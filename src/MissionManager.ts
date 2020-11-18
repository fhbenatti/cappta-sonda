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

  public navigate(commandBuffer: string): Position {
    const re = /^[LRM]+$/
    const match = commandBuffer.toUpperCase().match(re)

    if (!match) {
      throw new Error('Invalid params')
    }

    commandBuffer
      .split('')
      .map(c => this._spacecraft.navigate(c as 'L' | 'R' | 'M'))

    return this.getPosition()
  }
}
