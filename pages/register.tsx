import Image from 'next/image';
import Link from 'next/link';
import BackIcon from 'public/images/icons/back.svg';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Password from '../components/form/Password';

type Props = {};

interface RegisterForm {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirm: string;
}

const Register: React.FC<Props> = (props: Props) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit: SubmitHandler<RegisterForm> = async (data: RegisterForm) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <div className="h-full px-2 pt-9">
      <div className=" pb-5">
        <Link href="/" className="btn btn-circle bg-white">
          <BackIcon />
        </Link>
      </div>
      <h1 className="card-title text-2xl font-logo font-bold text-custom-purple pb-5">Crea tu cuenta</h1>
      <p className="pb-5">Completa tu información y empieza a apostar con tus amigos en BAPPY.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block pb-5">
          <div className="flex justify-between">
            <span className="block px-5 pb-2">Nombre</span>
            {errors.name && <span className="text-right text-orange-text">{errors.name.message}</span>}
          </div>
          <input
            type="text"
            placeholder="Tu Nombre"
            className="border-solid border-gray-text border py-4 px-6 w-full rounded text-gray-text bg-white"
            {...register('name', { required: 'Nombre requerido' })}
          />
        </label>
        <label className="block pb-5">
          <div className="flex justify-between">
            <span className="block px-5 pb-2">Apellido</span>
            {errors.lastname && <span className="text-right text-orange-text">{errors.lastname.message}</span>}
          </div>
          <input
            type="text"
            placeholder="Tu Apellido"
            className="border-solid border-gray-text border py-4 px-6 w-full rounded text-gray-text bg-white"
            {...register('lastname', { required: 'Apellido requerido' })}
          />
        </label>
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
        <label className="block pb-5">
          <div className="flex justify-between">
            <span className="block px-5 pb-2">Clave</span>
            {errors.password && <span className="text-right text-orange-text">{errors.password.message}</span>}
          </div>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Contraseña requerida' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Password value={value} onChange={onChange} onBlur={onBlur} placeholder="Tu Clave" />
            )}
          />
        </label>
        <label className="block pb-5">
          <div className="flex justify-between">
            <span className="block px-5 pb-2">Confirmar Clave</span>
            {errors.confirm && <span className="text-right text-orange-text">{errors.confirm.message}</span>}
          </div>
          <Controller
            name="confirm"
            control={control}
            defaultValue=""
            rules={{
              required: 'Confirmación requerida',
              validate: (val: string) => {
                if (watch('password') !== val) {
                  return 'Confirmación inválida';
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Password value={value} onChange={onChange} onBlur={onBlur} placeholder="Confirmar Clave" />
            )}
          />
        </label>
        <div className="text-center pt-2.5 pb-8">
          <button type="submit" className="btn btn-primary">
            Continuar
          </button>
        </div>
      </form>
      <p className="text-center pb-2">
        ¿Ya tienes una cuenta?{' '}
        <Link href="login" className="font-bold text-purple-text">
          Entra aquí
        </Link>
      </p>
      <p className="text-center text-sm">
        Al registrarte aceptas los{' '}
        <Link href="/terms" className="text-orange-text">
          términos y condiciones
        </Link>{' '}
        así como las{' '}
        <Link href="/privacy" className="text-orange-text">
          políticas de privacidad
        </Link>
      </p>
      <Image src="/images/bappy.png" alt="Bappy" width={40} height={30} />
    </div>
  );
};

export default Register;
