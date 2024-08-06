import { wait } from '../functions';
import { GameSeq } from './gameseq';

export function gameSeqExample(): () => void {

  console.log('gameSeqExample');

  // Declare event names
  enum MyGameEventName {
    TriesAttacking = 'triesAttacking',
    Misses = 'misses',
    Hits = 'hits',
  }

  // Init the game
  const rootElement = document.body;
  const game = new GameSeq<MyGameEventName>(rootElement);

  // Declare event creators
  const triesAttacking = game.event(MyGameEventName.TriesAttacking);
  const misses = game.event(MyGameEventName.Misses);
  const hits = game.eventWithPayload<number>(MyGameEventName.Hits);

  // Declare event handlers
  game.on(MyGameEventName.TriesAttacking, async (_, trigger) => {
    console.log('You are trying to hit the target');
    const nextEvent = Math.random() >= 0.8 ? misses() : hits(2);
    await wait(1_000);
    trigger(nextEvent);
  });

  game.on(MyGameEventName.Misses, () => {
    console.log('You missed the target');
  });

  game.on(MyGameEventName.Hits, (event) => {
    const damage = event.payload; // TODO: Type this!
    console.log(`You hit the target for ${damage} damage!`);
  });

  // Register all handlers on the root element
  game.init();

  // Play the game
  game.trigger(triesAttacking());
  game.trigger(triesAttacking()); // This is enqueued

  // This is debounced since the queue is busy
  game.trigger(triesAttacking(), { debounced: true });

  setTimeout(() => {
    // This is not debounced as the queue is clear
    game.trigger(triesAttacking(), { debounced: true });
  }, 1_100);

  // Destroy the game when you're done
  return () => game.destroy();
}
