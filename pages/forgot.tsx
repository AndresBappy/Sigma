import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import BackIcon from 'public/images/icons/back.svg';

type Props = {};

interface ForgotForm {
  email: string;
}

const Forgot: React.FC<Props> = (props: Props) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ForgotForm>();
  const router = useRouter();

  const onSubmit: SubmitHandler<ForgotForm> = async (data: ForgotForm) => {
    console.log(data);
    router.push('/login');
  };

  console.log(errors);

  return (
    <div className="h-full px-2 pt-9">
      <div className=" pb-5">
        <Link href="/login" className="btn btn-circle bg-white">
          <BackIcon />
        </Link>
      </div>
      <h1 className="card-title text-2xl font-logo font-bold text-custom-purple pb-5">¿Olvidaste tu contraseña?</h1>
      <p className="pb-5">
        No te preocupes, te enviaremos un correo con un enlace para resetar tu clave. Solo tienes que escribir tu correo
        electrónico:
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block pb-5">
          <div className="flex justify-between">
            <span className="block px-5 pb-2">Correo</span>
            {errors.email && <span className="text-right text-orange-text">{errors.email.message}</span>}
          </div>
          <input
            type="email"
            placeholder="Tu Correo"
            className="border-solid border-gray-text border py-4 px-6 w-full rounded text-gray-text bg-white"
            {...register('email', { required: 'Correo requerido' })}
          />
        </label>
        <div className="text-center pt-2.5 pb-8">
          <button type="submit" className="btn btn-primary">
            enviar enlace
          </button>
        </div>
      </form>
    </div>
  );
};

export default Forgot;
