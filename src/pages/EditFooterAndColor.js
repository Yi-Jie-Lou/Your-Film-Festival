import { useDispatch, useSelector } from 'react-redux';
import {
  updateSponsor,
  updatePrimaryColor,
  updateSecondaryColor,
  updateTextColor,
} from '../actions';
import { firebase } from '../utils/firebase-config';
import checkUploadImgSize from '../helper/checkUploadSize';
import Input from '../components/global/Input';
import ColorCube from '../components/editFooterAndColor/ColorCube';
import TextColorCube from '../components/editFooterAndColor/TextColorCube';
import useRoutePush from '../hooks/useRoutePush';
import PuzzleImg from '../img/Puzzle.png';
import { errorAlert } from '../utils/customAlert';

function EditFooterAndColor() {
  const dispatch = useDispatch();
  const routerHandler = useRoutePush();
  const primaryColor = useSelector((state) => state.primaryColor);
  const secondaryColor = useSelector((state) => state.secondaryColor);
  const textColor = useSelector((state) => state.textColor);
  const sponsor = useSelector((state) => state.sponsor);
  const userID = useSelector((state) => state.userID);

  const handleChange = (value, _, index) => {
    const newSponsor = { ...sponsor };
    newSponsor.text[index] = value;
    dispatch(updateSponsor(newSponsor));
  };
  const handleColorCode = (e, key) => {
    switch (key) {
      case 'primary':
        return dispatch(updatePrimaryColor(e.target.value));
      case 'secondary':
        return dispatch(updateSecondaryColor(e.target.value));
      case 'text':
        return dispatch(updateTextColor(e.target.value));
      default:
        throw new Error();
    }
  };

  const addSponsor = (key) => {
    const newSponsor = { ...sponsor };
    newSponsor[key].push('');
    dispatch(updateSponsor(newSponsor));
  };

  const previewSponsorImg = async (e, index) => {
    const uploadImg = e.target.files[0];
    const isValidImgSize = checkUploadImgSize(uploadImg);

    if (!isValidImgSize) return;

    await firebase.uploadImgs(uploadImg);
    firebase.getUploadImgs(uploadImg).then((uploadUrl) => {
      const newSponsor = { ...sponsor };
      newSponsor.img[index] = uploadUrl;
      dispatch(updateSponsor(newSponsor));
    });
  };

  const deleteSponsorImg = (index) => {
    const newSponsor = { ...sponsor };
    newSponsor.img.splice(index, 1);
    dispatch(updateSponsor(newSponsor));
  };
  const deleteSponsorText = (index) => {
    const newSponsor = { ...sponsor };
    newSponsor.text.splice(index, 1);
    dispatch(updateSponsor(newSponsor));
  };

  const checkInputValue = () => {
    let isError = false;
    const reg = /^#([0-9a-f]{3}){1,2}$/i;

    if (
      !reg.test(primaryColor) ||
      !reg.test(secondaryColor) ||
      !reg.test(textColor)
    ) {
      errorAlert('?????????????????????', PuzzleImg);
      isError = true;
      return isError;
    }
    return isError;
  };

  const saveSponsorAndColors = () => {
    const isError = checkInputValue();
    if (isError) return;

    firebase
      .saveSponsor(userID, sponsor, primaryColor, secondaryColor, textColor)
      .then(() => {
        routerHandler('????????????????????????\n??????????????????????????????', '/preview');
      });
  };

  return (
    <>
      <div className="flex flex-col flex-wrap justify-around w-11/12 my-8 pb-8  mx-auto  ">
        <h1 className=" w-full mx-auto mt-28 mb-3 border-b-2 border-b-stone-700 text-2xl tracking-wider">
          ???????????????
        </h1>
        <button
          className="button-blue ml-0 my-4"
          onClick={() => {
            addSponsor('text');
          }}
        >
          Add
        </button>
        <div className="flex flex-wrap w-full mb-4 ">
          {sponsor &&
            sponsor.text.map((item, index) => (
              <div key={index} className="flex w-[550px]">
                <Input
                  attribute="text"
                  value={item}
                  index={index}
                  onChange={handleChange}
                  className="input-full"
                >
                  ????????? / Sponsor
                </Input>
                <div className="vertical mx-6">
                  <button
                    className="button-red"
                    onClick={() => {
                      deleteSponsorText(index);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="flex flex-col  ">
          <button
            className="button-blue ml-0 mt-8"
            onClick={() => {
              addSponsor('img');
            }}
          >
            Add
          </button>
          <div className="flex flex-wrap w-full mb-4 ">
            {sponsor &&
              sponsor.img.map((item, index) => (
                <div key={index} className="flex flex-wrap mx-6  my-12 w-250">
                  <label
                    className="block w-52 h-52  rounded-full text-center  border-4 border-[#94bed1]  cursor-pointer"
                    htmlFor={`sponsor${index}`}
                  >
                    {item ? (
                      <img
                        className="border-0 object-cover rounded-full  w-full h-full mr-0"
                        src={item}
                      />
                    ) : (
                      <p className="flex flex-col justify-center h-full">
                        <span>????????????</span>
                      </p>
                    )}
                    <input
                      id={`sponsor${index}`}
                      className="hidden border-1 "
                      type="file"
                      accept="image/*"
                      onChange={(e) => previewSponsorImg(e, index)}
                    />
                    <div className="flex justify-center mt-6">
                      <button
                        className="button-red"
                        onClick={() => {
                          deleteSponsorImg(index);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <h1 className=" w-full mx-auto mt-32 mb-8 border-b-2 border-stone-500 text-2xl tracking-wider">
          ???????????? / Primary color
        </h1>
        <ColorCube color={'primary'} />
        <h1 className=" w-full mx-auto mt-14 mb-8 border-b-2 border-stone-500 text-2xl tracking-wider">
          ???????????? / Secondary color
        </h1>
        <ColorCube color={'secondary'} />
        <h1 className=" w-full mx-auto mt-14 mb-8 border-b-2 border-stone-500 text-2xl tracking-wider">
          ???????????? / Text color
        </h1>
        <TextColorCube color={'text'} />
        <div className="flex flex-col mt-12">
          <div className="flex justify-center my-4">
            <h1 className="vertical  | text-base mx-1 | md:mx-4 md:text-2xl">
              <span>????????????????????????</span>
            </h1>
            <input
              value={primaryColor}
              onChange={(e) => {
                handleColorCode(e, 'primary');
              }}
              className="h-10 pl-3 mt-1 outline-none border-4 border-[#94bed1] rounded-xl | w-28 | md:w-36"
            ></input>
            <div
              style={{ background: primaryColor }}
              className={` h-12 rounded-lg | w-20 ml-3 mr-0 | md:w-24 md:mx-4 `}
            ></div>
          </div>
          <div className="flex justify-center my-4">
            <h1 className="vertical  | text-base mx-1 | md:mx-4 md:text-2xl">
              <span>????????????????????????</span>
            </h1>
            <input
              value={secondaryColor}
              onChange={(e) => {
                handleColorCode(e, 'secondary');
              }}
              className="h-10 pl-3 mt-1 outline-none border-4 border-[#94bed1] rounded-xl | w-28 | md:w-36"
            ></input>
            <div
              style={{ background: secondaryColor }}
              className={` h-12 rounded-lg | w-20 ml-3 mr-0 | md:w-24 md:mx-4`}
            ></div>
          </div>
          <div className="flex justify-center my-4">
            <h1 className="vertical  | text-base mx-1 | md:mx-4 md:text-2xl">
              <span>????????????????????????</span>
            </h1>
            <input
              value={textColor}
              onChange={(e) => {
                handleColorCode(e, 'text');
              }}
              className="h-10 pl-3 mt-1 outline-none border-4 border-[#94bed1] rounded-xl | w-28 | md:w-36"
            ></input>
            <div
              style={{ background: textColor }}
              className={` h-12 rounded-lg | w-20 ml-3 mr-0 | md:w-24 md:mx-4`}
            ></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-24">
        <button
          onClick={saveSponsorAndColors}
          className="button-blue mx-0 mt-0 mb-36 | md:my-0 "
        >
          ????????????
        </button>
      </div>
    </>
  );
}

export default EditFooterAndColor;
