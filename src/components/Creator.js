import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFeatures } from "../actions";
import { firebase } from "../utils/firebase-config";
import Input from "./Input";
import Textarea from "./Textarea";

function Creator() {
  const dispatch = useDispatch();

  const currentTab = useSelector((state) => state.currentTab);
  const features = useSelector((state) => state.features);
  const [currentFeatureCreators, setCurrentFeatureCreators] = useState([{
    name: "",
    img: "",
    info: "",
  }]);

  const addCreators = () => {
    const emptyCreator = {
      name: "",
      img: "",
      info: "",
    };

    const newFeatures = [...features];
    const editIndex = newFeatures.findIndex(
      (item) => item.featureID === currentTab
    );
    newFeatures[editIndex].creators = [...currentFeatureCreators, emptyCreator];
    dispatch(updateFeatures(newFeatures));
  };

  const deleteCreators = (index) => {
    const newFeatures = [...features];
    const editIndex = newFeatures.findIndex(
      (item) => item.featureID === currentTab
    );
    newFeatures[editIndex].creators.splice(index, 1);
    dispatch(updateFeatures(newFeatures));
  };

  const preview = async (e, index) => {
    if (!e.target.files[0]) return;
    const uploadImg = e.target.files[0];

    await firebase.uploadImgs(uploadImg);
    firebase.getUploadImgs(uploadImg).then((uploadUrl) => {
      console.log(uploadUrl);
      const newFeatures = [...features];
      const newCreators = [...currentFeatureCreators];
      newCreators[index].img = uploadUrl;

      const editIndex = newFeatures.findIndex(
        (item) => item.featureID === currentTab
      );
      newFeatures[editIndex].creators = newCreators;

      dispatch(updateFeatures(newFeatures));
    });
  };

  const handleChange = (value, key, index) => {
    const newFeatures = [...features];
    const newCreators = [...currentFeatureCreators];
    newCreators[index][key] = value;
    const editIndex = newFeatures.findIndex(
      (item) => item.featureID === currentTab
    );
    newFeatures[editIndex].creators = newCreators;
    dispatch(updateFeatures(newFeatures));
  };

  useEffect(() => {
    if (!currentTab) return;
    const current = features.filter((item) => item.featureID === currentTab);
    setCurrentFeatureCreators(current[0].creators);
  }, [currentTab, features]);

  return (
    <>
      <div className="flex flex-col  mt-8 pb-8  w-11/12 mx-auto border-b-2 border-b-zinc-400 ">
        <div className="flex flex-wrap justify-start ">
          {currentFeatureCreators &&
            currentFeatureCreators.map((item, index) => (
              <div key={index} className="flex mx-2 flex-col  ">
                <div className="flex">
                  <h2 className="flex flex-col justify-center">
                    <span>創作者</span>
                  </h2>
                  <button
                    className="ml-3 my-6 py-1  w-28 border-2 rounded-lg  bg-red-300"
                    onClick={() => {
                      deleteCreators(index);
                    }}
                  >
                    Delete
                  </button>
                </div>
                <div className="flex my-4">
                  <div className="flex flex-col  w-full">
                    <Input
                      attribute="name"
                      value={item.name}
                      index={index}
                      onChange={handleChange}
                      className="input-full"
                    >
                      創作者姓名 / Name of Creator （必填）
                    </Input>
                    <Textarea
                      className="text-area"
                      attribute="info"
                      value={item.info}
                      index={index}
                      onChange={handleChange}
                    >
                      創作者介紹 / Creator info（必填）
                    </Textarea>
                  </div>

                  <div className="w-96  mx-8">
                    <label
                      className="block border-2 h-56 w-full rounded-lg text-center cursor-pointer"
                      htmlFor={`creator${index}`}
                    >
                      {item.img && (
                        <img
                          className="border-0 object-cover h-56 w-full mr-0"
                          src={item.img}
                        />
                      )}
                      <input
                        id={`creator${index}`}
                        className="hidden border-1 "
                        type="file"
                        accept="image/*"
                        onChange={(e) => preview(e, index)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <button
          className="ml-3 my-6 py-1  w-28 border-2 rounded-lg bg-blue-300"
          onClick={() => {
            addCreators();
          }}
        >
          Add
        </button>
      </div>
    </>
  );
}

export default Creator;
