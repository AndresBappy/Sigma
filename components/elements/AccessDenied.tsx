import Link from 'next/link';
import React from 'react';

type Props = {};

const AccessDenied: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <div>You need to login first.</div>
      <div>
        <Link href="/login">Go to login</Link>
      </div>
    </div>
  );
};

export default AccessDenied;
