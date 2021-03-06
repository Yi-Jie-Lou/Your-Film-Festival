import { useSelector, useDispatch } from 'react-redux';

import uniqid from 'uniqid';

import Creator from '../components/editFeatures/Creator';
import FilmContent from '../components/editFeatures/FilmContent';
import Booking from '../components/editFeatures/Booking';
import Note from '../components/editFeatures/Note';
import useRoutePush from '../hooks/useRoutePush';
import { firebase } from '../utils/firebase-config';
import { errorAlert } from '../utils/customAlert';
import { updateFeatures, switchTab } from '../actions';
import PuzzleImg from '../img/Puzzle.png';

function Features() {
  const dispatch = useDispatch();
  const routerHandler = useRoutePush();
  const features = useSelector((state) => state.features);
  const currentTab = useSelector((state) => state.currentTab);
  const userID = useSelector((state) => state.userID);

  const addFeature = () => {
    const newID = uniqid();
    const emptyFeature = {
      featureID: newID,
      timetable: [
        {
          date: '',
          start: '10:00',
          end: '12:00',
          location: '',
          opening: false,
          closing: false,
          name: '',
          img: '',
          workshop: false,
          featureID: newID,
        },
      ],
      creators: [{ img: '', info: '', name: '' }],
      featureImgs: ['', '', ''],
      format: '',
      color: '',
      nation: '',
      year: '',
      language: '',
      length: '',
      title: '',
      shortInfo: '',
      longInfo: '',
      commercialInfo: '',
      note: '',
      important: false,
    };
    const newFeatures = [...features, emptyFeature];
    dispatch(updateFeatures(newFeatures));
  };

  const deleteFeature = () => {
    if (features.length === 1) return;
    const newFeatures = [...features];
    const editIndex = newFeatures.findIndex(
      (item) => item.featureID === currentTab
    );
    newFeatures.splice(editIndex, 1);
    dispatch(updateFeatures(newFeatures));
    dispatch(switchTab(newFeatures[0].featureID));
  };

  const checkInputValue = () => {
    const newFeatures = [...features];
    let isError = false;

    newFeatures.forEach((film) => {
      if (
        !film.color.trim() ||
        !film.language.trim() ||
        !film.year.trim() ||
        !film.format.trim() ||
        !film.length.trim() ||
        !film.title.trim() ||
        !film.nation.trim() ||
        !film.commercialInfo.trim()
      ) {
        isError = true;
      }

      film.creators.forEach((creator) => {
        if (!creator.name.trim() || !creator.info.trim()) {
          isError = true;
        }
      });
    });

    if (isError) {
      errorAlert('????????????????????????????????????', PuzzleImg);
      return isError;
    }
    return isError;
  };

  const saveFeatures = () => {
    const isError = checkInputValue();
    if (isError) return;

    const newFeatures = [...features];
    newFeatures.forEach((film) => {
      film.timetable.forEach((timetable) => {
        timetable.name = film.title;
        timetable.featureID = film.featureID;
        timetable.img = film.featureImgs[2];
      });
    });
    dispatch(updateFeatures(newFeatures));

    firebase.saveFeatures(userID, features).then(() => {
      routerHandler(
        '???????????????????????????\n????????????????????????????????????',
        '/backstage/news'
      );
    });
  };

  return (
    <div className="wrap mb-64 | md:mb-0">
      <div className="w-9/12 mx-auto">
        <button
          className="w-36 button-blue mt-32 mb-3 ml-2"
          onClick={addFeature}
        >
          ????????????
        </button>
      </div>
      <div className="flex flex-wrap mx-auto justify-start | min-w-[304px] w-9/12 | md:w-9/12 ">
        {features.map((item, index) => (
          <button
            onClick={() => {
              dispatch(switchTab(item.featureID));
            }}
            className={` button-orange mx-2 mt-2 | w-[60px] | md:w-[calc((100%-96px)/6)] | ${
              item.featureID === currentTab ? 'bg-[#f4cd7f]' : 'bg-[#eb9666]'
            } `}
            key={index}
          >
            ?????? {index + 1}
          </button>
        ))}
      </div>
      <FilmContent />
      <Creator />
      <Booking />
      <Note />
      <div className="flex justify-center my-24">
        <button className="button-red w-28 p-2 mx-2" onClick={deleteFeature}>
          ????????????
        </button>
        <button onClick={saveFeatures} className="button-blue w-28 p-2 mx-2">
          ????????????
        </button>
      </div>
    </div>
  );
}

export default Features;
