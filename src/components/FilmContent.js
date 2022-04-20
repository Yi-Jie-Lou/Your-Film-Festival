import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFeatures } from "../actions";
import { firebase, storage } from "../utils/firebase-config";
import { ref, uploadBytesResumable } from "firebase/storage";
import Loading from "./Loading";
import Input from "./Input";
import Textarea from "./Textarea";

function FilmContent() {
  const dispatch = useDispatch();

  const currentTab = useSelector((state) => state.currentTab);
  const features = useSelector((state) => state.features);
  const [featureImgs, setFeatureImgs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currenFeature, setCurrenFeature] = useState({
    year: "",
    nation: "",
    color: "",
    format: "",
    length: "",
    language: "",
    title: "",
    shortInfo: "",
    longInfo: "",
  });

  const preview = async (e, index) => {
    if (!e.target.files[0]) return;
    const uploadImg = e.target.files[0];

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
    const uploadVideo = e.target.files[0];
    const storageRef = ref(storage, uploadVideo.name);
    const uploadTask = uploadBytesResumable(storageRef, uploadVideo);

    uploadTask.on(
      "state_changed",
      (res) => {
        const progress = Math.round(
          (res.bytesTransferred / res.totalBytes) * 100
        );
        console.log(progress);
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
    setCurrenFeature(current[0]);
  }, [currentTab, features]);

  return (
    <>
      <div className="flex flex-wrap justify-center w-10/12 mb-8 mt-16   mx-auto ">
        {currenFeature.trailer ? (
          <video
            className="border-2   "
            src={currenFeature.trailer}
            type="video/mp4"
            controls
          />
        ) : (
          <>
            <label
              className="flex flex-col justify-center border-2  w-96 h-56  text-center cursor-pointer rounded-lg border-stone-700"
              htmlFor={`trailer${currentTab}`}
            >
              {progress === 100 || progress === 0 ? (
                <>
                  <p>請上傳預告片</p>
                </>
              ) : (
                <>
                  <Loading progress={progress} />
                </>
              )}
              <input
                id={`trailer${currentTab}`}
                className="hidden border-Ｆ1 "
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
          <div className="w-96 mt-5 mx-2" key={index}>
            <label
              className="block border-2 h-56 w-full rounded-lg text-center cursor-pointer"
              htmlFor={`upload${index}`}
            >
              {item ? (
                <img
                  className="border-0 object-cover h-56 w-full mr-0"
                  src={item ? item : ""}
                />
              ) : (
                ""
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
        <div className="flex flex-col w-[30%]">
          <Input
            attribute="year"
            value={currenFeature.year}
            onChange={handleChange}
          >
            年份 / Year（必填）
          </Input>
          <Input
            attribute="nation"
            value={currenFeature.nation}
            onChange={handleChange}
          >
            國家 / Nation（必填）
          </Input>
          <Input
            attribute="format"
            value={currenFeature.format}
            onChange={handleChange}
          >
            放映格式 / Format（必填）
          </Input>
          <Input
            attribute="color"
            value={currenFeature.color}
            onChange={handleChange}
          >
            色彩 / Color（必填）
          </Input>
          <Input
            attribute="language"
            value={currenFeature.language}
            onChange={handleChange}
          >
            語言 / Language（必填）
          </Input>
          <Input
            attribute="length"
            value={currenFeature.length}
            onChange={handleChange}
          >
            片長（min）（必填）
          </Input>
        </div>
        <div className="flex flex-col w-[30%] ">
          <Input
            attribute="title"
            value={currenFeature.title}
            onChange={handleChange}
          >
            片名 /Film Title（必填）
          </Input>

          <Textarea
            className="text-area"
            attribute="shortInfo"
            value={currenFeature.shortInfo}
            onChange={handleChange}
          >
            短介紹 / Summary
          </Textarea>
        </div>

        <div className="flex flex-col w-[30%] )">
          <Textarea
            className="text-area-large"
            attribute="longInfo"
            value={currenFeature.longInfo}
            onChange={handleChange}
          >
            長介紹 / Info
          </Textarea>
        </div>
      </div>
    </>
  );
}

export default FilmContent;
