import { InputPromisesQueueItem, PromisesQueueItem } from './types';

export function mapToPromisesQueueItem(
  actionOrMessage: InputPromisesQueueItem | InputPromisesQueueItem['message'],
  inputFn?: InputPromisesQueueItem['fn'],
): PromisesQueueItem {

  const isFirstArgString = typeof actionOrMessage === 'string';
  const isInputFn = !!inputFn;

  if (isFirstArgString && isInputFn) {
    return {
      message: actionOrMessage,
      fn: () => Promise.resolve(inputFn()),
    };
  }

  if (!isFirstArgString && !isInputFn) {
    return {
      message: actionOrMessage.message,
      fn: () => Promise.resolve(actionOrMessage.fn()),
    };
  }

  throw new Error('Invalid input');
}

export function createPromisesQueueItem<T = any>(
  message: string,
  fn: () => Promise<T>,
) {
  return { message, fn };
}
