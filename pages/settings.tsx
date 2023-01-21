import React from 'react';

import Navigation from 'components/elements/Navigation';
import ProfileTitle from 'components/elements/ProfileTitle';

type Props = {};

const Settings: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <ProfileTitle />
      <Navigation current="settings" />
    </div>
  );
};

export default Settings;
