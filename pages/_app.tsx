import { Poppins } from '@next/font/google';
import { Provider } from 'jotai';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Suspense } from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { bscTestnet, polygonMumbai } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';

import 'styles/globals.css';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

const { chains, provider, webSocketProvider } = configureChains([polygonMumbai], [publicProvider()]);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [new MetaMaskConnector({ chains })],
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <main className={`container max-w-sm h-full ${poppins.className}`}>
      <Provider>
        <SessionProvider session={session}>
          <WagmiConfig client={client}>
            <Suspense fallback={<div>Loading...</div>}>
              <Component {...pageProps} />
            </Suspense>
          </WagmiConfig>
        </SessionProvider>
      </Provider>
    </main>
  );
}
