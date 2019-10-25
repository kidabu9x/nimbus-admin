import Api from "../../../Api";

const apiUrl = "/images";

export const uploadImage = async image => {
  const formData = new FormData();
  formData.append("image", image);
  let url = "";
  try {
    const result = await Api.post(`${apiUrl}/upload`, formData);
    url = result.data.url;
  } catch (error) {
    console.log(error);
  }
  return url;
};
