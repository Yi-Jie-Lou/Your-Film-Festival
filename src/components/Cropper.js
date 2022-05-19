import { useDispatch, useSelector } from 'react-redux';

import AvatarImageCropper from 'react-avatar-image-cropper';
import Proptyeps from 'prop-types';

import { firebase } from '../utils/firebase-config';
import { limitAlert } from '../utils/customAlert';
import { updateWorkshop } from '../actions';

function Cropper({ workshopNum, guestNum }) {
  const dispatch = useDispatch();
  const workshop = useSelector((state) => state.workshop);

  const apply = async (file) => {
    if (!file) return;
    const uploadSize = file.size;

    if (uploadSize / 1024 > 200) {
      limitAlert(
        `上傳檔案需請小於200KB\n您的檔案裁切後為${Math.floor(
          uploadSize / 1024
        )}KB`
      );
      return;
    }

    await firebase.uploadCropImgs(file);
    firebase.getUploadCropImgs(file).then((uploadUrl) => {
      const newWorkshop = [...workshop];
      newWorkshop[workshopNum].guest.splice(guestNum, 1, uploadUrl);
      dispatch(updateWorkshop(newWorkshop));
    });
  };

  return (
    <>
      <div
        style={{
          width: '250px',
          height: '250px',
          margin: 'auto',
          border: '1px solid black',
          borderRadius: '100%',
          backgroundImage: `url(${workshop[workshopNum].guest[guestNum]})`,
        }}
      >
        <AvatarImageCropper
          className={'w-full h-full rounded-full'}
          apply={apply}
        />
      </div>
    </>
  );
}

Cropper.propTypes = {
  workshopNum: Proptyeps.number.isRequired,
  guestNum: Proptyeps.number.isRequired,
};

export default Cropper;
