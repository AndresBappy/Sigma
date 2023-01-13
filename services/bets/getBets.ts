// import { IInvoiceForm } from 'interfaces/payment/invoice';
// import { useResetRecoilState } from 'recoil';
// import { paymentDataState } from 'state/payment';

interface Props {
  // value: number;
}

export const getBets = async () => {
  const endpoint = `/api/bets`;

  const options = {
    // signal: abortController.signal,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(endpoint, options);

  if (response.status !== 200) {
    return null;
  }

  return response.json();
};
