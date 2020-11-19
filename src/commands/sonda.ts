import { GluegunCommand } from 'gluegun'
import { MissionManager } from '../MissionManager'
import { CardinalPoint } from '../SpacecraftModule'

const command: GluegunCommand = {
  name: 'sonda',
  run: async toolbox => {
    const { print } = toolbox
    let spacecraftId = 1

    print.info('Seja bem-vindo à missão de exploração!')

    const askFieldBoundary = {
      type: 'input',
      name: 'fieldBoundary',
      message: 'Informe as coordenadas limites da exploração: (Ex: 5 5)'
    }
    const { fieldBoundary } = await toolbox.prompt.ask(askFieldBoundary)

    while (true) {
      print.divider()
      print.fancy(`SONDA NRO ${spacecraftId}`)
      print.divider()

      const askInitialPosition = {
        type: 'input',
        name: 'initialPosition',
        message: 'Informe a posição inicial da sonda: (Ex: 2 2 N)'
      }
      const askNavigateCommand = {
        type: 'input',
        name: 'navigateCommandBuffer',
        message: 'Informe o comando de navegação da sonda: (Ex: MMRMM)'
      }
      const askContinue = {
        type: 'input',
        name: 'continue',
        message: 'Enter: Próx. Sonda | ESC: Abortar'
      }

      const { initialPosition } = await toolbox.prompt.ask(askInitialPosition)
      const { navigateCommandBuffer } = await toolbox.prompt.ask(
        askNavigateCommand
      )

      const missionManager = new MissionManager(fieldBoundary, initialPosition)
      const spacecraftPosition = missionManager.navigate(navigateCommandBuffer)

      print.newline()
      print.success(
        `Posição Final: ${spacecraftPosition.x} ${spacecraftPosition.y} ${
          CardinalPoint[spacecraftPosition.d]
        }`
      )
      print.newline()
      await toolbox.prompt.ask(askContinue)
      print.newline()
      spacecraftId++
    }
  }
}

module.exports = command
