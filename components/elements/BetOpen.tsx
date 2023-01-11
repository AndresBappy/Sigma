import React, { useState } from 'react';

import BetFast from './BetFast';
import BetOpenLink from './BetOpenLink';
import BetTitle from './BetTitle';

type Props = {};

const BetOpen: React.FC<Props> = (props: Props) => {
  const [isBet, setIsBet] = useState(false);

  const handleBet = () => {
    setIsBet(true);
  };

  return (
    <div>
      <BetTitle
        background="/images/assets/bg-bet-fav.jpg"
        title={'Destacadas'}
        dates={'12/12/2022 - 14:30h'}
        icon={'star'}
        fill={'fill-violet-gradient-to'}
        description={'Finalmente llegó el momento ¿Crees que este es el mundial para Messi?'}
      />
      {!isBet && (
        <>
          <h2 className="text-lg mt-3 mb-3 font-bold">Encuentra un oponente</h2>
          <p className=" mb-2">Ya hay 23 apostadores jugando este evento ¿Cuál es tu oponente? ¡Juega ya!</p>
          <BetFast handleBet={handleBet} />
          <BetFast handleBet={handleBet} />
          <BetFast handleBet={handleBet} />
        </>
      )}
      {isBet && (
        <>
          <div>
            <h2 className="text-lg mt-3 mb-3 font-bold">¡Tu apuesta está lista</h2>
            <p className="mb-7">
              Le apostaste $1.500 a que ganara el NO
              <br />
              <br />
              Aceptaste el match de @lofrrea apostando a que el SI ganará.
            </p>
            <BetOpenLink />
          </div>
        </>
      )}
    </div>
  );
};

export default BetOpen;
