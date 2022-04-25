import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { AiOutlineCaretUp, AiFillStar } from "react-icons/ai";
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
    <div className="mx-auto w-11/12">
      {imgArray ? (
        <>
          <div className="flex justify-center mt-32 pb-12  border-b-2 border-stone-700 ">
            <div className="mx-6 w-5/12">
              <ImageGallery items={imgArray} />
            </div>

            <div className="mx-6 w-4/12">
              <h1 className="mt-6 text-3xl">{currentFeature.title}</h1>
              {currentFeature.creators.map((creator, index) => (
                <p className="my-4" key={index}>
                  {creator.name}
                </p>
              ))}

              <p>
                {currentFeature.year} | {currentFeature.nation}
              </p>
              <p>
                {currentFeature.format} | {currentFeature.color} |{" "}
                {currentFeature.length}分 |{currentFeature.language}
              </p>
              <p className="my-4">{currentFeature.longInfo}</p>
            </div>
          </div>
          <div className=" mt-16 pb-12  border-b-2 border-stone-700">
            <video
              className="border-2 mx-auto w-4/5  "
              src={currentFeature.trailer}
              type="video/mp4"
              controls
            />
          </div>
          <div className=" mt-16 pb-12">
            {currentFeature.creators.map((creator) => (
              <div className="flex justify-center">
                <div className="mx-4 w-1/4">
                  <p className="mb-6 text-xl">{creator.name}</p>
                  <img className="w-600 rounded-3xl" src={creator.img} />
                </div>
                <div className="vertical mx-4 w-1/2">
                  <p className="mt-12"> {creator.info}</p>
                </div>
              </div>
            ))}
            <div className="vertical mx-auto mt-8 w-4/5">
              {currentFeature.timetable.map((timetable,index) => (
                <NavLink key={index} to={`/preview/timetable/${timetable.date}`}>
                <div className="flex py-2 px-4 my-2 justify-between border-2 rounded-lg border-stone-700 bg-slate-400">
                  <p>
                    {timetable.date} {timetable.start}
                  </p>
                  <div className="flex">
                    <p>{timetable.location} </p>
                    <div className="vertical ml-2">
                      {timetable.workshop ? <AiFillStar /> : ""}
                    </div>
                    <div className="ml-2 mt-1">
                      {timetable.opening || timetable.closing ? (
                        <AiOutlineCaretUp />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                </NavLink>
              ))}
              <div>
                <div className="flex mt-6 my-2">
                  <AiFillStar className="mt-1 mr-1" />
                  <p>
                    {" "}
                    影人出席，場次為刊物付印前之最終確認，出刊後仍可能受全球疫情變化而有所調整，異動場次請以網站及現場公佈為準
                  </p>
                </div>
                <div className="flex my-2">
                  <AiOutlineCaretUp className="mt-1 mr-1" />
                  <p> 開幕片或閉幕片</p>
                </div>
                <div>
                  {currentFeature.note.split("\n").map((line, index) => (
                    <div className="my-2">
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
