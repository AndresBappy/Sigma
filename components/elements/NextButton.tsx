import Link from 'next/link';
import React from 'react';

import IconComponent from './Icon';

type buttonType = 'primary' | 'secondary';

type Props = {
  href?: string;
  label?: string;
  icon?: string;
  type?: buttonType;
};

const NextButton: React.FC<Props> = ({ href, label, type, icon }: Props) => {
  const background = type === 'primary' ? 'btn-primary bg-primary text-white rounded-lg p-3' : undefined;
  const containerStyle = type === 'primary' ? 'text-white flex-col' : 'text-gray-text';

  return (
    <Link
      href={href || '/'}
      className={`btn flex-1 gap-2 normal-case w-full h-full mb-4 bg-white justify-between ${background}`}
    >
      <div className={`flex justify-around text-lg text-gray-text gap-2 ${containerStyle}`}>
        <IconComponent name="soccer" fill="fill-purple-text" />
        {type === 'primary' ? (
          <div>
            <span className=" font-normal block">{label}</span>
          </div>
        ) : (
          <span className=" font-normal block">{label}</span>
        )}
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
