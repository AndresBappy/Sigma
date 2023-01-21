import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import BetCard from 'components/elements/BetCard';
import Navigation from 'components/elements/Navigation';
import { Bet } from 'interfaces/bet';
import { betsAtom, currentBetAtom } from 'state/bet';

type Props = {};

const Dashboard: React.FC<Props> = (props: Props) => {
  const [bets] = useAtom(betsAtom);
  const [currentBet, setCurrentBet] = useAtom(currentBetAtom);
  const router = useRouter();

  const handlePrimaryClick = async (bet: Bet) => {
    await setCurrentBet(bet);
  };

  useEffect(() => {
    if (currentBet.id) {
      router.push('/create');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBet]);

  return (
    <div className="min-h-full">
      {!!bets.length &&
        bets.map((bet) => <BetCard key={bet.id} {...bet} handlePrimaryClick={() => handlePrimaryClick(bet)} />)}
      <BetCard
        background="/images/assets/bg-bet-1.jpg"
        title={'Champions League'}
        dates={'12/12/2022 - 14:30h'}
        description={'La ultima oportunidad de AC Millan de pasar a la siguiente fase. ¿Quién ganará?'}
        icon={'soccer'}
        primary={'APUESTA YA'}
        secondary={'APUESTAS ABIERTAS'}
        secondaryIcon={'bet'}
        optionA={'AC Millan'}
        optionAImage={'/images/assets/bet-1-option-a.png'}
        optionB={'Tottenham'}
        optionBImage={'/images/assets/bet-1-option-b.png'}
      />
      <BetCard
        background="/images/assets/bg-bet-2.jpg"
        icon={'soccer'}
        title={'Champions League'}
        dates={'11/10/2022 - 12:45h'}
        description={'El Real Madrid se juega a su suerte después de su última derrota. ¿Podrá ganar?'}
        color={'gray'}
        optionA={'Real Madrid'}
        optionAImage={'/images/assets/bet-2-option-a.png'}
        optionB={'Celtic'}
        optionBImage={'/images/assets/bet-2-option-b.png'}
      />
      <BetCard
        icon={'soccer'}
        fill={'fill-purple-text'}
        title={'Champions League'}
        dates={'11/10/2022 - 12:45h'}
        description={'El Real Madrid se juega a su suerte después de su última derrota. ¿Podrá ganar?'}
        color={'gray'}
        type={'plain'}
        background={'default'}
        primary={'APUESTA'}
        optionA={'Real Madrid'}
        optionAImage={'/images/assets/bet-2-option-a.png'}
        optionB={'Celtic'}
        optionBImage={'/images/assets/bet-2-option-b.png'}
      />
      <BetCard
        icon={'football'}
        fill={'fill-purple-text'}
        title={'NFL'}
        dates={'17/10/2022 - 20:15h'}
        description={'Jornada número 10 de la NFL Philadelphia Eagles lleva más partidos ganados'}
        color={'gray'}
        type={'plain'}
        background={'default'}
        primary={'APUESTA YA'}
      />
      <BetCard
        title={''}
        background="/images/assets/bg-bet-1.jpg"
        primary={''}
        icon={'football'}
        fill={'fill-gray-text'}
      />
      <BetCard
        background="/images/assets/bg-bet-fav-1.jpg"
        title={'Destacadas'}
        dates={'12/12/2022 - 14:30h'}
        description={'Crees que el precio del Bitcoin estará nuevamente por encima de US $20.000'}
        icon={'star'}
        fill={'fill-violet-gradient-to'}
        primary={'APUESTA'}
      />
      <Navigation current="dashboard" />
    </div>
  );
};

export default Dashboard;
