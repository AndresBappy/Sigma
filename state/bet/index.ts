import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

import { Bet } from 'interfaces/bet';
import { getBets } from 'services/bets/getBets';

export const pageAtom = atom(0);

export const betsAtom = atom(async (get) => {
  const page = get(pageAtom);
  console.log(page);
  const data = await getBets();
  const bets: Bet[] = data.bets;
  const results = bets.map((bet) => {
    return {
      ...bet,
      background: bet.background || 'default',
      type: !bet.background ? 'plain' : 'image',
      color: !bet.background ? 'gray' : 'default',
    };
  });
  return results as Bet[];
});

export const currentBetAtom = atomWithReset<Bet>({} as Bet);
