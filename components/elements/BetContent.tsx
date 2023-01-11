import Image from 'next/image';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import BetOpenLink from './BetOpenLink';

type Props = {
  description?: string;
  content?: string;
  optionA?: string;
  optionAImage?: string;
  optionB?: string;
  optionBImage?: string;
};

interface BetForm {
  option: string;
  value: string;
  invite: string;
}

const BetContent: React.FC<Props> = ({ description, content, optionA, optionAImage, optionB, optionBImage }: Props) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BetForm>();
  const [dataSent, setDataSent] = useState(false);

  const onSubmit: SubmitHandler<BetForm> = async (data: BetForm) => {
    console.log(data);
    setDataSent(true);
  };

  return (
    <div className="card-body bg-white">
      <h2 className="card-title">{!dataSent ? description : <>¡Tu apuesta está lista!</>}</h2>
      <p className="grow-0">
        {!dataSent ? (
          content
        ) : (
          <>
            Hiciste una apuesta por $200 apostando a que el AC MILLAN ganará el partido.
            <br />
            <br />
            Espera a que @calofon acepte tu apuesta para completarla.
          </>
        )}
      </p>
      <div className="flex gap-2 mb-7">
        {optionA && (
          <button className="flex justify-start	btn gap-2 bg-gray-background text-black-text">
            {optionAImage && (
              <span className="bg-white rounded-full block">
                <Image src={optionAImage} width={30} height={30} alt={optionA} />
              </span>
            )}{' '}
            <span>{optionA}</span>
          </button>
        )}
        {optionB && (
          <button className="flex justify-start	btn bg-gray-background gap-2 text-black-text">
            {optionBImage && (
              <span className="bg-white rounded-full block">
                <Image src={optionBImage} width={30} height={30} alt={optionB} />
              </span>
            )}{' '}
            <span>{optionB}</span>
          </button>
        )}
      </div>
      {!dataSent && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-xs mb-7">
              <label>
                <div className="flex justify-between">
                  <span className="block px-5 pb-2"> Selecciona el ganador</span>
                  {errors.option && <span className="text-right text-orange-text">{errors.option.message}</span>}
                </div>
                <select
                  className="select select-bordered w-full bg-white border-gray-text"
                  {...register('option', { required: 'Requerido' })}
                >
                  <option disabled selected value="">
                    Pick one
                  </option>
                  {!!optionA && <option value="0">{optionA}</option>}
                  {!!optionB && <option value="1">{optionB}</option>}
                </select>
              </label>
            </div>
            <div className="form-control w-full max-w-xs mb-7">
              <label>
                <div className="flex justify-between">
                  <span className="block px-5 pb-2">¿Cuánto quieres apostar?</span>
                  {errors.value && <span className="text-right text-orange-text">{errors.value.message}</span>}
                </div>

                <input
                  type="text"
                  placeholder="$"
                  className="input input-bordered w-full max-w-xs bg-white border-gray-text"
                  {...register('value', { required: 'Requerido' })}
                />
              </label>
            </div>
            <div className="form-control w-full max-w-xs mb-7">
              <label>
                <div className="flex justify-between">
                  <span className="block px-5 pb-2">¿Con quién quieres apostar?</span>
                  {errors.invite && <span className="text-right text-orange-text">{errors.invite.message}</span>}
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs bg-white border-gray-text"
                  {...register('invite', { required: 'Requerido' })}
                />
              </label>
            </div>
            <div className="card-actions mb-7">
              <button className="btn btn-primary w-full">Enviar apuesta</button>
            </div>
          </form>
          <p className="mb-7">
            ¿No sabes con quién jugar? Puedes crear un evento nuevo para que otros jugadores apuesten.
          </p>
          <div className="text-orange-text">
            <button className="btn btn-tertiary w-full">Crea una nueva apuesta</button>
          </div>
        </>
      )}
      {dataSent && <h2 className="card-title">Aún hay más apuestas</h2>}
      <BetOpenLink />
    </div>
  );
};

export default BetContent;
