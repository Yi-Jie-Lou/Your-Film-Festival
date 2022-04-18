import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeatures } from "../actions";

{
  /* <form>
  <input type="file" onchange="preview()">
 
</form> */
}

function FilmContent() {
  const dispatch = useDispatch();

  const currentTab = useSelector((state => state.currentTab ))
  const features = useSelector((state) => state.features);
  const [featureImgs, setFeatureImgs] = useState([]);

  const preview = (e, index) => {
    if (e.target.files[0]) {

      const uploadImg = URL.createObjectURL(e.target.files[0]);
      const newFeaturesImgsArray = [...featureImgs];
      newFeaturesImgsArray.splice(index, 1, uploadImg);

      const newFeatures = [...features];
      const editIndex = newFeatures.findIndex(
        (item) => item.featureID === currentTab
      );
      newFeatures[editIndex].featureImgs = newFeaturesImgsArray;

      dispatch(getFeatures(newFeatures));
    }
  };

  useEffect(() => {
    if (currentTab) {
      const current = features.filter((item) => item.featureID === currentTab);
      console.log(current[0].featureImgs)
      setFeatureImgs(current[0].featureImgs);
    }
  }, [currentTab, features]);

  return (
    <div className="flex flex-wrap justify-center w-11/12 h-32 mt-32 mx-auto ">
      {featureImgs.map((item, index) => (
        <div className="w-1/4" key={index}>
          <img  className="w-full mr-0" src={item} />
          <input
            className="border-1"
            type="file"
            accept="image/*"
            onChange={(e) => preview(e, index)}
          />
        </div>
      ))}

    </div>
  );
}

export default FilmContent;
