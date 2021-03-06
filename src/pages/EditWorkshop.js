import { useDispatch, useSelector } from 'react-redux';

import uniqid from 'uniqid';

import Textarea from '../components/global/Textarea';
import Input from '../components/global/Input';
import Checkbox from '../components/global/Checkbox';
import Cropper from '../components/editWorkshop/Cropper';
import useRoutePush from '../hooks/useRoutePush';
import checkUploadImgSize from '../helper/checkUploadSize';
import { updateWorkshop } from '../actions';
import { firebase } from '../utils/firebase-config';
import { errorAlert } from '../utils/customAlert';
import PuzzleImg from '../img/Puzzle.png';

function EditWorkshop() {
  const dispatch = useDispatch();
  const routerHandler = useRoutePush();
  const userID = useSelector((state) => state.userID);
  const workshop = useSelector((state) => state.workshop);

  const handleChange = (value, key, index) => {
    const newWorkshop = [...workshop];
    newWorkshop[index][key] = value;
    dispatch(updateWorkshop(newWorkshop));
  };

  const preview = async (e, index) => {
    const uploadImg = e.target.files[0];
    const isValidImgSize = checkUploadImgSize(uploadImg);
    if (!isValidImgSize) return;

    await firebase.uploadImgs(uploadImg);
    firebase.getUploadImgs(uploadImg).then((uploadUrl) => {
      const newWorkshop = [...workshop];
      newWorkshop[index].img = uploadUrl;
      dispatch(updateWorkshop(newWorkshop));
    });
  };

  const previewGuest = async (e, index, guestIndex) => {
    const uploadImg = e.target.files[0];
    const isValidImgSize = checkUploadImgSize(uploadImg);
    if (!isValidImgSize) return;

    await firebase.uploadImgs(uploadImg);
    firebase.getUploadImgs(uploadImg).then((uploadUrl) => {
      const newWorkshop = [...workshop];
      newWorkshop[index].guest.splice(guestIndex, 1, uploadUrl);
      dispatch(updateWorkshop(newWorkshop));
    });
  };

  const addWorkshop = () => {
    const emptyWorkshop = {
      title: '',
      img: '',
      text: '',
      guest: [''],
      workshopID: uniqid(),
      isReadOnly: false,
    };
    const newWorkshop = [emptyWorkshop, ...workshop];
    dispatch(updateWorkshop(newWorkshop));
  };

  const deleteWorkshop = (index) => {
    const newWorkshop = [...workshop];
    newWorkshop.splice(index, 1);
    dispatch(updateWorkshop(newWorkshop));
  };

  const addGuest = (index) => {
    const newWorkshop = [...workshop];
    newWorkshop[index].guest.push('');
    dispatch(updateWorkshop(newWorkshop));
  };

  const deleteGuest = (index, guestIndex) => {
    const newWorkshop = [...workshop];
    newWorkshop[index].guest.splice(guestIndex, 1);
    dispatch(updateWorkshop(newWorkshop));
  };

  const editWorkshop = (index) => {
    const newWorkshop = [...workshop];
    newWorkshop[index].isReadOnly = false;
    dispatch(updateWorkshop(newWorkshop));
  };

  const checkInputValue = () => {
    let isError = false;

    if (workshop.some((item) => !item.title.trim())) {
      errorAlert('???????????????????????????????????????', PuzzleImg);
      isError = true;
      return isError;
    }
    return isError;
  };

  const saveWorkshop = () => {
    const isError = checkInputValue();
    if (isError) return;

    const newWorkshop = workshop.map((item) => {
      item.isReadOnly = true;
      return item;
    });
    dispatch(updateWorkshop(newWorkshop));

    firebase.saveWorkshop(userID, workshop).then(() => {
      routerHandler(
        '??????????????????????????????????????????',
        '/backstage/edit-footer-color'
      );
    });
  };

  return (
    <div className="flex flex-col mx-auto w-11/12 mt-24 mb-64 | md:my-24 ">
      <button className="button-blue ml-0 my-3" onClick={addWorkshop}>
        Add
      </button>
      {workshop &&
        workshop.map((item, index) => (
          <div
            key={index}
            className="flex flex-col mb-12 border-b-2 border-b-zinc-400"
          >
            <Input
              className="input-full"
              attribute="title"
              value={item.title}
              index={index}
              isReadOnly={item.isReadOnly}
              onChange={handleChange}
            >
              ??????????????? / Title????????????
            </Input>

            <div className="my-5">
              <label
                className="block w-full  rounded-lg text-center  border-4 border-[#94bed1]  cursor-pointer"
                htmlFor={`workshop${index}`}
              >
                {item.img ? (
                  <img
                    className="border-0 object-cover  w-full mr-0"
                    src={item ? item.img : ''}
                  />
                ) : (
                  <p className="flex flex-col justify-center h-full">
                    <span>????????????</span>
                  </p>
                )}
                <input
                  id={`workshop${index}`}
                  className="hidden border-1 "
                  type="file"
                  accept="image/*"
                  onChange={(e) => preview(e, index)}
                />
              </label>
            </div>
            <Textarea
              className="text-area-large"
              attribute="text"
              value={item.text}
              index={index}
              isReadOnly={item.isReadOnly}
              onChange={handleChange}
            >
              ??????????????? / Imformation
            </Textarea>
            <div className="flex mt-12 mb-6">
              <h2 className="flex mt-1 text-xl">
                <span>????????????</span>
              </h2>
              <button className="button-blue" onClick={() => addGuest(index)}>
                Add
              </button>
            </div>
            <div className="flex flex-wrap">
              {item.guest.map((guest, guestIndex) =>
                guest ? (
                  <div key={guestIndex} className="mx-6 my-10">
                    <label
                      className="block  rounded-full text-center  border-4 border-[#94bed1] cursor-pointer | w-36 h-36 | md:w-52 md:h-52"
                      htmlFor={`guest${index}${guestIndex}`}
                    >
                      <img
                        className="border-0 object-cover rounded-full mr-0 w-full h-full"
                        src={guest ? guest : ''}
                      />
                      <input
                        id={`guest${index}${guestIndex}`}
                        className="hidden border-1 "
                        type="file"
                        accept="image/*"
                        onChange={(e) => previewGuest(e, index, guestIndex)}
                      />
                    </label>
                    <div className="flex justify-center mt-6">
                      <button
                        className="button-red mx-0"
                        onClick={() => {
                          deleteGuest(index, guestIndex);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <Cropper
                    key={guestIndex}
                    workshopNum={index}
                    guestNum={guestIndex}
                  />
                )
              )}
            </div>
            <div className="flex justify-center mx-auto  my-12  border-4 border-[#94bed1] rounded-2xl | min-w-[340px] md:w-96 ">
              <p className="flex flex-col justify-center mr-6">
                <span>????????????</span>
              </p>
              <Checkbox
                attribute="name"
                className="checkbox-left  w-16 mx-1"
                onChange={handleChange}
                type="checkbox"
                index={index}
                value={item.name}
              >
                ??????
              </Checkbox>
              <Checkbox
                attribute="phone"
                className="checkbox-left w-16 mx-1"
                onChange={handleChange}
                type="checkbox"
                index={index}
                value={item.phone}
              >
                ??????
              </Checkbox>
              <Checkbox
                attribute="email"
                className="checkbox-left  w-16 mx-1"
                onChange={handleChange}
                type="checkbox"
                index={index}
                value={item.email}
              >
                Email
              </Checkbox>
            </div>
            <div className="flex justify-end mt-3 mb-9 ">
              <button
                className="button-orange"
                onClick={() => {
                  editWorkshop(index);
                }}
              >
                Edit
              </button>
              <button
                className="button-red"
                onClick={() => {
                  deleteWorkshop(index);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      <div className="flex justify-center mt-12 w-full">
        <button onClick={saveWorkshop} className="button-blue my-0  mx-0">
          ????????????
        </button>
      </div>
    </div>
  );
}

export default EditWorkshop;
