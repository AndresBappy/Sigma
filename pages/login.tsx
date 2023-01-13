import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
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
    setError,
    formState: { errors },
  } = useForm<LoginForm>();
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push('/dashboard');
  }

  const onSubmit: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    const response = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: `${window.location.origin}/user`,
    });
    if (response?.error) {
      setError('email', { message: response.error });
      return;
    }
    router.push('/dashboard');
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
            <div className="flex justify-end mb-5">
              <Link href={'/forgot'}>¿Olvidaste tu contraseña?</Link>
            </div>
            <div className="card-actions justify-center mb-5">
              <button className="btn btn-primary">Empieza ahora</button>
            </div>
          </form>
          <div>
            <p>
              ¿Aún no tienes una cuenta?{' '}
              <Link href="/register" className="font-bold text-purple-text">
                Registrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
