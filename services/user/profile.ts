import { ProfileForm } from 'interfaces/user/form';

export const getProfile = async () => {
  const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile`;

  const options = {
    method: 'GET',
  };

  const response = await fetch(endpoint, options);

  const result = await response.json();

  const user = result.user;

  return user;
};

export const updateProfile = async (body: ProfileForm) => {
  const endpoint = `/api/user/update`;

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
