import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../global/Input';
import Textarea from '../global/Textarea';
import { updateFeatures } from '../../actions';
import checkUploadImgSize from '../../helper/checkUploadSize';
import { firebase } from '../../utils/firebase-config';

function Creator() {
  const dispatch = useDispatch();

  const currentTab = useSelector((state) => state.currentTab);
  const features = useSelector((state) => state.features);
  const [currentFeatureCreators, setCurrentFeatureCreators] = useState([
    {
      name: '',
      img: '',
      info: '',
    },
  ]);

  const addCreators = () => {
    const emptyCreator = {
      name: '',
      img: '',
      info: '',
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
    const uploadImg = e.target.files[0];
    const isValidImgSize = checkUploadImgSize(uploadImg);
    if (!isValidImgSize) return;

    await firebase.uploadImgs(uploadImg);
    firebase.getUploadImgs(uploadImg).then((uploadUrl) => {
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
              <div key={index} className="flex flex-col | mx-auto | md:mx-2  ">
                <div className="flex">
                  <h2 className="flex flex-col justify-center">
                    <span className="text-2xl text-slate-600 ml-1">?????????</span>
                  </h2>
                  <button
                    className="button-red ml-3 my-6 h-10 w-24 "
                    onClick={() => {
                      deleteCreators(index);
                    }}
                  >
                    Delete
                  </button>
                </div>
                <div className="flex my-4 flex-col | md:flex-row">
                  <div className="flex flex-col  w-full">
                    <Input
                      attribute="name"
                      value={item.name}
                      index={index}
                      onChange={handleChange}
                      className="input-full"
                    >
                      ??????????????? / Name of Creator ????????????
                    </Input>
                    <Textarea
                      className="text-area"
                      attribute="info"
                      value={item.info}
                      index={index}
                      onChange={handleChange}
                    >
                      ??????????????? / Creator info????????????
                    </Textarea>
                  </div>

                  <div className="vertical w-full mx-auto | md:w-96 md:mx-8">
                    <label
                      className="block border-4 min-h-[208px] h- w-full rounded-lg text-center cursor-pointer border-[#628fa4] my-2 | md:my-0"
                      htmlFor={`creator${index}`}
                    >
                      {item.img && (
                        <img
                          className="border-0 object-cover h-52 w-full mr-0"
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
          className="button-blue my-6 h-10 w-24 | mx-auto | md:ml-3 "
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
