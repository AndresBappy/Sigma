import React from 'react';

import BetInfo from 'components/elements/BetCreate';

type Props = {};

const create: React.FC<Props> = (props: Props) => {
  return (
    <div className="min-h-full flex">
      <BetInfo />
    </div>
  );
};

export default create;
