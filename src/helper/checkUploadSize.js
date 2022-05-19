import DarkBlueCloudImg from '../img/DarkBlueCloud.png';
import { limitAlert } from '../utils/customAlert';

const checkUploadImgSize = (uploadImg) => {
  if (!uploadImg) return false;

  const uploadImgSize = uploadImg.size;

  if (uploadImgSize / 1024 > 200) {
    limitAlert(
      `上傳檔案需請小於200KB\n您的檔案為${Math.floor(uploadImgSize / 1024)}KB`,
      DarkBlueCloudImg
    );
    return false;
  }

  return true;
};

export default checkUploadImgSize;
