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
  const [formData, setFormData] = useState({} as BetForm);

  const onSubmit: SubmitHandler<BetForm> = async (data: BetForm) => {
    console.log(data);
    setFormData(data);
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
            Hiciste una apuesta por ${formData.value} apostando a que el {formData.option === '0' ? optionA : optionB}{' '}
            ganará el partido.
            <br />
            <br />
            Espera a que @{formData.invite} acepte tu apuesta para completarla.
          </>
        )}
      </p>
      {!dataSent && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full  mb-7">
              <div>
                <div className="flex justify-between">
                  <span className="block px-5 pb-2"> Selecciona el ganador</span>
                  {errors.option && <span className="text-right text-orange-text">{errors.option.message}</span>}
                </div>

                <div className="flex flex-1 gap-2 radio-group">
                  {optionA && (
                    <label className="grid grid-cols-[1fr_0_2fr] flex-[50%] justify-start btn bg-gray-background text-black-text">
                      {optionAImage && (
                        <span className="bg-white rounded-full block">
                          <Image src={optionAImage} width={30} height={30} alt={optionA} />
                        </span>
                      )}{' '}
                      <input {...register('option', { required: 'Requerido' })} type="radio" value="0" />
                      <span className="text-start">{optionA}</span>
                    </label>
                  )}
                  {optionB && (
                    <label className="grid grid-cols-[1fr_0_2fr] flex-[50%] justify-start btn bg-gray-background text-black-text">
                      {optionBImage && (
                        <span className="bg-white rounded-full block">
                          <Image src={optionBImage} width={30} height={30} alt={optionB} />
                        </span>
                      )}{' '}
                      <input {...register('option', { required: 'Requerido' })} type="radio" value="1" />
                      <span className="text-start">{optionB}</span>
                    </label>
                  )}
                </div>
              </div>
            </div>
            <div className="form-control w-full  mb-7">
              <label>
                <div className="flex justify-between">
                  <span className="block px-5 pb-2">¿Cuánto quieres apostar?</span>
                  {errors.value && <span className="text-right text-orange-text">{errors.value.message}</span>}
                </div>

                <input
                  type="text"
                  placeholder="$"
                  className="input input-bordered w-full  bg-white border-gray-text"
                  {...register('value', { required: 'Requerido' })}
                />
              </label>
            </div>
            <div className="form-control w-full  mb-7">
              <label>
                <div className="flex justify-between">
                  <span className="block px-5 pb-2">¿Con quién quieres apostar?</span>
                  {errors.invite && <span className="text-right text-orange-text">{errors.invite.message}</span>}
                </div>

                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full  bg-white border-gray-text"
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
