import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";



function FeatureContainer() {
  const features = useSelector((state) => state.features);
  const [currentFeature, setCurrentFeature] = useState();
  const [imgArray, setImgArray] = useState();
  const currentID = useParams();

  useEffect(() => {
    const currentOne = features.filter(
      (item) => item.featureID === currentID.id
    );
    setCurrentFeature(...currentOne);
  }, [features]);

  useEffect(() => {
    if (!currentFeature) return;
    const imgArray = currentFeature.featureImgs.map((item) => ({
      original: item,
      thumbnail: item,
    }));
    setImgArray(imgArray);
  }, [currentFeature]);

  return (
    <div className="flex justify-center mt-32 ">
      {imgArray ? (
        <>
          <div className="mx-6 w-5/12">
            {/* {currentFeature.featureImgs.map((item, index) => (
              <img key={index} src={item} />
            ))} */}
            <ImageGallery  items={imgArray} />
          </div>

          <div className="mx-6 w-4/12">
            <h1>{currentFeature.title}</h1>
            {currentFeature.creators.map((creator, index) => (
              <p key={index}>{creator.name}</p>
            ))}

            <p>
              {currentFeature.year}| {currentFeature.nation}
            </p>
            <p>
              {currentFeature.format}|{currentFeature.color}|
              {currentFeature.length}分|
              {currentFeature.language}
            </p>
            <p>{currentFeature.longInfo}</p>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

function FeatureInformation() {
  return (
    <>
      <Header userState={"preview"} />
      <FeatureContainer />
      <Footer />
    </>
  );
}

export default FeatureInformation;
