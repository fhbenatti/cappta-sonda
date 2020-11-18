import { CardinalPoint } from './CardinalPoint.enum'
import { FieldBoundary } from './FieldBoundary.interface'
import { Position } from './Position.interface'
import { Rotate } from './Rotate.enum'

type NavigateCommands = 'L' | 'R' | 'M'

export class Spacecraft {
  private readonly _fieldBoundary: FieldBoundary
  public get fieldBoundary(): FieldBoundary {
    return this._fieldBoundary
  }
  private readonly _position: Position
  public get position(): Position {
    return this._position
  }

  constructor(parameters: {
    fieldBoundary: FieldBoundary
    initialPosition: Position
  }) {
    this._fieldBoundary = parameters.fieldBoundary
    this._position = parameters.initialPosition
  }

  private rotate(command: Rotate) {
    const newDirection = this._position.d + command

    if (newDirection < CardinalPoint.N) this._position.d = CardinalPoint.W
    else if (newDirection > CardinalPoint.W) {
      this._position.d = CardinalPoint.N
    } else {
      this._position.d = newDirection
    }
  }

  public navigate(command: NavigateCommands) {
    if (['L', 'R'].some(c => c === command)) {
      this.rotate(Rotate[command])
    } else {
      // move
    }
  }
}
