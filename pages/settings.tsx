import React from 'react';

import Navigation from 'components/elements/Navigation';
import NextButton from 'components/elements/NextButton';
import ProfileTitle from 'components/elements/ProfileTitle';

type Props = {};

const Settings: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <ProfileTitle />
      <div className=" mt-4">
        <NextButton />
        <NextButton />
        <NextButton />
        <NextButton />
      </div>
      <Navigation current="settings" />
    </div>
  );
};

export default Settings;
