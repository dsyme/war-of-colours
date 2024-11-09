import * as PIXI from 'pixi.js';

export function initializeStartScreen(app: PIXI.Application) {
  const startScreenContainer = new PIXI.Container();
  app.stage.addChild(startScreenContainer);

  const title = new PIXI.Text('War of Colours', { fontSize: 36, fill: 0xffffff });
  title.anchor.set(0.5);
  title.x = app.view.width / 2;
  title.y = 100;
  startScreenContainer.addChild(title);

  const playerLabel = new PIXI.Text('Number of Players:', { fontSize: 24, fill: 0xffffff });
  playerLabel.anchor.set(0.5);
  playerLabel.x = app.view.width / 2;
  playerLabel.y = 200;
  startScreenContainer.addChild(playerLabel);

  const playerInput = new PIXI.TextInput({ input: { fontSize: '24px', padding: '12px', width: '200px' }, box: { fill: 0x000000, rounded: 16, stroke: { color: 0xffffff, width: 2 } } });
  playerInput.x = app.view.width / 2 - 100;
  playerInput.y = 250;
  startScreenContainer.addChild(playerInput);

  const mapSizeLabel = new PIXI.Text('Map Size:', { fontSize: 24, fill: 0xffffff });
  mapSizeLabel.anchor.set(0.5);
  mapSizeLabel.x = app.view.width / 2;
  mapSizeLabel.y = 350;
  startScreenContainer.addChild(mapSizeLabel);

  const mapSizeInput = new PIXI.TextInput({ input: { fontSize: '24px', padding: '12px', width: '200px' }, box: { fill: 0x000000, rounded: 16, stroke: { color: 0xffffff, width: 2 } } });
  mapSizeInput.x = app.view.width / 2 - 100;
  mapSizeInput.y = 400;
  startScreenContainer.addChild(mapSizeInput);

  const startButton = new PIXI.Text('Start Game', { fontSize: 24, fill: 0xffffff });
  startButton.anchor.set(0.5);
  startButton.x = app.view.width / 2;
  startButton.y = 500;
  startButton.interactive = true;
  startButton.buttonMode = true;
  startScreenContainer.addChild(startButton);

  startButton.on('pointerdown', () => {
    const numPlayers = parseInt(playerInput.text, 10);
    const mapSize = parseInt(mapSizeInput.text, 10);
    if (isNaN(numPlayers) || isNaN(mapSize)) {
      alert('Please enter valid numbers for players and map size.');
      return;
    }
    startScreenContainer.visible = false;
    app.stage.removeChild(startScreenContainer);
    startGame(numPlayers, mapSize);
  });
}

function startGame(numPlayers: number, mapSize: number) {
  // Placeholder function to start the game
  console.log(`Starting game with ${numPlayers} players and map size ${mapSize}`);
}
