import { gameSeqEventsCreator } from '@/common/gameseq';

export enum KogEvent {
  PlayerChoosesName = 'playerChoosesName',
  PlayerAttacks = 'playerAttacks',
  PlayerHits = 'playerHits',
  PlayerMisses = 'playerMisses',
  PlayerDies = 'playerDies',

  EnemyAttacks = 'enemyAttacks',
  EnemyHits = 'enemyHits',
  EnemyMisses = 'enemyMisses',
  EnemyDies = 'enemyDies',

  GoToWelcomePage = 'goToWelcomePage',
  GoToFightPage = 'goToFightPage',
}

const event = gameSeqEventsCreator<KogEvent>();

export const playerEvent = {
  choosesName: (username: string) => event.payload(KogEvent.PlayerChoosesName, { username }),
  attacks: () => event.plain(KogEvent.PlayerAttacks),
  hits: (damage: number) => event.payload(KogEvent.PlayerHits, { damage }),
  misses: () => event.plain(KogEvent.PlayerMisses),
  dies: () => event.plain(KogEvent.PlayerDies),
};

export const enemyEvent = {
  attacks: () => event.plain(KogEvent.EnemyAttacks),
  hits: (damage: number) => event.payload(KogEvent.EnemyHits, { damage }),
  misses: () => event.plain(KogEvent.EnemyMisses),
  dies: () => event.plain(KogEvent.EnemyDies),
};

export const pageEvent = {
  welcome: () => event.plain(KogEvent.GoToWelcomePage),
  fight: () => event.plain(KogEvent.GoToFightPage),
};
