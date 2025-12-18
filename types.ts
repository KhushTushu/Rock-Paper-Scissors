
export type Choice = 'ROCK' | 'PAPER' | 'SCISSORS' | null;

export type GameResult = 'WIN' | 'LOSE' | 'DRAW' | null;

export interface GameState {
  playerChoice: Choice;
  computerChoice: Choice;
  result: GameResult;
  playerScore: number;
  computerScore: number;
  isProcessing: boolean;
  taunt: string;
}

export interface TauntData {
  text: string;
}
