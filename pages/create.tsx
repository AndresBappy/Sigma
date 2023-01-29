import { useResetAtom } from 'jotai/utils';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';
import React from 'react';

import BetCreate from 'components/elements/BetCreate';
import BackIcon from 'public/images/icons/back.svg';
import { currentBetAtom } from 'state/bet';

type Props = {};

const Create: React.FC<Props> = (props: Props) => {
  const resetCurrentBet = useResetAtom(currentBetAtom);

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

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
