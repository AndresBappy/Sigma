import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';

import Navigation from 'components/elements/Navigation';
import NextButton from 'components/elements/NextButton';
import ProfileTitle from 'components/elements/ProfileTitle';
import { userAtom } from 'state/user';

type Props = {};

const Settings: React.FC<Props> = (props: Props) => {
  const [user] = useAtom(userAtom);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div>
        <ProfileTitle />
      </div>
    );
  }

  return (
    <div>
      <ProfileTitle />
      <div className="flex gap-4 mt-4">
        <div className="flex flex-[1_1_50%] bg-white text-gray-text p-3 items-center">
          <div className="">
            <p>Tu saldo:</p>
            <h2 className="">$ {user?.balance || 0}</h2>
          </div>
        </div>
        <div className="flex-[1_1_50%]">
          <NextButton href="/recharge" label="Recargar" type="primary" />
        </div>
      </div>
      <div className=" mt-4">
        <NextButton href="/profile" label="Editar perfil" />
        <NextButton href="/" />
        <NextButton href="/" />
        <NextButton href="/" />
      </div>
      <Navigation current="settings" />
    </div>
  );
};

export default Settings;
