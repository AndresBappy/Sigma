import React from 'react';

import BetOpen from 'components/elements/BetOpen';

type Props = {};

const open: React.FC<Props> = (props: Props) => {
  return (
    <div className="min-h-full flex">
      <BetOpen />
    </div>
  );
};

export default open;
