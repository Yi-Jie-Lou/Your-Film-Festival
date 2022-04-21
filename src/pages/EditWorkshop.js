import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Textarea from "../components/Textarea";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { updateWorkshop } from "../actions";
import { firebase } from "../utils/firebase-config";

function EditWorkshopContainer() {
  const dispatch = useDispatch();
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

    await firebase.uploadImgs(uploadImg);
    firebase.getUploadImgs(uploadImg).then((uploadUrl) => {
      const newWorkshop = [...workshop];
      newWorkshop[index].img = uploadUrl;
      dispatch(updateWorkshop(newWorkshop));
    });
  };

  const previewGuest = async (e, index) => {
    if (!e.target.files[0]) return;
    const uploadImg = e.target.files[0];

    await firebase.uploadImgs(uploadImg);
    firebase.getUploadImgs(uploadImg).then((uploadUrl) => {
      const newWorkshop = [...workshop];
      newWorkshop[index].img = uploadUrl;
      dispatch(updateWorkshop(newWorkshop));
    });
  };

  const addWorkshop = () => {
    const emptyWorkshop = {
      title: "",
      img: "",
      text: "",
      guest: [""],
    };
    const newWorkshop = [...workshop, emptyWorkshop];
    dispatch(updateWorkshop(newWorkshop));
  };

  const deleteWorkshop = (index) => {
    const newWorkshop = [...workshop];
    newWorkshop.splice(index, 1);
    dispatch(updateWorkshop(newWorkshop));
  };

  const addGuest = () => {
    alert("success!");
  };

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
              onChange={handleChange}
            >
              工作坊名稱 / Title（必填）
            </Input>

            <div className="my-5">
              <label
                className="block w-full  rounded-lg text-center  border-2 border-zinc-900 cursor-pointer"
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
              onChange={handleChange}
            >
              工作坊資訊 / Imformation
            </Textarea>
            <div className="flex mt-12 mb-6">
              <h2 className="flex mt-1 text-xl">
                <span>影人出席</span>
              </h2>
              <button className="button-blue" onClick={addGuest}>
                Add
              </button>
            </div>
            <div className="flex">
              {item.guest.map((guest, guestIndex) => (
                <div key={guestIndex} className="mx-6 my-10">
                  <label
                    className="block w-48 h-48 rounded-full text-center  border-2 border-zinc-900 cursor-pointer"
                    htmlFor={`guest${index}${guestIndex}`}
                  >
                    {guest ? (
                      <img
                        className="border-0 object-cover  mr-0"
                        src={guest ? guest : ""}
                      />
                    ) : (
                      <p className="flex flex-col justify-center h-full">
                        <span>上傳圖片</span>
                      </p>
                    )}
                    <input
                      id={`guest${index}${guestIndex}`}
                      className="hidden border-1 "
                      type="file"
                      accept="image/*"
                      onChange={(e) => previewGuest(e, index)}
                    />
                  </label>
                  <div className="flex justify-center mt-6">
                  <button
                    className="button-red mx-0"
                    onClick={() => {
                      deleteWorkshop(index);
                    }}
                  >
                    Delete
                  </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-3 mb-9 ">
              <button
                className="button-green"
                onClick={() => {
                  deleteWorkshop(index);
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
          onClick={() => firebase.saveWorkshop(userID, workshop)}
          className="button-blue"
        >
          儲存本頁
        </button>
      </div>
    </div>
  );
}

function EditWorkshop() {
  return (
    <>
      <Header userState={"editing"} />
      <EditWorkshopContainer />
      <Footer />
    </>
  );
}

export default EditWorkshop;
