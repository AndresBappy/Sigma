import React, { SVGProps } from 'react';

// import BackIcon from 'public/images/icons/back.svg';
import Basketball from 'public/images/icons/basketball.svg';
import Bet from 'public/images/icons/bet.svg';
import Football from 'public/images/icons/football.svg';
import Soccer from 'public/images/icons/soccer.svg';
import Star from 'public/images/icons/star.svg';
import Tennis from 'public/images/icons/tennis.svg';
import Golf from 'public/images/icons/golf.svg';
import Home from 'public/images/icons/home.svg';
import User from 'public/images/icons/user.svg';
import Events from 'public/images/icons/events.svg';
import Deposit from 'public/images/icons/deposit.svg';

type iconType = {
  [key: string]: React.ElementType<HTMLElement & SVGElement>;
};

const icons: iconType = {
  star: Star,
  soccer: Soccer,
  basketball: Basketball,
  football: Football,
  tennis: Tennis,
  bet: Bet,
  golf: Golf,
  home: Home,
  user: User,
  events: Events,
  deposit: Deposit,
};

type Props = {
  name: string;
  fill: string;
} & SVGProps<SVGElement>;

const IconComponent: React.FC<Props> = ({ name, fill, ...props }) => {
  let Icon: React.ElementType = icons[name];

  return <Icon className={`${fill}`} {...props} />;
};

export default IconComponent;
