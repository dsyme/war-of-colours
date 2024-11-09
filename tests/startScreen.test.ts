import * as PIXI from 'pixi.js';
import { initializeStartScreen } from '../src/startScreen';

describe('StartScreen', () => {
  let app: PIXI.Application;

  beforeEach(() => {
    app = new PIXI.Application({ width: 800, height: 600 });
    document.body.appendChild(app.view);
    initializeStartScreen(app);
  });

  afterEach(() => {
    app.destroy(true, { children: true });
    document.body.removeChild(app.view);
  });

  it('should display the title', () => {
    const title = app.stage.children.find(child => child instanceof PIXI.Text && child.text === 'War of Colours');
    expect(title).toBeDefined();
  });

  it('should display the player input field', () => {
    const playerInput = app.stage.children.find(child => child instanceof PIXI.TextInput && child.placeholder === 'Number of Players');
    expect(playerInput).toBeDefined();
  });

  it('should display the map size input field', () => {
    const mapSizeInput = app.stage.children.find(child => child instanceof PIXI.TextInput && child.placeholder === 'Map Size');
    expect(mapSizeInput).toBeDefined();
  });

  it('should display the start button', () => {
    const startButton = app.stage.children.find(child => child instanceof PIXI.Text && child.text === 'Start Game');
    expect(startButton).toBeDefined();
  });

  it('should start the game when the start button is clicked', () => {
    const startButton = app.stage.children.find(child => child instanceof PIXI.Text && child.text === 'Start Game');
    if (startButton) {
      startButton.emit('pointerdown');
      expect(app.stage.children.find(child => child instanceof PIXI.Container && child.visible === false)).toBeDefined();
    }
  });
});
