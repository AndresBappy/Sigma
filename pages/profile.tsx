import { useAtom } from 'jotai';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import React, { MutableRefObject, Suspense, useEffect, useRef, useState } from 'react';
import Avatar from 'react-avatar';
import ReactAvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Error } from 'interfaces/error';
import { ProfileForm } from 'interfaces/user/form';
import BackIcon from 'public/images/icons/back.svg';
import ProfileIcon from 'public/images/icons/profile.svg';
import { getUploadUrl, saveAvatar, updateAvatarProfile } from 'services/user/avatar';
import { updateProfile } from 'services/user/profile';
import { resetUserAtom, userAtom } from 'state/user';
import { dataURLtoBlob } from 'utils/dataURLtoBlob';
import { cropToAvatarEditorConfig, getPicaInstance, replaceFileExtension } from 'utils/images';

type Props = {};

const Profile: React.FC<Props> = (props: Props) => {
  const [user] = useAtom(userAtom);
  const {
    control,
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<ProfileForm>();
  const router = useRouter();
  const [scale, setScale] = useState(1);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const checkShowModal = useRef<HTMLInputElement>(null);
  const editor = useRef() as MutableRefObject<ReactAvatarEditor>;
  const [avatar, setAvatar] = useState('');
  const [preview, setPreview] = useState<Blob>();
  const [error, setAvatarError] = useState('');
  const allowZoomOut = false;
  const [hydrated, setHydrated] = React.useState(false);
  const [refresh, setRefresh] = useAtom(resetUserAtom);

  const onSubmit: SubmitHandler<ProfileForm> = async (data: ProfileForm) => {
    const response = await updateProfile(data);

    if (response.success === false) {
      const errors: Array<Error> = response.error as Array<Error>;
      if (errors.length) {
        errors.forEach((error: Error) => setError(error.field as keyof ProfileForm, { message: error.message }));
      }
    } else {
      await setRefresh(!refresh);
      router.push('/settings');
    }
  };

  const handleUpload = async () => {
    if (editor?.current) {
      setAvatarError('');
      const canvas = editor.current.getImage();
      const config = cropToAvatarEditorConfig({
        type: 'rect',
        width: 200,
        height: 200,
      });

      const offScreenCanvas = document.createElement('canvas');
      offScreenCanvas.width = config.width < canvas.width ? config.width : canvas.width;
      offScreenCanvas.height = config.height < canvas.height ? config.height : canvas.height;

      const image = await getPicaInstance().resize(canvas, offScreenCanvas, {
        alpha: true,
      });
      const dataUrl = image.toDataURL('image/png', 1.0);
      const newFileName = replaceFileExtension(name);

      const filename = encodeURIComponent(newFileName);
      const fileType = encodeURIComponent('image/png');

      const { url, fields } = await getUploadUrl(filename, fileType);

      if (url) {
        const file = await dataURLtoBlob(dataUrl);

        const formData = new FormData();

        Object.entries({ ...fields, file }).forEach(([key, value]) => {
          formData.append(key, value as string);
        });

        const upload = await saveAvatar(url, formData);
        if (upload.ok) {
          // console.log('Uploaded successfully!');
          // setAvatar('');
          // setPreview(file);

          await updateAvatarProfile(fields.key);

          await setRefresh(!refresh);

          checkShowModal.current?.click();
        } else {
          setAvatarError('Upload failed.');

          checkShowModal.current?.click();
        }
      } else {
        setAvatarError('Upload failed.');

        checkShowModal.current?.click();
      }
    }
  };

  const handleDrop = (dropped: any) => {
    setScale(1);
    setImage(dropped[0]);
    setName(dropped[0].name);

    checkShowModal.current?.click();
  };

  const handleScale = (e: React.FormEvent<HTMLInputElement>) => {
    const scale = parseFloat(e.currentTarget.value);
    setScale(scale);
  };

  useEffect(() => {
    if (user?.avatar) {
      setAvatar(user.avatar);
    }
  }, [user?.avatar]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className="h-full px-2 pt-9">
      <div className=" pb-5">
        <Link href="/settings" className="btn btn-circle bg-white">
          <BackIcon />
        </Link>
      </div>
      <h1 className="card-title text-2xl font-logo font-bold text-custom-purple pb-5">Completa tu perfil</h1>
      <p className="pb-5">y escoge un nombre de usuario para que puedas apostar con tus amigos.</p>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex mb-4 items-center justify-center">
          <Dropzone onDrop={handleDrop} noKeyboard>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                {!avatar && !preview && (
                  <div className="rounded-full border-gray-text bg-white p-5 w-fit">
                    <ProfileIcon />
                  </div>
                )}
                {avatar && <Avatar name={'user'} size={'100'} round="50px" src={avatar} />}
                {preview && <Avatar name={'user'} size={'100'} round="50px" src={URL.createObjectURL(preview)} />}
                <input {...getInputProps()} />
                {!!error && <div>{error}</div>}
              </div>
            )}
          </Dropzone>
        </div>
      </Suspense>
      {hydrated && (
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
              defaultValue={user?.handle || ''}
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
              placeholder="Tu n??mero celular"
              className="border-solid border-gray-text border py-4 px-6 w-full rounded text-gray-text bg-white"
              defaultValue={user?.phone || ''}
              {...register('phone', { required: 'N??mero requerido' })}
            />
          </label>
          <label className="block pb-5">
            <div className="flex justify-between">
              <span className="block px-5 pb-2">Pa??s</span>
              {errors.country && <span className="text-right text-orange-text">{errors.country.message}</span>}
            </div>
            <select
              className="select select-bordered w-full bg-white border-gray-text"
              {...register('country', { required: 'Requerido' })}
              defaultValue={user?.country || ''}
            >
              <option disabled value="">
                Tu pa??s de residencia
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
              placeholder="Una peque??a descripci??n"
              defaultValue={user?.biography || ''}
            ></textarea>
          </label>
          <div className="text-center pt-2.5 pb-8">
            <button type="submit" className="btn btn-primary">
              Continuar
            </button>
          </div>
        </form>
      )}
      <label htmlFor="my-modal" className="cursor-pointer sr-only">
        <span className="sr-only">Open modal</span>
      </label>
      <input type="checkbox" id="my-modal" className="modal-toggle" ref={checkShowModal} />
      <div className="modal">
        <div className="modal-box bg-white">
          <ReactAvatarEditor ref={editor} width={300} height={300} image={image} scale={scale} />
          <div>
            <label>
              Zoom:
              <input
                name="scale"
                type="range"
                onChange={handleScale}
                min={allowZoomOut ? '0.1' : '1'}
                max="2"
                step="0.01"
                defaultValue="1"
              />
            </label>
          </div>
          <div className="modal-action flex-col text-center">
            <div className="mb-2">
              <button className="btn btn-primary w-full" onClick={handleUpload}>
                Ok
              </button>
            </div>
            <div className="mb-2">
              <label htmlFor="my-modal" className="cursor-pointer">
                Cancel
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
