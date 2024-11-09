import { AIPlayer } from '../src/aiPlayer';
import { Game, Player, Hex } from '../src/game';

describe('AIPlayer', () => {
  let game: Game;
  let aiPlayer: AIPlayer;
  let player1: Player;

  beforeEach(() => {
    player1 = new Player(1, 0xff0000, false);
    aiPlayer = new AIPlayer(2, 0x0000ff);
    game = new Game(10, [player1, aiPlayer]);
  });

  test('should move units to neighboring empty hexes', () => {
    const hex = game.getHex(0, 0);
    const targetHex = game.getHex(0, 1);
    if (hex && targetHex) {
      hex.player = aiPlayer;
      hex.forces = 5;
      targetHex.isEmpty = true;

      aiPlayer.moveUnits(game);

      expect(hex.forces).toBe(1);
      expect(targetHex.forces).toBe(4);
      expect(targetHex.player).toBe(aiPlayer);
    }
  });

  test('should attack the weakest neighboring hex', () => {
    const hex = game.getHex(0, 0);
    const targetHex = game.getHex(0, 1);
    if (hex && targetHex) {
      hex.player = aiPlayer;
      hex.forces = 5;
      targetHex.player = player1;
      targetHex.forces = 3;

      aiPlayer.moveUnits(game);

      expect(hex.forces).toBeLessThanOrEqual(5);
      expect(targetHex.forces).toBeLessThanOrEqual(3);
      expect(targetHex.player).toBe(aiPlayer);
    }
  });

  test('should distribute forces according to the number of enemy units in adjacent hexes', () => {
    const hex1 = game.getHex(0, 0);
    const hex2 = game.getHex(0, 1);
    const hex3 = game.getHex(0, 2);
    if (hex1 && hex2 && hex3) {
      hex1.player = aiPlayer;
      hex1.forces = 1;
      hex2.player = player1;
      hex2.forces = 3;
      hex3.player = aiPlayer;
      hex3.forces = 1;

      aiPlayer.forces = 2;
      aiPlayer.distributeForces(game.hexes);

      expect(hex1.forces).toBe(2);
      expect(hex3.forces).toBe(2);
    }
  });

  test('should not attack players they are at peace with unless there are no other options', () => {
    const hex = game.getHex(0, 0);
    const targetHex = game.getHex(0, 1);
    if (hex && targetHex) {
      hex.player = aiPlayer;
      hex.forces = 5;
      targetHex.player = player1;
      targetHex.forces = 3;
      aiPlayer.diplomaticStatus.set(player1.id, 'Peace');

      aiPlayer.moveUnits(game);

      expect(hex.forces).toBe(5);
      expect(targetHex.forces).toBe(3);
      expect(targetHex.player).toBe(player1);
    }
  });

  test('should always choose war with the strongest player on the board', () => {
    const player2 = new Player(3, 0x00ff00, false);
    game.players.push(player2);

    const hex1 = game.getHex(0, 0);
    const hex2 = game.getHex(0, 1);
    const hex3 = game.getHex(0, 2);
    if (hex1 && hex2 && hex3) {
      hex1.player = aiPlayer;
      hex1.forces = 1;
      hex2.player = player1;
      hex2.forces = 3;
      hex3.player = player2;
      hex3.forces = 5;

      aiPlayer.chooseDiplomaticStatus(game);

      expect(aiPlayer.diplomaticStatus.get(player1.id)).toBe('Peace');
      expect(aiPlayer.diplomaticStatus.get(player2.id)).toBe('War');
    }
  });
});
