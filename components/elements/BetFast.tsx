import React, { useRef } from 'react';

type Props = {
  handleBet: () => void;
};

const BetFast: React.FC<Props> = ({ handleBet }: Props) => {
  const checkShowModal = useRef<HTMLInputElement>(null);

  const handleClick = async () => {
    if (checkShowModal?.current) {
      checkShowModal.current.click();
      await handleBet();
    }
  };

  return (
    <div className="card card-compact w-96 shadow-xl bg-white mb-4">
      <div className="card-body">
        <div className="flex gap-2">
          <div>A</div>
          <div>
            <h2 className="card-title text-sm">@lofrena</h2>
            <p className="text-sm">Apuestó $1.500 al SI</p>
          </div>
        </div>
        <div className="card-actions justify-end">
          <label htmlFor="my-modal" className="btn btn-block btn-sm text-black">
            Apuesta $1.500 al NO
          </label>
        </div>
      </div>

      <input type="checkbox" id="my-modal" className="modal-toggle" ref={checkShowModal} />
      <div className="modal">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg">Confirma tu apuesta</h3>
          <p className="py-4">Apuestas $1.500 a que el NO ganará</p>
          <div className="modal-action flex-col text-center">
            <div className="mb-2">
              <button className="btn btn-primary w-full" onClick={handleClick}>
                Enviar apuesta
              </button>
            </div>
            <div className="mb-2">
              <label htmlFor="my-modal" className="cursor-pointer">
                Mejor después
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetFast;
