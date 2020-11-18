import { FieldBoundary } from './FieldBoundary.enum'
import { SpacecraftPosition } from './SpacecraftPosition.enum'

export class Spacecraft {
  private readonly fieldBoundary: FieldBoundary
  private readonly position: SpacecraftPosition

  constructor(parameters: {
    fieldBoundary: FieldBoundary
    initialPosition: SpacecraftPosition
  }) {
    this.fieldBoundary = parameters.fieldBoundary
    this.position = parameters.initialPosition
  }
}
