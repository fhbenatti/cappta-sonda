import { Spacecraft, CardinalPoint } from '../src/SpacecraftModule/index'

describe('Test Spacecraft', () => {
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
        fieldBoundary: { x: 2, y: 2 },
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

    it(`should keep maximum value for 'y' if it exceeds the boundary`, async () => {
      spacecraft.navigate('M')
      spacecraft.navigate('M')
      spacecraft.navigate('M')
      const positionN = spacecraft.position.y
      spacecraft.navigate('R')
      spacecraft.navigate('R')
      spacecraft.navigate('M')
      spacecraft.navigate('M')
      spacecraft.navigate('M')
      const positionS = spacecraft.position.y
      expect({ n: positionN, s: positionS }).toEqual({ n: 2, s: 0 })
    })

    it(`should keep maximum value for 'x' if it exceeds the boundary`, async () => {
      spacecraft.navigate('L')
      spacecraft.navigate('M')
      const positionW = spacecraft.position.x
      spacecraft.navigate('R')
      spacecraft.navigate('R')
      spacecraft.navigate('M')
      spacecraft.navigate('M')
      spacecraft.navigate('M')
      const positionE = spacecraft.position.x
      expect({ w: positionW, e: positionE }).toEqual({
        w: 0,
        e: 2
      })
    })
  })

  describe('Test new instances of Spacecraft', () => {
    it('should set field boundaries to 0,0 when negative', async () => {
      const spacecraft = new Spacecraft({
        fieldBoundary: { x: -1, y: -1 },
        initialPosition: { x: 0, y: 0, d: CardinalPoint.N }
      })

      expect({
        x: spacecraft.fieldBoundary.x,
        y: spacecraft.fieldBoundary.y
      }).toEqual({ x: 0, y: 0 })
    })

    it('should set inital position at boundaries of exploring field', async () => {
      const boundaries = { x: 5, y: 5 }

      const spacecraft = new Spacecraft({
        fieldBoundary: boundaries,
        initialPosition: { x: 10, y: 10, d: CardinalPoint.N }
      })

      expect({
        x: spacecraft.position.x,
        y: spacecraft.position.y
      }).toEqual(boundaries)
    })
  })
})
