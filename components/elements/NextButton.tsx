import Link from 'next/link';
import React from 'react';

import IconComponent from './Icon';

type Props = {};

const NextButton: React.FC<Props> = (props: Props) => {
  return (
    <Link href="/dashboard" className="btn gap-2 normal-case w-full mb-4 bg-white justify-between">
      <div className="flex text-lg text-gray-text gap-2">
        <IconComponent name="soccer" fill="fill-purple-text" />
        <span className=" font-normal block">Next</span>
      </div>
      <svg
        className="h-6 w-6 fill-current md:h-8 md:w-8"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
      </svg>
    </Link>
  );
};

export default NextButton;
