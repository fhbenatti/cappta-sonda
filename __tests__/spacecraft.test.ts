import { Spacecraft, CardinalPoint } from '../src/SpacecraftModule/index'

describe('Test rotate commands', () => {
  let spacecraft: Spacecraft

  beforeEach(() => {
    spacecraft = new Spacecraft({
      fieldBoundary: { x: 10, y: 10 },
      initialPosition: { x: 0, y: 0, d: CardinalPoint.N }
    })
  })

  it('should change direction to E', async () => {
    spacecraft.navigate('R')
    const position = spacecraft.position
    expect(position.d).toEqual(CardinalPoint.E)
  })

  it('should change direction to W', async () => {
    spacecraft.navigate('L')
    const position = spacecraft.position
    expect(position.d).toEqual(CardinalPoint.W)
  })
})
