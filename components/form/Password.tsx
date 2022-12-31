// https://kopi.dev/tailwind/input-password-with-show-hide/

import React, { ChangeEventHandler, MouseEvent, useState } from 'react';

type Props = {
  value: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: ChangeEventHandler<HTMLInputElement>;
};

const Password: React.FC<Props> = ({ placeholder, value, onBlur, onChange }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        className="border-solid border-gray-text border py-4 px-6 w-full rounded text-gray-text bg-white"
      />
      <div className="absolute flex right-4 items-center ml-2 h-full top-0">
        <button className="px-1 block focus:outline-none" onClick={handleClick}>
          {!showPassword && (
            <div>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
            </div>
          )}
          {showPassword && (
            <div>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                ></path>
              </svg>
            </div>
          )}
          <div className="sr-only">{showPassword ? 'Hide' : 'Show'} Password</div>
        </button>
      </div>
    </div>
  );
};

export default Password;
