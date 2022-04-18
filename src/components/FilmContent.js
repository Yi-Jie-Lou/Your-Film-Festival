import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFeatures } from "../actions";
import { firebase } from "../utils/firebase-config";

function FilmContent() {
  const dispatch = useDispatch();

  const currentTab = useSelector((state) => state.currentTab);
  const features = useSelector((state) => state.features);
  const [featureImgs, setFeatureImgs] = useState([]);

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
      newFeatures[editIndex].timetable.forEach(singleTimetable => {
        singleTimetable.timetableID = uploadUrl
      })
      newFeatures[editIndex].featureImgs = newFeaturesImgsArray;

      dispatch(updateFeatures(newFeatures));
    });
  };

  useEffect(() => {
    if (!currentTab) return;
    const current = features.filter((item) => item.featureID === currentTab);
    console.log(current[0].featureImgs);
    setFeatureImgs(current[0].featureImgs);
  }, [currentTab, features]);

  return (
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
      {/* <button onClick={uploadImgs()}>儲存</button> */}
    </div>
  );
}

export default FilmContent;
