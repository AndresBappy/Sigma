import Image from 'next/image';
import React from 'react';

import { textColor } from 'constants/colors';
import { backgroundType } from 'interfaces/bet';
import Icon from './Icon';

type Props = {
  title: string;
  description?: string;
  dates?: string;
  icon?: string;
  fill?: string;
  color?: string;
  background?: string;
  type?: backgroundType;
};

const BetTitle: React.FC<Props> = ({
  title,
  description,
  dates,
  background,
  icon,
  fill = 'default',
  color = 'default',
  type = 'image',
}: Props) => {
  const cardBackground =
    background && ((type === 'image' ? 'image-full' : '') || (type === 'plain' ? `bg-${textColor[background]}` : ''));
  const iconBackground = textColor.hasOwnProperty(fill) ? `fill-${textColor[fill]}` : fill;
  const fontColor = `text-${textColor[color]}`;

  return (
    <div className={`card   ${cardBackground} ${fontColor}`}>
      {type === 'image' && background && (
        <figure>
          <Image src={background} alt={title || ''} width={370} height={300} className="w-full h-auto" />
        </figure>
      )}
      <div className="card-body justify-end text-white">
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
        <div>
          <p className="text-sm text-white">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BetTitle;
