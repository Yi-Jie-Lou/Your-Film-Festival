import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFeatures } from "../actions";
import Textarea from "./Textarea";
import Checkbox from "./Checkbox";

function Note() {
  const dispatch = useDispatch();

  const currentTab = useSelector((state) => state.currentTab);
  const features = useSelector((state) => state.features);
  const [currenFeature, setCurrenFeature] = useState({
    commercialInfo: "",
    note: "",
    important: false,
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
    <div className="flex flex-col h-96 my-10 mx-auto w-2/5 ">
      <Checkbox
        attribute="important"
        className="checkbox-left"        
        onChange={handleChange}
        type="checkbox"
        value={currenFeature.important}
      >
        重點宣傳
      </Checkbox>

      <Textarea
        attribute="commercialInfo"
        className="text-area" 
        onChange={handleChange}
        value={currenFeature.commercialInfo}
      >
        宣傳短語 / Info（必填）
      </Textarea>

      <Textarea
        attribute="note"
        className="text-area-large"      
        onChange={handleChange}
        value={currenFeature.note}
      >
        備註 / note
      </Textarea>
    </div>
  );
}

export default Note;
