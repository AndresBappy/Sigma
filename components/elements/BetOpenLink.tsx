import Link from 'next/link';
import React from 'react';

type Props = {};

const BetOpenLink: React.FC<Props> = (props: Props) => {
  return (
    <>
      <p className="mb-7 grow-0">
        Conoce como otros jugadores están apostando y <span className="font-bold">juega</span> con ellos:
      </p>
      <Link href={{ pathname: '/open', query: 'm=' + Math.random().toString() }} className="btn btn-secondary w-full">
        JUEGA APUESTAS ABIERTAS
      </Link>
    </>
  );
};

export default BetOpenLink;
