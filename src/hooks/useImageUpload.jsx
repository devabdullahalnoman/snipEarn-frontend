import axios from "axios";

const useImageUpload = () => {
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(url, formData);

    return res.data?.data?.url || "";
  };

  return { uploadImage };
};

export default useImageUpload;
