import { RegisterForm } from 'interfaces/user/form';

export const doRegister = async (body: RegisterForm) => {
  const endpoint = `/api/user/register`;

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
