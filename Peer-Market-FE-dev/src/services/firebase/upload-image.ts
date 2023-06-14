import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from ".";

export const uploadImage = async (data:any) =>{
  const path = `/peer-marker/images/${data.email}/${data.name}/${data.uid}`;
  const imageRef = ref(storage, path);
  const image = await uploadBytes(imageRef, data.file);
  const pathImage = await getDownloadURL(image.ref);
  return pathImage;
}