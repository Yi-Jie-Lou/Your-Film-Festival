import AvatarImageCropper from "react-avatar-image-cropper";
import { useDispatch, useSelector } from "react-redux";
import { firebase } from "../utils/firebase-config";
import { updateWorkshop } from "../actions";
function Cropper(props) {
  const dispatch = useDispatch();
  const workshop = useSelector((state) => state.workshop);

  const apply = async (file) => {

    if (!file) return;
    await firebase.uploadCropImgs(file);
    firebase.getUploadCropImgs(file).then((uploadUrl) => {
      const newWorkshop = [...workshop];
      newWorkshop[props.workshopNum].guest.splice(props.guestNum, 1, uploadUrl);
      dispatch(updateWorkshop(newWorkshop));
  
    });
  };

  return (
    <>
      <div
        style={{
          width: "250px",
          height: "250px",
          margin: "auto",
          border: "1px solid black",
          borderRadius: "100%",
          backgroundImage: `url(${workshop[props.workshopNum].guest[props.guestNum]})` 
        }}
      >
        <AvatarImageCropper className={"w-full h-full rounded-full"} apply={apply} /> 
      </div>
    </>
  );
}

export default Cropper;
