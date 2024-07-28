import { getRandomInteger } from '@/common/functions';
import { ChallengeType, EnemyDifficulty, GameEvent, GameEventType } from './types';

export function generateGameEvent(_seed?: number): GameEvent | null {

  const seed = _seed ?? getRandomInteger(1, 100);
  const enemy = createEnemyEvents();
  const challenge = createChallengeEvents();

  const npc = () => ({ id: eventId(), type: GameEventType.NonPlayingCharacter });
  const energySource = () => ({ id: eventId(), type: GameEventType.VoidEnergySource });

  if (seed <= 5) return null;
  if (seed <= 15) return enemy.easy();
  if (seed <= 20) return challenge.agility();
  if (seed <= 30) return enemy.easy();
  if (seed <= 35) return challenge.strength();
  if (seed <= 45) return enemy.easy();
  if (seed <= 50) return npc();
  if (seed <= 60) return enemy.easy();
  if (seed <= 80) return enemy.medium();
  if (seed <= 85) return challenge.presence();
  if (seed <= 90) return enemy.medium();
  if (seed <= 95) return energySource();
  if (seed <= 100) return enemy.hard();

  return null;
}

function eventId(): string {
  return String(Date.now());
}

function createEnemyEvents() {

  function createEvent(difficulty: EnemyDifficulty) {
    const id = eventId();
    return { id, type: GameEventType.Enemy, difficulty };
  }

  return {
    easy: () => createEvent(EnemyDifficulty.Easy),
    medium: () => createEvent(EnemyDifficulty.Medium),
    hard: () => createEvent(EnemyDifficulty.Hard),
  };
}

function createChallengeEvents() {

  function createEvent(challengeType: ChallengeType) {
    const id = eventId();
    return { id, type: GameEventType.Challenge, challengeType };
  }

  return {
    agility: () => createEvent(ChallengeType.Agility),
    strength: () => createEvent(ChallengeType.Strength),
    presence: () => createEvent(ChallengeType.Presence),
  };
}
