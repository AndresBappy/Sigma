import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import BackIcon from 'public/images/icons/back.svg';
import ProfileIcon from 'public/images/icons/profile.svg';

type Props = {};

interface ProfileForm {
  username: string;
  phone: string;
  country: string;
  biography: string;
}

const Profile: React.FC<Props> = (props: Props) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileForm>();
  const router = useRouter();

  const onSubmit: SubmitHandler<ProfileForm> = async (data: ProfileForm) => {
    console.log(data);
    router.push('/dashboard');
  };

  return (
    <div className="h-full px-2 pt-9">
      <div className=" pb-5">
        <Link href="/register" className="btn btn-circle bg-white">
          <BackIcon />
        </Link>
      </div>
      <h1 className="card-title text-2xl font-logo font-bold text-custom-purple pb-5">Completa tu perfil</h1>
      <p className="pb-5">y escoge un nombre de usuario para que puedas apostar con tus amigos.</p>
      <div className="flex mb-4 items-center justify-center">
        <div className="rounded-full border-gray-text bg-white p-5 w-fit">
          <ProfileIcon />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block pb-5">
          <div className="flex justify-between">
            <span className="block px-5 pb-2">Usuario</span>
            {errors.username && <span className="text-right text-orange-text">{errors.username.message}</span>}
          </div>
          <input
            type="text"
            placeholder="Tu nombre de usuario"
            className="border-solid border-gray-text border py-4 px-6 w-full rounded text-gray-text bg-white"
            {...register('username', { required: 'Nombre requerido' })}
          />
        </label>
        <label className="block pb-5">
          <div className="flex justify-between">
            <span className="block px-5 pb-2">Celular</span>
            {errors.phone && <span className="text-right text-orange-text">{errors.phone.message}</span>}
          </div>
          <input
            type="text"
            placeholder="Tu número celular"
            className="border-solid border-gray-text border py-4 px-6 w-full rounded text-gray-text bg-white"
            {...register('phone', { required: 'Número requerido' })}
          />
        </label>
        <label className="block pb-5">
          <div className="flex justify-between">
            <span className="block px-5 pb-2">País</span>
            {errors.country && <span className="text-right text-orange-text">{errors.country.message}</span>}
          </div>
          <select
            className="select select-bordered w-full bg-white border-gray-text"
            {...register('country', { required: 'Requerido' })}
          >
            <option disabled selected value="">
              Tu país de residencia
            </option>
            <option value="CO">Colombia</option>
          </select>
        </label>
        <label className="block pb-5">
          <div className="flex justify-between">
            <span className="block px-5 pb-2">Bio</span>
            {errors.biography && <span className="text-right text-orange-text">{errors.biography.message}</span>}
          </div>
          <textarea
            {...register('biography', { required: 'Requerido' })}
            className="textarea textarea-bordered h-24 bg-white w-full"
            placeholder="Una pequeña descripción"
          ></textarea>
        </label>
        <div className="text-center pt-2.5 pb-8">
          <button type="submit" className="btn btn-primary">
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
