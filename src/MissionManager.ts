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

  public getFieldBoundary(): FieldBoundary {
    return this._spacecraft.fieldBoundary
  }

  public getPosition(): Position {
    return this._spacecraft.position
  }

  private setFieldBoundary(fieldSetting: string): FieldBoundary {
    const re = /(^\d+)( \d+)$/
    const match = fieldSetting.trim().match(re)

    if (!match) {
      throw new Error(
        `[ER1] Invalid params for FieldBoundary: '${fieldSetting}'`
      )
    }
    return { x: Number(match[1]), y: Number(match[2]) }
  }

  private setInitialPosition(initialPositionSetting: string): Position {
    const re = /^(\d+)( \d+)( [NESW])$/
    const match = initialPositionSetting
      .toUpperCase()
      .trim()
      .match(re)

    if (!match) {
      throw new Error(
        `[ER2] Invalid params for Position: '${initialPositionSetting}'`
      )
    }
    return {
      x: Number(match[1]),
      y: Number(match[2]),
      d: CardinalPoint[match[3].trim()]
    }
  }

  public navigate(commandBuffer: string): Position {
    const _commandBuffer = commandBuffer.toUpperCase().trim()
    const re = /^[LRM]+$/
    const match = _commandBuffer.match(re)

    if (!match) {
      throw new Error(`[ER3] Invalid navigate command: '${commandBuffer}'`)
    }

    _commandBuffer
      .split('')
      .map(c => this._spacecraft.navigate(c as 'L' | 'R' | 'M'))

    return this.getPosition()
  }
}
