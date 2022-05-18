import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ImageGallery from "react-image-gallery";

import Details from "../components/featureDetails/Details";
import Trailer from "../components/featureDetails/Trailer";
import Creators from "../components/featureDetails/Creators";
import TimetableLink from "../components/featureDetails/TimetableLink";
import Reminder from "../components/featureDetails/Reminder";


function FeatureDetails(props) {
  const features = useSelector((state) => state.features);
  const [currentFeatureObject, setCurrentFeatureObject] = useState();
  const [imgArray, setImgArray] = useState();
  const currentID = useParams();

  useEffect(() => {
    const currentOne = features.filter(
      (item) => item.featureID === currentID.id
    );
    setCurrentFeatureObject(...currentOne);
  }, [features]);

  useEffect(() => {
    if (!currentFeatureObject) return;
    const imgArray = currentFeatureObject.featureImgs.map((item) => ({
      original: item,
      thumbnail: item,
    }));
    setImgArray(imgArray);
  }, [currentFeatureObject]);

  return (
    <div className="mx-auto min-h-200  w-11/12">
      {imgArray && (
        <>
          <div className="flex justify-center mt-36 pb-12 max-h-[500px]  border-b-2 border-stone-500 ">
            <div className="vertical mx-6 w-[50%] ">
              <ImageGallery items={imgArray} />
            </div>

            <div className=" mx-6 w-4/12">
              <Details currentFeatureObject={currentFeatureObject} />
            </div>
          </div>
          <div className=" mt-16 pb-12  border-b-2 border-stone-500">
            <Trailer currentFeatureObject={currentFeatureObject} />
          </div>
          <div className=" mt-16 pb-12">
            <Creators currentFeatureObject={currentFeatureObject} />

            <div className="vertical mx-auto mt-8 w-4/5">
              <TimetableLink
                userState={props.userState}
                currentFeatureObject={currentFeatureObject}
              />
              <Reminder currentFeatureObject={currentFeatureObject} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FeatureDetails;
