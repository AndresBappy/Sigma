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
