export function wait(delay: number): Promise<void> {
  return new Promise(done => setTimeout(() => done(), delay));
}
