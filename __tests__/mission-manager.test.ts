import { MissionManager } from '../src/MissionManager'

describe('Test MissionManager', () => {
  describe('Test configuration params', () => {
    it('should return a MissionManager object', async () => {
      const missionManager = new MissionManager('5 5', '2 2 N')
      expect(missionManager).toBeInstanceOf(MissionManager)
    })

    it('should throws Errors', async () => {
      expect(() => new MissionManager('A 5', '2 2 N')).toThrow(Error)
      expect(() => new MissionManager('5 A', '2 2 N')).toThrow(Error)
      expect(() => new MissionManager('55', '2 2 N')).toThrow(Error)
      expect(() => new MissionManager('5 5', '2 2 H')).toThrow(Error)
      expect(() => new MissionManager('5 5', '22 H')).toThrow(Error)
      expect(() => new MissionManager('5 5', '  H')).toThrow(Error)
    })
  })

  describe('Test navigation', () => {
    it('should return a spacecraft at position 1 1 1(E)', async () => {
      const missionManager = new MissionManager('5 5', '0 0 N')
      missionManager.navigate('MRM')
      expect(missionManager.getPosition()).toEqual({ x: 1, y: 1, d: 1 })
    })

    it('should return a spacecraft at position 5 3 2(S)', async () => {
      const missionManager = new MissionManager('5 5', '7 7 S')
      missionManager.navigate('MM')
      expect(missionManager.getPosition()).toEqual({ x: 5, y: 3, d: 2 })
    })
  })
})
