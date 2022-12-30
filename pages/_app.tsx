import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="container max-w-sm min-h-full">
      <Component {...pageProps} />
    </div>
  );
}
