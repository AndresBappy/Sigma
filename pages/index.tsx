import { M_PLUS_Rounded_1c } from '@next/font/google';
import Link from 'next/link';

const mPlusRounded = M_PLUS_Rounded_1c({
  weight: '700',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <div className="bg-[url('/images/background-home.png')] image-full h-full flex items-end">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h1 className={`${mPlusRounded.className} card-title text-2xl font-bold text-custom-purple`}>BAPPY</h1>
          <h2 className="text-2xl text-gray-title">
            Dile <span className="font-bold">¡hola!</span> a la nueva forma de apostar con amigos.
          </h2>
          <p>Una forma fácil y divertida de ganar, tus apuestas preferidas en deportes, eventos y más...</p>
          <div className="card-actions justify-center">
            <Link href="/register" className="btn btn-primary">
              Empieza ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
