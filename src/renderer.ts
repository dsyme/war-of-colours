import * as PIXI from 'pixi.js';
import { Game, Hex } from './game';

export function initializeRenderer(app: PIXI.Application, game: Game) {
  const gameContainer = new PIXI.Container();
  app.stage.addChild(gameContainer);

  const hexSize = 30;
  const hexWidth = Math.sqrt(3) * hexSize;
  const hexHeight = 2 * hexSize;

  function drawHex(x: number, y: number, color: number) {
    const hex = new PIXI.Graphics();
    hex.beginFill(color);
    hex.lineStyle(1, 0x000000);
    hex.moveTo(hexSize, 0);
    for (let i = 1; i <= 6; i++) {
      const angle = (i * Math.PI) / 3;
      hex.lineTo(hexSize * Math.cos(angle), hexSize * Math.sin(angle));
    }
    hex.endFill();
    hex.x = x;
    hex.y = y;
    gameContainer.addChild(hex);
  }

  function renderGrid() {
    gameContainer.removeChildren();
    for (let row = 0; row < game.mapSize; row++) {
      for (let col = 0; col < game.mapSize; col++) {
        const hex = game.getHex(row, col);
        if (hex) {
          const x = col * hexWidth + (row % 2) * (hexWidth / 2);
          const y = row * (hexHeight * 0.75);
          let color;
          if (hex.isInaccessible) {
            color = 0x333333;
          } else if (hex.isEmpty) {
            color = 0xffffff;
          } else {
            color = hex.player.color;
          }
          drawHex(x, y, color);
        }
      }
    }
  }

  function updateGameState() {
    renderGrid();
  }

  app.ticker.add(updateGameState);

  game.onStateChange(updateGameState);
}
