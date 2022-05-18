import React from "react";
import { useDispatch, useSelector } from "react-redux";

import uniqid from "uniqid";

import Textarea from "../components/Textarea";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import Cropper from "../components/Cropper";
import useRoutePush from "../hooks/useRoutePush";
import { updateWorkshop } from "../actions";
import { firebase } from "../utils/firebase-config";
import { limitAlert, errorAlert } from "../utils/customAlert";
import DarkBlueCloudImg from "../img/DarkBlueCloud.png";
import PuzzleImg from "../img/Puzzle.png";

function EditWorkshop() {
  const dispatch = useDispatch();
  const routerHandler = useRoutePush()
  const userID = useSelector((state) => state.userID);
  const workshop = useSelector((state) => state.workshop);


  const handleChange = (value, key, index) => {
    const newWorkshop = [...workshop];
    newWorkshop[index][key] = value;
    dispatch(updateWorkshop(newWorkshop));
  };

  const preview = async (e, index) => {
    if (!e.target.files[0]) return;
    const uploadImg = e.target.files[0];
    const uploadSize = e.target.files[0].size;

    if (uploadSize / 1024 > 200) {
      limitAlert(
        `上傳檔案需請小於200KB\n您的檔案為${Math.floor(uploadSize / 1024)}KB`
      , DarkBlueCloudImg);
      return;
    }
    

    await firebase.uploadImgs(uploadImg);
    firebase.getUploadImgs(uploadImg).then((uploadUrl) => {
      const newWorkshop = [...workshop];
      newWorkshop[index].img = uploadUrl;
      dispatch(updateWorkshop(newWorkshop));
    });
  };

  const previewGuest = async (e, index, guestIndex) => {
    if (!e.target.files[0]) return;
    const uploadImg = e.target.files[0];
    const uploadSize = e.target.files[0].size;

    if (uploadSize / 1024 > 200) {
      limitAlert(
        `上傳檔案需請小於200KB\n您的檔案為${Math.floor(uploadSize / 1024)}KB`
      , DarkBlueCloudImg);
      return;
    }

    await firebase.uploadImgs(uploadImg);
    firebase.getUploadImgs(uploadImg).then((uploadUrl) => {
      const newWorkshop = [...workshop];
      newWorkshop[index].guest.splice(guestIndex, 1, uploadUrl);
      dispatch(updateWorkshop(newWorkshop));
    });
  };

  const addWorkshop = () => {
    const emptyWorkshop = {
      title: "",
      img: "",
      text: "",
      guest: [""],
      workshopID: uniqid(),
      isReadOnly:false
    };
    const newWorkshop = [emptyWorkshop, ...workshop];
    dispatch(updateWorkshop(newWorkshop));
  };

  const deleteWorkshop = (index) => {
    const newWorkshop = [...workshop];
    newWorkshop.splice(index, 1);
    dispatch(updateWorkshop(newWorkshop));
  };

  const addGuest = (index) => {
    const newWorkshop = [...workshop];
    newWorkshop[index].guest.push("");
    dispatch(updateWorkshop(newWorkshop));
  };

  const deleteGuest = (index, guestIndex) => {
    const newWorkshop = [...workshop];
    newWorkshop[index].guest.splice(guestIndex, 1);
    dispatch(updateWorkshop(newWorkshop));
  };

  const editWorkshop = (index) => {
    const newWorkshop = [...workshop];
    newWorkshop[index].isReadOnly = false;
    dispatch(updateWorkshop(newWorkshop));
  }

  const saveWorkshop= () => {

    if(workshop.some(item => (!item.title.trim()))){
      errorAlert("工作坊名稱不可以是空白的噢", PuzzleImg);
      return
    }

    const newWorkshop= workshop.map(item => {
      item.isReadOnly = true
      return item
    })
    dispatch(updateWorkshop(newWorkshop));

    firebase.saveWorkshop(userID, workshop).then((_) =>{
      routerHandler("最後，來點顏色和增加贊助商吧","/backstage/edit-footer-color")
    })
  }

  return (
    <div className="flex flex-col  my-24 mx-auto w-11/12">
      <button className="button-blue ml-0 my-3" onClick={addWorkshop}>
        Add
      </button>
      {workshop &&
        workshop.map((item, index) => (
          <div
            key={index}
            className="flex flex-col mb-12 border-b-2 border-b-zinc-400"
          >
            <Input
              className="input-full"
              attribute="title"
              value={item.title}
              index={index}
              isReadOnly={item.isReadOnly}
              onChange={handleChange}
            >
              工作坊名稱 / Title（必填）
            </Input>

            <div className="my-5">
              <label
                className="block w-full  rounded-lg text-center  border-4 border-[#94bed1]  cursor-pointer"
                htmlFor={`workshop${index}`}
              >
                {item.img ? (
                  <img
                    className="border-0 object-cover  w-full mr-0"
                    src={item ? item.img : ""}
                  />
                ) : (
                  <p className="flex flex-col justify-center h-full">
                    <span>上傳圖片</span>
                  </p>
                )}
                <input
                  id={`workshop${index}`}
                  className="hidden border-1 "
                  type="file"
                  accept="image/*"
                  onChange={(e) => preview(e, index)}
                />
              </label>
            </div>
            <Textarea
              className="text-area-large"
              attribute="text"
              value={item.text}
              index={index}
              isReadOnly={item.isReadOnly}
              onChange={handleChange}
            >
              工作坊資訊 / Imformation
            </Textarea>
            <div className="flex mt-12 mb-6">
              <h2 className="flex mt-1 text-xl">
                <span>影人出席</span>
              </h2>
              <button className="button-blue" onClick={() => addGuest(index)}>
                Add
              </button>
            </div>
            <div className="flex flex-wrap">


            {item.guest.map((guest, guestIndex) => (

              guest?  <div key={guestIndex} className="mx-6 my-10">
                  <label
                    className="block w-52 h-52 rounded-full text-center  border-4 border-[#94bed1]  cursor-pointer"
                    htmlFor={`guest${index}${guestIndex}`}
                  >
                    <img
                        className="border-0 object-cover  w-full h-full rounded-full  mr-0"
                        src={guest ? guest : ""}
                      />
                    <input
                      id={`guest${index}${guestIndex}`}
                      className="hidden border-1 "
                      type="file"
                      accept="image/*"
                      onChange={(e) => previewGuest(e, index, guestIndex)}
                    />
                  </label>
                  <div className="flex justify-center mt-6">
                    <button
                      className="button-red mx-0"
                      onClick={() => {
                        deleteGuest(index, guestIndex);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div> :

              <Cropper key={guestIndex} workshopNum={index} guestNum={guestIndex} />
            ))}
  
            </div>
            <div className="flex justify-center mx-auto  my-12 w-96 border-4 border-[#94bed1] rounded-2xl ">
              <p className="flex flex-col justify-center mr-6">
                <span>表單需求</span>
              </p>
              <Checkbox
                attribute="name"
                className="checkbox-left  w-16 mx-1"
                onChange={handleChange}
                type="checkbox"
                index={index}
                value={item.name}
              >
                姓名
              </Checkbox>
              <Checkbox
                attribute="phone"
                className="checkbox-left w-16 mx-1"
                onChange={handleChange}
                type="checkbox"
                index={index}
                value={item.phone}
              >
                電話
              </Checkbox>
              <Checkbox
                attribute="email"
                className="checkbox-left  w-16 mx-1"
                onChange={handleChange}
                type="checkbox"
                index={index}
                value={item.email}
              >
                Email
              </Checkbox>
            </div>
            <div className="flex justify-end mt-3 mb-9 ">
              <button
                className="button-orange"
                onClick={() => {
                  editWorkshop(index);
                }}
              >
                Edit
              </button>
              <button
                className="button-red"
                onClick={() => {
                  deleteWorkshop(index);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      <div className="flex justify-center mt-12 w-full">
        <button
          onClick={saveWorkshop}
          className="button-blue my-0  mx-0"
        >
          儲存本頁
        </button>
      </div>
    </div>
  );
} 

export default EditWorkshop;
