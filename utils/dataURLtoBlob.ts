export const dataURLtoBlob = async (data: RequestInfo | string) => {
  let file = await fetch(data).then((res) => res.blob());
  return file;
};
