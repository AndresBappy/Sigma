import { atom } from 'jotai';

import { User } from 'interfaces/user/profile';
import { getProfile } from 'services/user/profile';

export const userAtom = atom(async (get) => {
  const data = await getProfile();
  const user: User = data;
  return user;
});
