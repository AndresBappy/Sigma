import { Poppins } from '@next/font/google';
import type { AppProps } from 'next/app';

import 'styles/globals.css';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`container max-w-sm h-full ${poppins.className}`}>
      <Component {...pageProps} />
    </main>
  );
}
