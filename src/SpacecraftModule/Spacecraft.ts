import { FieldBoundary } from './FieldBoundary.interface'
import { SpacecraftPosition } from './SpacecraftPosition.interface'

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
