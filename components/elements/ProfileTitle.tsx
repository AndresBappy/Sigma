import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';

import { userAtom } from 'state/user';

type Props = {};

const ProfileTitle: React.FC<Props> = (props: Props) => {
  const [user] = useAtom(userAtom);
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [hydrated, setHydrated] = React.useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (user?.avatar) {
      setAvatar(user.avatar);
    }
  }, [user]);

  if (!hydrated) {
    return <div className="card w-96 h-64 glass overflow-hidden"></div>;
  }

  return (
    <div className="card w-96 h-64 glass overflow-hidden">
      <figure className="w-full h-64">
        <img
          src={avatar}
          alt="car!"
          // fill={true}
          className="w-full"
        />
      </figure>
      <div className="card-body absolute bottom-0 text-center text-white p-0 mb-4 w-full">
        <h2 className="card-title text-center justify-center">@{user?.handle}</h2>
        <p className="text-center">{user?.email}</p>
      </div>
    </div>
  );
};

export default ProfileTitle;
