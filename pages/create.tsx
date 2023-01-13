import { useResetAtom } from 'jotai/utils';
import { useSession } from 'next-auth/react';
import React from 'react';

import AccessDenied from 'components/elements/AccessDenied';
import BetCreate from 'components/elements/BetCreate';
import BackIcon from 'public/images/icons/back.svg';
import { currentBetAtom } from 'state/bet';

type Props = {};

const Create: React.FC<Props> = (props: Props) => {
  const { data: session, status } = useSession();
  const resetCurrentBet = useResetAtom(currentBetAtom);

  if (!session) {
    return (
      <div className="h-full px-2 pt-9">
        <AccessDenied />
      </div>
    );
  }

  const handleClick = () => {
    resetCurrentBet();
  };

  return (
    <div className="h-full px-2 pt-9">
      <div className=" pb-5">
        <button className="btn btn-circle bg-white" onClick={handleClick}>
          <BackIcon />
          <span className="sr-only">Back</span>
        </button>
      </div>

      <BetCreate />
    </div>
  );
};

export default Create;
