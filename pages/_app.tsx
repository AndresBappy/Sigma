import { Poppins } from '@next/font/google';
import { Provider } from 'jotai';
import type { AppProps } from 'next/app';
import { Suspense } from 'react';

import 'styles/globals.css';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`container max-w-sm h-full ${poppins.className}`}>
      <Provider>
        <Suspense fallback={<div>Loading...</div>}>
          <Component {...pageProps} />
        </Suspense>
      </Provider>
    </main>
  );
}
