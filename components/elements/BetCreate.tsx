import React from 'react';
import BetContent from './BetContent';

import BetTitle from './BetTitle';

type Props = {};

const BetInfo: React.FC<Props> = (props: Props) => {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl flex-1">
      <BetTitle
        background="/images/assets/bg-bet-1.jpg"
        title={'Champions League'}
        dates={'12/12/2022 - 14:30h'}
        icon={'soccer'}
      />
      <BetContent
        description={'La ultima oportunidad de AC Millan de pasar a la siguiente fase. ¿Quién ganará?'}
        content={
          'Tras 3 partidos perdidos es la gran oportunidad del Tottenham de pasar a la siguiente pase y asegurar un cupo en el torneo.'
        }
        optionA={'AC Millan'}
        optionAImage={'/images/assets/bet-1-option-a.png'}
        optionB={'Tottenham'}
        optionBImage={'/images/assets/bet-1-option-b.png'}
      />
    </div>
  );
};

export default BetInfo;
