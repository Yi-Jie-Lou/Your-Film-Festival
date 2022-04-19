import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFeatures } from "../actions";
import { firebase } from "../utils/firebase-config";
import Input from "./Input";
import Textarea from "./Textarea";

function FilmContent() {
  const dispatch = useDispatch();

  const currentTab = useSelector((state) => state.currentTab);
  const features = useSelector((state) => state.features);
  const [featureImgs, setFeatureImgs] = useState([]);
  const [currenFeature, setCurrenFeature] = useState({
    year: "",
    nation: "",
    color: "",
    format: "",
    length: "",
    language: "",
    title: "",
    shorInfo: "",
    longInfo: ""
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

  const handleChange = (value, key) => {
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
      <div className="flex flex-wrap justify-center w-11/12 mt-8 mx-auto ">
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
      <div className="flex flex-wrap justify-around w-11/12 mx-auto mt-8 ">
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
            attribute="shorInfo"
            value={currenFeature.shorInfo}
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
