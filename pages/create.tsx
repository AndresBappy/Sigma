import React from 'react';

import BetCreate from 'components/elements/BetCreate';

type Props = {};

const create: React.FC<Props> = (props: Props) => {
  return (
    <div className="min-h-full flex">
      <BetCreate />
    </div>
  );
};

export default create;
