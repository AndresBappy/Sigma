import { useRouter } from 'next/router';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Password from 'components/form/Password';

type Props = {};

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC<Props> = (props: Props) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginForm>();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    console.log(data);
  };

  return (
    <div className="bg-[url('/images/background-login.jpg')] image-full h-full flex items-end">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl text-gray-title">¡Bienvenido de nuevo!</h2>
          <p>Inicia sesión para empezar a apostar y ganar en tus eventos favoritos.</p>
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

            <div className="card-actions justify-center">
              <button className="btn btn-primary">Empieza ahora</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
