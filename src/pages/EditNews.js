import { useDispatch, useSelector } from 'react-redux';

import uniqid from 'uniqid';

import Textarea from '../components/global/Textarea';
import Input from '../components/global/Input';
import Checkbox from '../components/global/Checkbox';
import useRoutePush from '../hooks/useRoutePush';
import checkUploadImgSize from '../helper/checkUploadSize';
import { updateNews } from '../actions';
import { firebase } from '../utils/firebase-config';
import { errorAlert } from '../utils/customAlert';
import PuzzleImg from '../img/Puzzle.png';

function EditNews() {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.userID);
  const news = useSelector((state) => state.news);
  const routerHandler = useRoutePush();

  const handleChange = (value, key, index) => {
    const newNews = [...news];
    newNews[index][key] = value;
    dispatch(updateNews(newNews));
  };

  const preview = async (e, index) => {
    const uploadImg = e.target.files[0];
    const isValidImgSize = checkUploadImgSize(uploadImg);
    if (!isValidImgSize) return;

    await firebase.uploadImgs(uploadImg);
    firebase.getUploadImgs(uploadImg).then((uploadUrl) => {
      const newNews = [...news];
      newNews[index].img = uploadUrl;
      dispatch(updateNews(newNews));
    });
  };

  const addNews = () => {
    const emptyNews = {
      title: '',
      img: '',
      important: false,
      content: '',
      newsID: uniqid(),
      isReadOnly: false,
    };
    const newNews = [emptyNews, ...news];
    dispatch(updateNews(newNews));
  };

  const deleteNews = (index) => {
    const newNews = [...news];
    newNews.splice(index, 1);
    dispatch(updateNews(newNews));
  };

  const editNews = (index) => {
    const newNews = [...news];
    newNews[index].isReadOnly = false;
    dispatch(updateNews(newNews));
  };

  const checkInputValue = () => {
    let isError = false;
    if (news.some((item) => !item.title.trim())) {
      errorAlert('舉辦地點不可以是空白的噢', PuzzleImg);
      isError = true;
      return isError;
    }
    return isError;
  };

  const saveNews = () => {
    const isError = checkInputValue();
    if (isError) return;

    const newNews = news.map((item) => {
      item.isReadOnly = true;
      return item;
    });
    dispatch(updateNews(newNews));

    firebase.saveNews(userID, news).then(() => {
      routerHandler(
        '影展越來越完整囉\n我們來制定票價和公告交通資訊吧',
        '/backstage/price'
      );
    });
  };

  return (
    <div className="flex flex-col mx-auto w-11/12 mt-24 mb-64 md:my-24 ">
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
              isReadOnly={item.isReadOnly}
              onChange={handleChange}
            >
              標題 / Title（必填）
            </Input>

            <div className="my-5">
              <label
                className="block w-full  rounded-lg text-center  border-4 border-[#94bed1]  cursor-pointer"
                htmlFor={`news${index}`}
              >
                {item.img ? (
                  <img
                    className="border-0 object-cover  w-full mr-0"
                    src={item ? item.img : ''}
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
              isReadOnly={item.isReadOnly}
              index={index}
              onChange={handleChange}
            >
              編輯消息 / News
            </Textarea>

            <Checkbox
              attribute="important"
              value={item.important}
              onChange={handleChange}
              index={index}
              type="checkbox"
              className={'checkbox-right'}
            >
              重點宣傳
            </Checkbox>
            <div className="flex justify-end mt-3 mb-9 ">
              <button
                className="button-orange"
                onClick={() => {
                  editNews(index);
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
        <button onClick={saveNews} className="button-blue  mx-0">
          儲存本頁
        </button>
      </div>
    </div>
  );
}

export default EditNews;
