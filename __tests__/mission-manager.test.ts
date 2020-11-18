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
})
