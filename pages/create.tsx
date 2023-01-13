import React from 'react';

import Link from 'next/link';
import BackIcon from 'public/images/icons/back.svg';
import BetCreate from 'components/elements/BetCreate';

type Props = {};

const create: React.FC<Props> = (props: Props) => {
  return (
    <div className="h-full px-2 pt-9">
      <div className=" pb-5">
        <Link href="/dashboard" className="btn btn-circle bg-white">
          <BackIcon />
        </Link>
      </div>

      <BetCreate />
    </div>
  );
};

export default create;
