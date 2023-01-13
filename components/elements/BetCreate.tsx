import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { currentBetAtom } from 'state/bet';
import BetContent from './BetContent';
import BetTitle from './BetTitle';

type Props = {};

const BetInfo: React.FC<Props> = (props: Props) => {
  const [currentBet] = useAtom(currentBetAtom);
  const router = useRouter();

  useEffect(() => {
    if (!currentBet.id) {
      router.push('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBet.id]);

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl flex-1">
      <BetTitle {...currentBet} />
      <BetContent
        description={currentBet.description}
        content={currentBet.content}
        optionA={currentBet.optionA}
        optionAImage={currentBet.optionAImage}
        optionB={currentBet.optionB}
        optionBImage={currentBet.optionBImage}
      />
    </div>
  );
};

export default BetInfo;
