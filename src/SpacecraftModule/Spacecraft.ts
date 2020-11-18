import { FieldBoundary } from './FieldBoundary.interface'
import { Position } from './Position.interface'

export class Spacecraft {
  private readonly fieldBoundary: FieldBoundary
  private readonly position: Position

  constructor(parameters: {
    fieldBoundary: FieldBoundary
    initialPosition: Position
  }) {
    this.fieldBoundary = parameters.fieldBoundary
    this.position = parameters.initialPosition
  }
}
