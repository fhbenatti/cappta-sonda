# Sonda CLI

Controle de exploração de sondas em marte

## Descrição

Aplicação em Node.js do tipo CLI baseada na lib Gluegun: https://github.com/infinitered/gluegun

## Estrutura de diretórios

```bash
.
├── __tests__  # Arquivos de teste
├── bin        # Executável de linha de comando da aplicação
├── src        # Fontes
    ├── commands
        ├── sonda.ts # Entrypoint da aplicação que receberá os comandos do usuário
    ├── SpacecraftModule  # Módulo da sonda
    ├── MissionManager    # Interpretador dos comandos que serão repassados à sonda (configuração e deslocamento)
```

## Pré-Requisitos

Node.js: https://nodejs.org/en/download/

## Testes

Execute:

```shell
$ npm run test
```

## Execução

Para iniciar uma missão de exploração, execute:

```shell
$ ./bin/sonda
```

## Operação

Após a execução do comando acima, informe os seguintes comandos para prosseguir com a missão da primeira sonda:

### Coordenadas limites da operação

Informe 2 valores numéricos separados por espaço para determinar os limites dos eixos ('x' e 'y') do campo de exploração:

Formato: `[0..n] [0..n]`

Ex: `5 5`

### Posição inicial da sonda

Informe o comando que vai determinar a posição inicial da sonda:

Formato:

```
[0..n] [0..n] [N|E|S|W]
  (1)    (2)      (3)
```

(1) Determina a posição da sonda no eixo y no campo de exploração\
(2) Determina a posição da sonda no eixo y no campo de exploração\
(3) Determina a direção para qual a sonda aponta

Ex: `0 0 N`

Se as posições iniciais da sonda (x,y) excederem os limites do campo de exploração, a posição assumida será a dos limites máximos (x,y) do campo de exploração configurado no passo anterior.

### Navegação

Informe o comando para executar a movimentação da sonda ao longo dos limites do campo de exploração:

```v
[L|R|M][, ...]
```

(L) Rotaciona a sonda 90° para a esquerda\
(R) Rotaciona a sonda 90° para a direita\
(M) Faz o deslocamento da sonda em direção ao ponto cardeal atual que ela aponta

Ex: `RMRMLM`

### Próxima sonda

Digite 'ENTER' para fazer o lançamento da próxima sonda ou 'ESC' para abortar
