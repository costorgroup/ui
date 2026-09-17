import { TAnimatedPlayMode } from './types';

export const useAnimatedPlay = (play: TAnimatedPlayMode = 'hover') => ({
  rootProps: {
    'data-play': play,
  },
});
