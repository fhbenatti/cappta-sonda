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
    this._fieldBoundary = {
      x: parameters.fieldBoundary.x < 0 ? 0 : parameters.fieldBoundary.x,
      y: parameters.fieldBoundary.y < 0 ? 0 : parameters.fieldBoundary.y
    }

    this._position = {
      x:
        parameters.initialPosition.x > parameters.fieldBoundary.x
          ? parameters.fieldBoundary.x
          : parameters.initialPosition.x,
      y:
        parameters.initialPosition.y > parameters.fieldBoundary.x
          ? parameters.fieldBoundary.y
          : parameters.initialPosition.y,
      d: parameters.initialPosition.d
    }
  }

  private rotate(command: Rotate) {
    const newDirection = this._position.d + command

    if (newDirection < CardinalPoint.N) this._position.d = CardinalPoint.W
    else if (newDirection > CardinalPoint.W) this._position.d = CardinalPoint.N
    else this._position.d = newDirection
  }

  private move(axis: 'x' | 'y', value: number) {
    const currentPosition = this._position[axis]
    const newPosition = this._position[axis] + value
    this._position[axis] =
      newPosition < 0 || newPosition > this._fieldBoundary[axis]
        ? currentPosition
        : newPosition
  }

  private cardinalMove = {
    N: () => this.move('y', 1),
    E: () => this.move('x', 1),
    S: () => this.move('y', -1),
    W: () => this.move('x', -1)
  }

  public navigate(command: NavigateCommands) {
    if (['L', 'R'].some(c => c === command)) {
      this.rotate(Rotate[command])
    } else {
      this.cardinalMove[CardinalPoint[this._position.d]]()
    }
  }
}
