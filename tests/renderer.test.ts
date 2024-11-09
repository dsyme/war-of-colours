import * as PIXI from 'pixi.js';
import { initializeRenderer } from '../src/renderer';
import { Game, Hex, Player } from '../src/game';

describe('Renderer', () => {
  let app: PIXI.Application;
  let game: Game;
  let player1: Player;
  let player2: Player;

  beforeEach(() => {
    app = new PIXI.Application({ width: 800, height: 600 });
    document.body.appendChild(app.view);
    player1 = new Player(1, 0xff0000, false);
    player2 = new Player(2, 0x0000ff, false);
    game = new Game(10, [player1, player2]);
    initializeRenderer(app, game);
  });

  afterEach(() => {
    app.destroy(true, { children: true });
    document.body.removeChild(app.view);
  });

  it('should render the hexagonal grid', () => {
    const hexes = app.stage.children[0].children;
    expect(hexes.length).toBe(100);
  });

  it('should render the game state correctly', () => {
    const hex = game.getHex(0, 0);
    if (hex) {
      hex.isEmpty = false;
      hex.player = player1;
    }
    game.onStateChange();
    const renderedHex = app.stage.children[0].children[0] as PIXI.Graphics;
    expect(renderedHex.tint).toBe(0xff0000);
  });

  it('should render the diplomatic status correctly', () => {
    player1.chooseDiplomaticStatus(player2, 'Peace');
    game.onStateChange();
    const hex = game.getHex(0, 0);
    if (hex) {
      hex.isEmpty = false;
      hex.player = player1;
    }
    const targetHex = game.getHex(0, 1);
    if (targetHex) {
      targetHex.isEmpty = false;
      targetHex.player = player2;
    }
    game.onStateChange();
    const renderedHex = app.stage.children[0].children[0] as PIXI.Graphics;
    const renderedTargetHex = app.stage.children[0].children[1] as PIXI.Graphics;
    expect(renderedHex.tint).toBe(0xff0000);
    expect(renderedTargetHex.tint).toBe(0x0000ff);
  });
});
