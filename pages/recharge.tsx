import { BigNumber } from 'ethers';
import { useAtom } from 'jotai';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  useAccount,
  useBalance,
  useConnect,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
  useSwitchNetwork,
  useToken,
} from 'wagmi';

import BackIcon from 'public/images/icons/back.svg';
import { saveTransaction } from 'services/transaction/saveTransaction';
import { resetUserAtom } from 'state/user';

type Props = {};

interface RechargeForm {
  value: string;
}

const RECEIPT_WALLET = '0x9F2AAbfEB4C5F17678411cD37Df50b7818686584';

const Recharge: React.FC<Props> = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RechargeForm>();
  const [hydrated, setHydrated] = useState(false);
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const [currentValue, setCurrentValue] = useState('0');
  const [refresh, setRefresh] = useAtom(resetUserAtom);

  const {
    data: tokenData,
    isError: tokenIsError,
    isLoading: tokenLoading,
    error: tokenError,
  } = useToken({
    // address: '0x35375C3636eaaEF31A63fDD9A1B16f911D67d5B5',
    // address: '0x8a558288ff9c7205Ac5a6c3bCbB3D72C322c5cE1',
    address: '0xE097d6B3100777DC31B34dC2c58fB524C2e76921', // usdc polygon mumbai
  });
  console.log({ tokenData, tokenIsError, tokenError, tokenLoading });

  const { config: contractConfig } = usePrepareContractWrite({
    // https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7#writeContract
    // address: '0x8a558288ff9c7205Ac5a6c3bCbB3D72C322c5cE1', // usdt bsc testnet
    address: '0xE097d6B3100777DC31B34dC2c58fB524C2e76921', // usdc polygon mumbai
    abi: [
      {
        constant: false,
        inputs: [
          {
            name: '_to',
            type: 'address',
          },
          {
            name: '_value',
            type: 'uint256',
          },
        ],
        name: 'transfer',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    functionName: 'transfer',
    args: [
      RECEIPT_WALLET,
      // ethers.utils.parseEther(currentValue),
      // BigNumber.from(currentValue).add(1),
      BigNumber.from(currentValue).mul(BigNumber.from(10).pow(tokenData?.decimals || 0)),
    ],
  });
  console.log(tokenData?.decimals, RECEIPT_WALLET, contractConfig);
  const { write, isSuccess, error, isError, data } = useContractWrite(contractConfig);
  console.log({ write, isSuccess, error, isError, data });

  const {
    data: balance,
    // isError, isLoading
  } = useBalance({
    address: '0xDe9411e6c3f17Bb9d027F9676C67c943F1045190',
    token: '0xE097d6B3100777DC31B34dC2c58fB524C2e76921', // usdc polygon mumbai
  });
  console.log({ balance });

  const { chain } = useNetwork();
  const { chains, error: networkError, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();
  const { config: sendConfig } = usePrepareSendTransaction({
    request: {
      to: RECEIPT_WALLET,
      value: (Number(currentValue) * 1e18).toString(),
    },
    chainId: chain?.id,
  });
  const {
    sendTransaction,
    isLoading: transactionLoading,
    isSuccess: sendSuccess,
    error: sendError,
    isError: sendIsError,
  } = useSendTransaction(sendConfig);

  const onSubmit: SubmitHandler<RechargeForm> = async (data) => {
    if (currentValue !== data.value) {
      setCurrentValue(data.value);
    } else {
      if (currentValue !== '0') {
        console.log('go');
        write?.();
        // sendTransaction?.();
      }
    }
  };

  useEffect(() => {
    if (currentValue !== '0') {
      console.log('go');
      write?.();
      // sendTransaction?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue]);

  useEffect(() => {
    const save = async () => {
      await saveTransaction({
        from: address || '',
        to: RECEIPT_WALLET,
        value: Number(currentValue),
        token: '0xE097d6B3100777DC31B34dC2c58fB524C2e76921',
        hash: data?.hash || '',
      });

      await setRefresh(!refresh);
    };

    if (isSuccess) {
      save();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated || isSuccess) {
    return (
      <div className="h-full px-2 pt-9">
        <div className=" pb-5">
          <Link href="/settings" className="btn btn-circle bg-white">
            <BackIcon />
          </Link>
        </div>
        <h1 className="card-title text-2xl font-logo font-bold text-custom-purple pb-5">Cargar saldo</h1>
        <p className="pb-5">Carga saldo a tu cuenta desde la billetera que uses. </p>
        {isSuccess && <p className="pb-5">Valor enviado</p>}
      </div>
    );
  }

  return (
    <div className="h-full px-2 pt-9">
      <div className=" pb-5">
        <Link href="/settings" className="btn btn-circle bg-white">
          <BackIcon />
        </Link>
      </div>
      <h1 className="card-title text-2xl font-logo font-bold text-custom-purple pb-5">Cargar saldo</h1>
      <p className="pb-5">Carga saldo a tu cuenta desde la billetera que uses. </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block pb-5">
          <div className="flex justify-between">
            <span className="block px-5 pb-2">Valor</span>
            {errors.value && <span className="text-right text-orange-text">{errors.value.message}</span>}
          </div>
          <input
            type="vaue"
            placeholder="Valor"
            className="border-solid border-gray-text border py-4 px-6 w-full rounded text-gray-text bg-white"
            {...register('value', { required: 'Requerido' })}
          />
        </label>
        <div className="text-center pt-2.5 pb-8">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!sendTransaction && !isConnected && !!chains.length && !!chain?.id && chains[0].id === chain?.id}
          >
            Pagar
            {transactionLoading && <>Loading</>}
          </button>
        </div>
      </form>
      {isError && <p>{error?.message}</p>}
      {!isConnected && (
        <>
          <button
            disabled={isConnected}
            onClick={() =>
              connect({
                connector: connectors[0],
              })
            }
            className="btn btn-primary"
          >
            Conectar cartera
          </button>
        </>
      )}
      {isConnected && chains[0].id !== chain?.id && (
        <>
          {/* {chain && <div>Connected to {chain.name}</div>} */}

          {chains.map((x) => (
            <button
              disabled={!switchNetwork || x.id === chain?.id}
              key={x.id}
              onClick={() => switchNetwork?.(x.id)}
              className="btn btn-primary"
            >
              Cambiar red
              {/* {x.name} */}
              {isLoading && pendingChainId === x.id && ' (switching)'}
            </button>
          ))}

          <div>{networkError && networkError.message}</div>
        </>
      )}
    </div>
  );
};

export default Recharge;

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
