export function getRandomInteger(a: number, b?: number): number {
  const [from, to] = (b === undefined) ? [0, a] : [a, b];
  return from + Math.floor((Math.random() * (to - from + 1)));
}
