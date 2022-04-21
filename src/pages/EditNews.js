import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Textarea from "../components/Textarea";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { updateNews } from "../actions";
import { firebase } from "../utils/firebase-config";

function EditNewsContainer() {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.userID);
  const news = useSelector((state) => state.news);

  const handleChange = (value, key, index) => {
    const newNews = [...news];
    newNews[index][key] = value;
    dispatch(updateNews(newNews));
  };

  const preview = async (e, index) => {
    if (!e.target.files[0]) return;
    const uploadImg = e.target.files[0];

    await firebase.uploadImgs(uploadImg);
    firebase.getUploadImgs(uploadImg).then((uploadUrl) => {
      const newNews = [...news];
      newNews[index].img = uploadUrl;
      dispatch(updateNews(newNews));
    });
  };

  const addNews = () => {
    const emptyNews = {
      title: "",
      img: "",
      important: "",
      content: "",
    };
    const newNews = [...news, emptyNews];
    dispatch(updateNews(newNews));
  };

  const deleteNews = (index) => {
    const newNews = [...news];
    newNews.splice(index, 1);
    dispatch(updateNews(newNews));
  };

  return (
    <div className="flex flex-col  my-24 mx-auto w-11/12">
      <button className="button-blue ml-0 my-3" onClick={addNews}>
        Add
      </button>
      {news &&
        news.map((item, index) => (
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
              標題 / Title（必填）
            </Input>

            <div className="my-5">
              <label
                className="block w-full  rounded-lg text-center  border-2 border-zinc-900 cursor-pointer"
                htmlFor={`news${index}`}
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
                  id={`news${index}`}
                  className="hidden border-1 "
                  type="file"
                  accept="image/*"
                  onChange={(e) => preview(e, index)}
                />
              </label>
            </div>
            <Textarea
              className="text-area-large"
              attribute="content"
              value={item.content}
              index={index}
              onChange={handleChange}
            >
              編輯消息 / News
            </Textarea>

            <Checkbox
              attribute="important"
              value={news.important}
              onChange={handleChange}
              index={index}
              type="checkbox"
              className={"checkbox-right"}
            >
              重點宣傳
            </Checkbox>
            <div className="flex justify-end mt-3 mb-9 ">
              <button
                className="button-green"
                onClick={() => {
                  deleteNews(index);
                }}
              >
                Edit
              </button>
              <button
                className="button-red"
                onClick={() => {
                  deleteNews(index);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      <div className="flex justify-center mt-12 w-full">
        <button
          onClick={() => firebase.saveNews(userID, news)}
          className="button-blue"
        >
          儲存本頁
        </button>
      </div>
    </div>
  );
}

function EditNews() {
  return (
    <>
      <Header userState={"editing"} />
      <EditNewsContainer />
      <Footer />
    </>
  );
}

export default EditNews;
