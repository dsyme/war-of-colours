import { Player, Hex, Game } from './game';

export class AIPlayer extends Player {
  constructor(id: number, color: number) {
    super(id, color, true);
  }

  takeTurn(game: Game) {
    this.moveUnits(game);
    this.distributeForces(game.hexes);
    this.chooseDiplomaticStatus(game);
  }

  moveUnits(game: Game) {
    let moved = true;
    while (moved) {
      moved = false;
      for (let row = 0; row < game.mapSize; row++) {
        for (let col = 0; col < game.mapSize; col++) {
          const hex = game.getHex(row, col);
          if (hex && hex.player === this && hex.forces > 1) {
            const targetHex = this.findBestMove(hex, game);
            if (targetHex) {
              this.moveUnits(hex, targetHex);
              moved = true;
            }
          }
        }
      }
    }
  }

  findBestMove(hex: Hex, game: Game): Hex | null {
    const neighbors = this.getNeighbors(hex, game);
    let bestMove: Hex | null = null;
    let minForces = Infinity;

    for (const neighbor of neighbors) {
      if (neighbor.isEmpty && neighbor.forces < minForces) {
        bestMove = neighbor;
        minForces = neighbor.forces;
      } else if (neighbor.player && neighbor.player !== this && neighbor.forces < minForces) {
        bestMove = neighbor;
        minForces = neighbor.forces;
      }
    }

    return bestMove;
  }

  getNeighbors(hex: Hex, game: Game): Hex[] {
    const directions = [
      [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0]
    ];
    const neighbors: Hex[] = [];

    for (const [dRow, dCol] of directions) {
      const neighbor = game.getHex(hex.row + dRow, hex.col + dCol);
      if (neighbor) {
        neighbors.push(neighbor);
      }
    }

    return neighbors;
  }

  distributeForces(hexes: Hex[][]) {
    const myHexes = hexes.flat().filter(hex => hex.player === this);
    myHexes.sort((a, b) => this.getEnemyForces(b) - this.getEnemyForces(a));

    for (const hex of myHexes) {
      if (this.forces > 0) {
        hex.forces++;
        this.forces--;
      }
    }
  }

  getEnemyForces(hex: Hex): number {
    const neighbors = this.getNeighbors(hex, game);
    return neighbors.reduce((sum, neighbor) => {
      if (neighbor.player && neighbor.player !== this) {
        return sum + neighbor.forces;
      }
      return sum;
    }, 0);
  }

  chooseDiplomaticStatus(game: Game) {
    const strongestPlayer = this.findStrongestPlayer(game);
    for (const player of game.players) {
      if (player !== this) {
        if (player === strongestPlayer) {
          this.diplomaticStatus.set(player.id, 'War');
        } else {
          this.diplomaticStatus.set(player.id, 'Peace');
        }
      }
    }
  }

  findStrongestPlayer(game: Game): Player {
    let strongestPlayer: Player = this;
    let maxForces = 0;

    for (const player of game.players) {
      if (player !== this) {
        const playerForces = game.hexes.flat().reduce((sum, hex) => {
          if (hex.player === player) {
            return sum + hex.forces;
          }
          return sum;
        }, 0);

        if (playerForces > maxForces) {
          strongestPlayer = player;
          maxForces = playerForces;
        }
      }
    }

    return strongestPlayer;
  }
}
