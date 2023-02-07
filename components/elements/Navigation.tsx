import { useRouter } from 'next/router';
import React from 'react';

import IconComponent from './Icon';

type Props = {
  current: string;
};

const Navigation: React.FC<Props> = ({ current }: Props) => {
  const router = useRouter();

  const handleClick = (route: string) => {
    router.push(`/${route}`);
  };

  return (
    <div className="btm-nav w-96 left-2/4 -ml-48 z-50 mb-4 rounded-full">
      <button onClick={() => handleClick('dashboard')}>
        <IconComponent name="home" fill={current === 'dashboard' ? 'fill-white' : 'fill-gray-text'} />
        <span className="sr-only">Dashboard</span>
      </button>
      <button>
        <IconComponent name="soccer" fill={current === 'list' ? 'fill-white' : 'fill-gray-text'} />
        <span className="sr-only">List</span>
      </button>
      <button>
        <IconComponent name="events" fill={current === 'favorite' ? 'fill-white' : 'fill-gray-text'} />
        <span className="sr-only">Favorite</span>
      </button>
      <button onClick={() => handleClick('settings')}>
        <IconComponent name="user" fill={current === 'settings' ? 'fill-white' : 'fill-gray-text'} />
        <span className="sr-only">Settings</span>
      </button>
    </div>
  );
};

export default Navigation;
