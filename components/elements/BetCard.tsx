import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { textColor } from 'constants/colors';
import { backgroundType } from 'interfaces/bet';
import Icon from './Icon';

type Props = {
  title: string;
  dates?: string;
  icon?: string;
  fill?: string;
  background?: string;
  description?: string;
  optionA?: string;
  optionAImage?: string;
  optionB?: string;
  optionBImage?: string;
  color?: string;
  type?: backgroundType;
  primary?: string;
  primaryIcon?: string;
  secondary?: string;
  secondaryIcon?: string;
  handlePrimaryClick?: () => void;
};

const BetCard: React.FC<Props> = ({
  title,
  dates,
  background,
  icon,
  description,
  optionA,
  optionAImage,
  optionB,
  optionBImage,
  primary,
  primaryIcon,
  secondary,
  secondaryIcon,
  color = 'default',
  fill = 'default',
  type = 'image',
  handlePrimaryClick,
}: Props) => {
  const cardBackground =
    background && ((type === 'image' ? 'image-full' : '') || (type === 'plain' ? `bg-${textColor[background]}` : ''));
  const iconBackground = textColor.hasOwnProperty(fill) ? `fill-${textColor[fill]}` : fill;
  const fontColor = `text-${textColor[color]}`;

  return (
    <div className={`card w-96 shadow-xl mb-5 ${cardBackground} ${fontColor}`}>
      {type === 'image' && background && (
        <figure>
          <Image src={background} alt={title || ''} width={370} height={300} className="w-full h-auto" />
        </figure>
      )}
      <div className={`card-body ${fontColor}`}>
        <div className="flex items-center gap-2">
          {icon && (
            <div>
              <Icon name={icon} fill={`${iconBackground}`} />
            </div>
          )}
          <div className={`${fontColor}`}>
            <h2 className="card-title text-sm">{title}</h2>
            <p className="text-sm">{dates}</p>
          </div>
        </div>
        <p className={`text-sm ${fontColor}`}>{description}</p>
        {optionA && (
          <button className="flex justify-start	btn bg-gray-background-2 gap-2 text-white">
            {optionAImage && (
              <span className="bg-white rounded-full block">
                <Image src={optionAImage} width={30} height={30} alt={optionA} />
              </span>
            )}{' '}
            <span>{optionA}</span>
          </button>
        )}
        {optionB && (
          <button className="flex justify-start	btn bg-gray-background-2 gap-2 text-white">
            {optionBImage && (
              <span className="bg-white rounded-full block">
                <Image src={optionBImage} width={30} height={30} alt={optionB} />
              </span>
            )}{' '}
            <span>{optionB}</span>
          </button>
        )}
        {primary && (
          <div className="card-actions">
            <button className="btn btn-primary gap-2 w-full" onClick={handlePrimaryClick}>
              {primaryIcon && <Icon name={primaryIcon} fill={'fill-white'} />} {primary}
            </button>
          </div>
        )}
        {secondary && (
          <div className="card-actions">
            <Link href="/open" className="btn btn-secondary gap-2 w-full">
              {secondaryIcon && <Icon name={secondaryIcon} fill={'fill-white'} />} {secondary}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BetCard;
