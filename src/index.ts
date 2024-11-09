import * as PIXI from 'pixi.js';
import { initializeStartScreen } from './startScreen';
import { initializeRenderer } from './renderer';
import { Game } from './game';

const app = new PIXI.Application({ width: 800, height: 600 });
document.body.appendChild(app.view);

initializeStartScreen(app);
initializeRenderer(app);

const game = new Game();
game.start();

app.ticker.add(() => {
  game.update();
});
