import { atom, selector } from 'recoil';

export const isCorrectState = atom({
  key: 'isCorrect',
  default: false,
});

export const isWrongState = atom({
  key: 'isWrong',
  default: false,
});

export const result = selector({
  key: 'result',
  get: ({ get }) => ({
    isCorrect: get(isCorrectState),
    isWrong: get(isWrongState),
  }),
});
