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

  it('should change direction to N', async () => {
    spacecraft.navigate('L')
    spacecraft.navigate('R')
    const position = spacecraft.position
    expect(position.d).toEqual(CardinalPoint.N)
  })
})

describe('Test move commands', () => {
  let spacecraft: Spacecraft

  beforeEach(() => {
    spacecraft = new Spacecraft({
      fieldBoundary: { x: 10, y: 10 },
      initialPosition: { x: 0, y: 0, d: CardinalPoint.N }
    })
  })

  it('should move to y = 1', async () => {
    spacecraft.navigate('M')
    const position = spacecraft.position
    expect(position.y).toEqual(1)
  })

  it('should move to x = 1', async () => {
    spacecraft.navigate('R')
    spacecraft.navigate('M')
    const position = spacecraft.position
    expect(position.x).toEqual(1)
  })

  it('should move to y = 1', async () => {
    spacecraft.navigate('M')
    spacecraft.navigate('M')
    spacecraft.navigate('R')
    spacecraft.navigate('R')
    spacecraft.navigate('M')
    const position = spacecraft.position
    expect(position.y).toEqual(1)
  })

  it('should move to x = 1', async () => {
    spacecraft.navigate('R')
    spacecraft.navigate('M')
    spacecraft.navigate('M')
    spacecraft.navigate('L')
    spacecraft.navigate('L')
    spacecraft.navigate('M')
    const position = spacecraft.position
    expect(position.x).toEqual(1)
  })
})
