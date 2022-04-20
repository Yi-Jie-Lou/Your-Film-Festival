import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFeatures } from "../actions";
import Textarea from "../components/Textarea";
import Checkbox from "../components/Checkbox";
import Header from "../components/Header"
import Footer from "../components/Footer"

function EditNews() {
  const dispatch = useDispatch();

  const currentTab = useSelector((state) => state.currentTab);
  const features = useSelector((state) => state.features);
  const [currenFeature, setCurrenFeature] = useState({
    commercialInfo:"",
    note:"",
    important:false
  });

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
    setCurrenFeature(current[0]);
  }, [currentTab, features]);

  return (
    <div className="flex flex-col  h-96 my-10 mx-auto w-2/5 ">

      <Checkbox
        attribute="important"
        value={currenFeature.important}
        onChange={handleChange}
        type="checkbox"
      >
        重點宣傳
      </Checkbox>

      <Textarea
        className="text-area"
        attribute="commercialInfo"
        value={currenFeature.commercialInfo}
        onChange={handleChange}
      >
        宣傳短語 / Info（必填）
      </Textarea>

      <Textarea
        className="text-area-large"
        attribute="note"
        value={currenFeature.note}
        onChange={handleChange}
      >
        備註 / note
      </Textarea>
    </div>
  );
}

export default EditNews;
