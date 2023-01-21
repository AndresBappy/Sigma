import React from 'react';

type Props = {};

const ProfileTitle: React.FC<Props> = (props: Props) => {
  return (
    <div className="card w-96 glass overflow-hidden">
      <figure>
        <img src="https://placeimg.com/400/225/arch" alt="car!" />
      </figure>
      <div className="card-body absolute bottom-0 text-center text-white p-0 mb-4 w-full">
        <h2 className="card-title text-center justify-center">@juan98</h2>
        <p className="text-center">juan@gmail.com</p>
      </div>
    </div>
  );
};

export default ProfileTitle;
