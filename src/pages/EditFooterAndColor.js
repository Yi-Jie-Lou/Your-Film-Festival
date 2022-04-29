import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSponsor,
  updatePrimaryColor,
  updateSecondaryColor,
} from "../actions";
import { firebase } from "../utils/firebase-config";
import Input from "../components/Input";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ColorCube from "../components/ColorCube";

function EditFooterContent() {
  const dispatch = useDispatch();
  const primaryColor = useSelector((state) => state.primaryColor);
  const secondaryColor = useSelector((state) => state.secondaryColor);
  const sponsor = useSelector((state) => state.sponsor);
  const userID = useSelector((state) => state.userID);

  const handleChange = (value, _, index) => {
    const newSponsor = { ...sponsor };
    newSponsor.text[index] = value;
    dispatch(updateSponsor(newSponsor));
  };
  const handleColorCode = (e, key) => {
    switch (key) {
      case "primary":
        return dispatch(updatePrimaryColor(e.target.value));
      case "secondary":
        return dispatch(updateSecondaryColor(e.target.value));
      default:
        throw new Error();
    }
  };

  const addSponsor = (key) => {
    const newSponsor = { ...sponsor };
    newSponsor[key].push("");
    dispatch(updateSponsor(newSponsor));
  };

  const previewSponsorImg = async (e, index) => {
    if (!e.target.files[0]) return;
    const uploadImg = e.target.files[0];

    await firebase.uploadImgs(uploadImg);
    firebase.getUploadImgs(uploadImg).then((uploadUrl) => {
      const newSponsor = { ...sponsor };
      newSponsor.img[index] = uploadUrl;
      dispatch(updateSponsor(newSponsor));
    });
  };

  const deleteSponsorImg = (index) => {
    const newSponsor = { ...sponsor };
    newSponsor.img.splice(index, 1);
    dispatch(updateSponsor(newSponsor));
  };
  const deleteSponsorText = (index) => {
    const newSponsor = { ...sponsor };
    newSponsor.text.splice(index, 1);
    dispatch(updateSponsor(newSponsor));
  };


  return (
    <>
      <div className="flex flex-col flex-wrap justify-around w-11/12 my-8 pb-8  mx-auto  ">
        <h1 className=" w-full mx-auto mt-28 mb-3 border-b-2 border-b-stone-700 text-2xl tracking-wider">
          增加贊助商
        </h1>
        <button
          className=" my-3 py-1  w-28 border-2 rounded-lg bg-blue-300"
          onClick={() => {
            addSponsor("text");
          }}
        >
          Add
        </button>
        <div className="flex flex-wrap w-full mb-4 ">
          {sponsor &&
            sponsor.text.map((item, index) => (
              <div key={index} className="flex w-550">
                <Input
                  attribute="text"
                  value={item}
                  index={index}
                  onChange={handleChange}
                  className="input-full"
                >
                  贊助商 / Sponsor
                </Input>
                <div className="vertical mx-6">
                  <button
                    className="button-red"
                    onClick={() => {
                      deleteSponsorText(index);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="flex flex-col  ">
          <button
            className=" mt-8 py-1  w-28 border-2 rounded-lg bg-blue-300"
            onClick={() => {
              addSponsor("img");
            }}
          >
            Add
          </button>
          <div className="flex flex-wrap w-full mb-4 ">
            {sponsor &&
              sponsor.img.map((item, index) => (
                <div key={index} className="flex flex-wrap mx-6  my-12 w-250">
                  <label
                    className="block w-52 h-52  rounded-full text-center  border-2 border-zinc-900 cursor-pointer"
                    htmlFor={`sponsor${index}`}
                  >
                    {item ? (
                      <img
                        className="border-0 object-cover rounded-full  w-full h-full mr-0"
                        src={item}
                      />
                    ) : (
                      <p className="flex flex-col justify-center h-full">
                        <span>上傳圖片</span>
                      </p>
                    )}
                    <input
                      id={`sponsor${index}`}
                      className="hidden border-1 "
                      type="file"
                      accept="image/*"
                      onChange={(e) => previewSponsorImg(e, index)}
                    />
                    <div className="flex justify-center mt-6">
                      <button
                        className="button-red"
                        onClick={() => {
                          deleteSponsorImg(index);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <h1 className=" w-full mx-auto mt-32 mb-8 border-b-2 border-stone-700 text-2xl tracking-wider">
          選擇主色 / Primary color
        </h1>
        <ColorCube color={"primary"} />
        <h1 className=" w-full mx-auto mt-14 mb-8 border-b-2 border-stone-700 text-2xl tracking-wider">
          選擇輔色 / Secondary color
        </h1>
        <ColorCube color={"secondary"} />
        <div className="flex flex-col mt-12">
          <div className="flex justify-center my-4">
            <h1 className="vertical mx-4 text-2xl">
              <span>您選擇的主色為：</span>
            </h1>
            <input
              value={primaryColor}
              onChange={(e) => {
                handleColorCode(e, "primary");
              }}
              className=" w-36 h-10 pl-3 mt-1 outline-none border-2 border-gray-400 rounded-xl "
            ></input>
            <div
              style={{ background: primaryColor }}
              className={` h-12 w-24 mx-4 rounded-lg  `}
            ></div>
          </div>
          <div className="flex justify-center my-4">
            <h1 className="vertical mx-4 text-2xl">
              <span>您選擇的輔色為：</span>
            </h1>
            <input
              value={secondaryColor}
              onChange={(e) => {
                handleColorCode(e, "secondary");
              }}
              className=" w-36 h-10 pl-3 mt-1 outline-none border-2 border-gray-400 rounded-xl "
            ></input>
            <div
              style={{ background: secondaryColor }}
              className={` h-12 w-24 mx-4 rounded-lg `}
            ></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-24">
        <button
          onClick={() => {
            firebase.saveSponsor(userID, sponsor, primaryColor, secondaryColor);
          }}
          className="w-28 p-2 mx-2 border-2 rounded-lg bg-blue-300"
        >
          儲存本頁
        </button>
      </div>
    </>
  );
}

function EditFooterAndColor() {
  return (
    <>
      <Header userState={"editing"} />
      <EditFooterContent />
      <Footer />
    </>
  );
}

export default EditFooterAndColor;
