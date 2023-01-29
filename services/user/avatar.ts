export const getUploadUrl = async (filename: string, fileType: string) => {
  const endpoint = `/api/user/upload-url?file=${filename}&fileType=${fileType}`;

  const options = {
    method: 'GET',
  };

  const response = await fetch(endpoint, options);

  return response.json();
};

export const saveAvatar = async (endpoint: string, formData: FormData) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  return response;
};

export const updateAvatarProfile = async (avatar: string) => {
  const endpoint = `/api/user/avatar`;
  const body = { avatar };

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
