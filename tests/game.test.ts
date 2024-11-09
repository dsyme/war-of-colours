import { Game, Player, Hex } from '../src/game';

describe('Game', () => {
  let game: Game;
  let player1: Player;
  let player2: Player;

  beforeEach(() => {
    player1 = new Player(1, 0xff0000, false);
    player2 = new Player(2, 0x0000ff, false);
    game = new Game(10, [player1, player2]);
  });

  test('should initialize the game with the correct map size and players', () => {
    expect(game.mapSize).toBe(10);
    expect(game.players).toHaveLength(2);
    expect(game.players[0]).toBe(player1);
    expect(game.players[1]).toBe(player2);
  });

  test('should get the correct hex based on row and col', () => {
    const hex = game.getHex(0, 0);
    expect(hex).toBeInstanceOf(Hex);
    expect(hex?.row).toBe(0);
    expect(hex?.col).toBe(0);
  });

  test('should return null for out-of-bounds hex coordinates', () => {
    const hex = game.getHex(-1, -1);
    expect(hex).toBeNull();
  });

  test('should allow a player to move units to a neighboring empty hex', () => {
    const hex = game.getHex(0, 0);
    const targetHex = game.getHex(0, 1);
    if (hex && targetHex) {
      hex.player = player1;
      hex.forces = 5;
      targetHex.isEmpty = true;

      player1.moveUnits(hex, targetHex);

      expect(hex.forces).toBe(1);
      expect(targetHex.forces).toBe(4);
      expect(targetHex.player).toBe(player1);
    }
  });

  test('should allow a player to attack a neighboring hex occupied by a different player', () => {
    const hex = game.getHex(0, 0);
    const targetHex = game.getHex(0, 1);
    if (hex && targetHex) {
      hex.player = player1;
      hex.forces = 5;
      targetHex.player = player2;
      targetHex.forces = 3;

      player1.attack(hex, targetHex);

      expect(hex.forces).toBeLessThanOrEqual(5);
      expect(targetHex.forces).toBeLessThanOrEqual(3);
      expect(targetHex.player).toBe(player1);
    }
  });

  test('should end the game when one player occupies the entire map', () => {
    for (let row = 0; row < game.mapSize; row++) {
      for (let col = 0; col < game.mapSize; col++) {
        const hex = game.getHex(row, col);
        if (hex) {
          hex.player = player1;
        }
      }
    }

    game.update();

    expect(game.players).toHaveLength(1);
    expect(game.players[0]).toBe(player1);
  });

  test('should allow a player to choose Peace or War with another player', () => {
    player1.chooseDiplomaticStatus(player2, 'Peace');
    expect(player1.diplomaticStatus.get(player2.id)).toBe('Peace');

    player1.chooseDiplomaticStatus(player2, 'War');
    expect(player1.diplomaticStatus.get(player2.id)).toBe('War');
  });

  test('should automatically set status to War if one player attacks another', () => {
    const hex = game.getHex(0, 0);
    const targetHex = game.getHex(0, 1);
    if (hex && targetHex) {
      hex.player = player1;
      hex.forces = 5;
      targetHex.player = player2;
      targetHex.forces = 3;

      player1.attack(hex, targetHex);

      expect(player1.diplomaticStatus.get(player2.id)).toBe('War');
    }
  });
});
