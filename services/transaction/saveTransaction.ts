import { TransactionForm } from 'interfaces/transaction/form';

export const saveTransaction = async (body: TransactionForm) => {
  const endpoint = `/api/transaction/save`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(endpoint, options);

  return response.json();
};
