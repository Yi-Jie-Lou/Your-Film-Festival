import { useDispatch, useSelector } from 'react-redux';

import Textarea from '../components/Textarea';
import Input from '../components/Input';
import useRoutePush from '../hooks/useRoutePush';
import checkUploadImgSize from '../helper/checkUploadSize';
import { updatePrice, updateTraffic } from '../actions';
import { firebase } from '../utils/firebase-config';
import { errorAlert } from '../utils/customAlert';
import PuzzleImg from '../img/Puzzle.png';

function EditPrice() {
  const dispatch = useDispatch();
  const routerHandler = useRoutePush();
  const userID = useSelector((state) => state.userID);
  const price = useSelector((state) => state.price);
  const traffic = useSelector((state) => state.traffic);

  const handleChange = (value, key, index) => {
    const newPrice = [...price];
    newPrice[index][key] = value;
    dispatch(updatePrice(newPrice));
  };

  const handleTrafficChange = (value, key, index) => {
    const newTraffic = [...traffic];
    newTraffic[index][key] = value;
    dispatch(updateTraffic(newTraffic));
  };

  const handleTicketChange = (value, key, indexObj) => {
    const newPrice = [...price];
    newPrice[indexObj.categoryIndex].tickets[indexObj.ticketIndex][key] = value;
    dispatch(updatePrice(newPrice));
  };

  const preview = async (e, index) => {
    const uploadImg = e.target.files[0];
    const isValidImgSize = checkUploadImgSize(uploadImg);
    if (!isValidImgSize) return;

    await firebase.uploadImgs(uploadImg);
    firebase.getUploadImgs(uploadImg).then((uploadUrl) => {
      const newTraffic = [...traffic];
      newTraffic[index].img = uploadUrl;
      dispatch(updateTraffic(newTraffic));
    });
  };

  const addPrice = () => {
    const emptyPrice = {
      category: '',
      marketing: '',
      saleTime: '',
      tickets: [{ kind: '', price: '' }],
    };
    const newPrice = [...price, emptyPrice];
    dispatch(updatePrice(newPrice));
  };

  const deletePrice = (index) => {
    if (price.length < 2) return;
    const newPrice = [...price];
    newPrice.splice(index, 1);
    dispatch(updatePrice(newPrice));
  };

  const addTicket = (categoryIndex) => {
    const newPrice = [...price];
    const newTickets = newPrice[categoryIndex].tickets;
    const emptyTicket = {
      kind: '',
      price: '',
    };
    newPrice[categoryIndex].tickets = [...newTickets, emptyTicket];
    dispatch(updatePrice(newPrice));
  };

  const deleteTicket = (categoryIndex, editIndex) => {
    const newPrice = [...price];
    if (newPrice[categoryIndex].tickets.length < 2) return;
    newPrice[categoryIndex].tickets.splice(editIndex, 1);
    dispatch(updatePrice(newPrice));
  };
  const addTraffic = () => {
    const emptyTraffic = {
      text: '',
      img: '',
    };
    const newTraffic = [...traffic, emptyTraffic];
    dispatch(updateTraffic(newTraffic));
  };

  const deleteTraffic = (index) => {
    const newTraffic = [...traffic];
    if (newTraffic.length < 2) return;
    newTraffic.splice(index, 1);
    dispatch(updateTraffic(newTraffic));
  };

  const checkInputValue = () => {
    let isError = false;

    price.forEach((item) => {
      if (
        !item.category.trim() ||
        !item.saleTime.trim() ||
        !item.marketing.trim()
      ) {
        isError = true;
      }

      item.tickets.forEach((ticket) => {
        if (!ticket.kind.trim() || !ticket.price.trim()) {
          isError = true;
        }
      });
    });

    if (isError) {
      errorAlert('售票資訊有空白欄位噢', PuzzleImg);
      return isError;
    }
    return isError;
  };

  const savePrice = () => {
    const isError = checkInputValue();
    if (isError) return;

    firebase.savePricePage(userID, price, traffic).then((_) => {
      routerHandler('就要完成囉\n快來建立一個工作坊吧', '/backstage/workshop');
    });
  };

  return (
    <div className="flex flex-col  my-24 mx-auto w-11/12">
      <div className="flex ml-1">
        <h2 className="vertical ">
          <span className="text-2xl text-slate-600 mr-4 ">售票資訊</span>
        </h2>
        <button className="button-blue my-3" onClick={addPrice}>
          Add
        </button>
      </div>
      {price &&
        price.map((item, index) => (
          <div
            key={index}
            className="flex flex-col pb-12 mb-12 border-b-2 border-b-zinc-400"
          >
            <div className="flex">
              <Input
                attribute="category"
                value={item.category}
                onChange={handleChange}
                index={index}
                className="input-30 ml-0 mr-4"
              >
                分類 / Category（必填）
              </Input>
              <button
                className="button-red my-auto"
                onClick={() => {
                  deletePrice(index);
                }}
              >
                Delete
              </button>
            </div>
            {item.tickets.map((ticket, ticketIndex) => (
              <div key={ticketIndex} className="flex">
                <Input
                  attribute="kind"
                  value={ticket.kind}
                  onChange={handleTicketChange}
                  index={{ categoryIndex: index, ticketIndex }}
                  className="input-30 ml-0 mr-4"
                >
                  票種 / Category of Ticket（必填）
                </Input>
                <Input
                  attribute="price"
                  value={ticket.price}
                  onChange={handleTicketChange}
                  index={{ categoryIndex: index, ticketIndex }}
                  className="input-30 ml-0 mr-4"
                >
                  票價 / Price（必填）
                </Input>
                <button
                  className="button-blue my-auto"
                  onClick={() => {
                    addTicket(index);
                  }}
                >
                  Add
                </button>
                <button
                  className="button-red  my-auto"
                  onClick={() => {
                    deleteTicket(index, ticketIndex);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
            <Input
              attribute="saleTime"
              value={item.saleTime}
              onChange={handleChange}
              index={index}
              className="input-30 ml-0 mr-4"
            >
              銷售時間 / Time of Sale（必填）
            </Input>
            <Input
              attribute="marketing"
              value={item.marketing}
              onChange={handleChange}
              index={index}
              className="input-30 ml-0 mr-4"
            >
              銷售通路 / Marketing channel（必填）
            </Input>
          </div>
        ))}
      <div className="flex ml-1">
        <h2 className="vertical ">
          <span className="text-2xl text-slate-600 mr-4 ">交通資訊</span>
        </h2>
        <button
          className="button-blue my-auto"
          onClick={() => {
            addTraffic();
          }}
        >
          Add
        </button>
      </div>
      {traffic &&
        traffic.map((item, index) => (
          <div
            key={index}
            className="flex  mt-6 pb-12 border-b-2 border-b-zinc-400"
          >
            <Textarea
              className="text-area-large w-1/3 mx-0"
              attribute="text"
              value={item.text}
              index={index}
              onChange={handleTrafficChange}
            >
              交通資訊
            </Textarea>
            <div className="flex flex-col justify-center w-96 mx-8" key={index}>
              <label
                className="block border-4 min-h-[256px] w-full rounded-lg  text-center cursor-pointer border-[#94bed1]"
                htmlFor={`traffic${index}`}
              >
                {item.img ? (
                  <img
                    className="border-0 object-cover h-64 w-full mr-0"
                    src={item ? item.img : ''}
                  />
                ) : (
                  ''
                )}
                <input
                  id={`traffic${index}`}
                  className="hidden border-1 "
                  type="file"
                  accept="image/*"
                  onChange={(e) => preview(e, index)}
                />
              </label>
            </div>
            <div className="flex">
              <button
                className="button-red  my-auto"
                onClick={() => {
                  deleteTraffic(index);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      <div className="flex justify-center mt-24 w-full">
        <button onClick={savePrice} className="button-blue  mx-0">
          儲存本頁
        </button>
      </div>
    </div>
  );
}

export default EditPrice;
