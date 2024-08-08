import { computed, signal } from '@angular/core';

export enum LoaderState {
  Pristine = 'pristine',
  Loading = 'loading',
  Idle = 'idle',
}

export function withLoader() {
  const state = signal<LoaderState>(LoaderState.Pristine);

  return {
    state: state.asReadonly(),
    loading: computed(() => state() === LoaderState.Loading),
    loaded: computed(() => state() === LoaderState.Idle),
    start: () => state.set(LoaderState.Loading),
    stop: () => state.set(LoaderState.Idle),
  };
}