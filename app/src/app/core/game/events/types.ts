export enum GameEventType {
  Rest,
  Enemy,
  Challenge,
  NonPlayingCharacter,
  VoidEnergySource,
}

export type BaseGameEvent = {
  id: string;
  type: GameEventType;
};

export enum EnemyDifficulty {
  Easy = 0,
  Medium = 1,
  Hard = 2,
}

export type EnemyGameEvent = BaseGameEvent & {
  type: GameEventType.Enemy;
  difficulty: EnemyDifficulty;
};

export enum ChallengeType {
  Agility = 'agility',
  Strength = 'strength',
  Presence = 'presence',
}

export type ChallengeGameEvent = BaseGameEvent & {
  type: GameEventType.Challenge;
  challengeType: ChallengeType;
};

export type RestGameEvent = BaseGameEvent;
export type MeetingGameEvent = BaseGameEvent;
export type EnergySourceGameEvent = BaseGameEvent;

export type GameEvent = (
  | RestGameEvent
  | EnemyGameEvent
  | ChallengeGameEvent
  | MeetingGameEvent
  | EnergySourceGameEvent
);
