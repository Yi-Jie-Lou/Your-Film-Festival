import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ref, uploadBytesResumable } from 'firebase/storage';

import Loading from '../global/Loading';
import Input from '../global/Input';
import Textarea from '../global/Textarea';
import { updateFeatures } from '../../actions';
import checkUploadImgSize from '../../helper/checkUploadSize';
import { firebase, storage } from '../../utils/firebase-config';
import { limitAlert } from '../../utils/customAlert';
import LoadingAnim from '../../img/LoadingAnim.gif';
import DarkBlueCloudImg from '../../img/DarkBlueCloud.png';

function FilmContent() {
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.currentTab);
  const features = useSelector((state) => state.features);
  const [featureImgs, setFeatureImgs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentFeature, setCurrentFeature] = useState({
    year: '',
    nation: '',
    color: '',
    format: '',
    length: '',
    language: '',
    title: '',
    shortInfo: '',
    longInfo: '',
  });

  const preview = async (e, index) => {
    const uploadImg = e.target.files[0];
    const isValidImgSize = checkUploadImgSize(uploadImg);
    if (!isValidImgSize) return;

    await firebase.uploadImgs(uploadImg);
    firebase.getUploadImgs(uploadImg).then((uploadUrl) => {
      const newFeaturesImgsArray = [...featureImgs];
      newFeaturesImgsArray.splice(index, 1, uploadUrl);

      const newFeatures = [...features];
      const editIndex = newFeatures.findIndex(
        (item) => item.featureID === currentTab
      );
      newFeatures[editIndex].timetable.forEach((singleTimetable) => {
        singleTimetable.timetableID = uploadUrl;
      });
      newFeatures[editIndex].featureImgs = newFeaturesImgsArray;

      dispatch(updateFeatures(newFeatures));
    });
  };

  const uploadVideo = async (e) => {
    if (!e.target.files[0]) return;

    const uploadSize = e.target.files[0].size;

    if (uploadSize / 1024 > 30720) {
      limitAlert(
        `????????????????????????30MB\n???????????????${Math.floor(
          uploadSize / 1024 / 1024
        )}MB`,
        DarkBlueCloudImg
      );
      return;
    }
    const uploadVideo = e.target.files[0];
    const storageRef = ref(storage, uploadVideo.name);
    const uploadTask = uploadBytesResumable(storageRef, uploadVideo);

    uploadTask.on(
      'state_changed',
      (res) => {
        const progress = Math.round(
          (res.bytesTransferred / res.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },

      () => {
        firebase.getUploadImgs(uploadVideo).then((uploadUrl) => {
          const newFeatures = [...features];
          const editIndex = newFeatures.findIndex(
            (item) => item.featureID === currentTab
          );
          newFeatures[editIndex].trailer = uploadUrl;
          dispatch(updateFeatures(newFeatures));
        });
      }
    );
  };

  const handleChange = (value, key, _) => {
    const newFeatures = [...features];
    const editIndex = newFeatures.findIndex(
      (item) => item.featureID === currentTab
    );
    newFeatures[editIndex][key] = value;
    dispatch(updateFeatures(newFeatures));
  };

  useEffect(() => {
    if (!currentTab) return;
    const current = features.filter((item) => item.featureID === currentTab);
    setFeatureImgs(current[0].featureImgs);
    setCurrentFeature(current[0]);
  }, [currentTab, features]);

  return (
    <>
      <div className="flex flex-wrap justify-center w-10/12 mb-8 mt-16   mx-auto ">
        {currentFeature.trailer ? (
          <video
            className="border-8   "
            src={currentFeature.trailer}
            type="video/mp4"
            controls
          />
        ) : (
          <>
            <label
              className="flex flex-col justify-center border-4  w-96 h-56  text-center cursor-pointer rounded-lg border-[#628fa4]"
              htmlFor={`trailer${currentTab}`}
            >
              {progress === 100 || progress === 0 ? (
                <>
                  <p className="text-2xl text-slate-500 italic tracking-wider my-2">
                    ??????????????????
                  </p>
                  <Loading />
                </>
              ) : (
                <>
                  <div className="flex justify-center">
                    <div
                      className=" w-36  h-36  "
                      style={{
                        background: `url(${LoadingAnim})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                      }}
                    ></div>
                  </div>
                  <h1 className="text-3xl text-slate-400 font-bold mt-1">
                    {progress} %
                  </h1>
                </>
              )}
              <input
                id={`trailer${currentTab}`}
                className="hidden border-???1 "
                type="file"
                accept="video/*"
                onChange={(e) => uploadVideo(e)}
              />
            </label>
          </>
        )}
      </div>
      <div className="flex flex-wrap justify-center w-11/12 mt-8  mx-auto ">
        {featureImgs.map((item, index) => (
          <div className="w-[360px] mt-5 mx-2" key={index}>
            <label
              className="block border-4 min-h-[208px] w-full rounded-lg text-center cursor-pointer border-[#628fa4] "
              htmlFor={`upload${index}`}
            >
              {item ? (
                <img
                  className="border-0 object-cover h-56 w-full mr-0"
                  src={item ? item : ''}
                />
              ) : (
                <p className="text-2xl text-slate-500 italic tracking-wider my-2">
                  ???????????????
                </p>
              )}
              <input
                id={`upload${index}`}
                className="hidden border-1 "
                type="file"
                accept="image/*"
                onChange={(e) => preview(e, index)}
              />
            </label>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-around w-11/12 my-8 pb-8 border-b-2 border-b-zinc-400 mx-auto  ">
        <div className="flex flex-col | w-[352px] | md:w-[30%]">
          <Input
            attribute="year"
            value={currentFeature.year}
            onChange={handleChange}
            className="input-full"
            type="number"
          >
            ?????? / Year????????????
          </Input>
          <Input
            attribute="nation"
            value={currentFeature.nation}
            onChange={handleChange}
            className="input-full"
          >
            ?????? / Nation????????????
          </Input>
          <Input
            attribute="format"
            value={currentFeature.format}
            onChange={handleChange}
            className="input-full"
          >
            ???????????? / Format????????????
          </Input>
          <Input
            attribute="color"
            value={currentFeature.color}
            onChange={handleChange}
            className="input-full"
          >
            ?????? / Color????????????
          </Input>
          <Input
            attribute="language"
            value={currentFeature.language}
            onChange={handleChange}
            className="input-full"
          >
            ?????? / Language????????????
          </Input>
          <Input
            attribute="length"
            value={currentFeature.length}
            onChange={handleChange}
            className="input-full"
            type="number"
          >
            ?????????min???????????????
          </Input>
        </div>
        <div className="flex flex-col | w-[352px] | md:w-[30%] ">
          <Input
            attribute="title"
            value={currentFeature.title}
            onChange={handleChange}
            className="input-full"
          >
            ?????? /Film Title????????????
          </Input>

          <Textarea
            className="text-area"
            attribute="shortInfo"
            value={currentFeature.shortInfo}
            onChange={handleChange}
          >
            ????????? / Summary
          </Textarea>
        </div>

        <div className="flex flex-col | w-[352px] | md:w-[30%] )">
          <Textarea
            className="text-area-large"
            attribute="longInfo"
            value={currentFeature.longInfo}
            onChange={handleChange}
          >
            ????????? / Info
          </Textarea>
        </div>
      </div>
    </>
  );
}

export default FilmContent;
