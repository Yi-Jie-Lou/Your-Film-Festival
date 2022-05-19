import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PropTypes from 'prop-types';
import MovieRating from '../components/timetable/MovieRating';
import TimetableFilmBox from '../components/global/TimetableBox';

function Timetable({ userState }) {
  const initQureyDate = useParams();
  const features = useSelector((state) => state.features);
  const period = useSelector((state) => state.festivalPeriod);
  const locations = useSelector((state) => state.festivalLocations);
  const [queryDate, setQureyDate] = useState('');
  const [queryTimetable, setQureyTimetable] = useState([]);
  const [Alltimetables, setAllTimetables] = useState([]);
  const festivalPathName = useSelector((state) => state.festivalPathName);
  const rankIcons = [
    { rank: '普', text: '一般觀眾皆可觀賞。', color: 'bg-lime-500' },
    {
      rank: '護',
      text: '未滿六歲之兒童不得觀賞，六歲以上十二歲未滿之兒童須父母、師長或成年親友陪伴輔導觀賞。',
      color: 'bg-blue-500',
    },
    { rank: '輔', text: '未滿十五歲之人不得觀賞。', color: 'bg-orange-500' },
    { rank: '限', text: '未滿十八歲之人不得觀賞。', color: 'bg-red-500' },
  ];

  useEffect(() => {
    const timetableArray = features.map((item) => {
      return item.timetable;
    });
    const timetables = timetableArray.reduce(
      (previousValue, currentValue) => [...previousValue, ...currentValue],
      []
    );
    setAllTimetables(timetables);
  }, [features]);

  useEffect(() => {
    if (!initQureyDate.id && period[0]) {
      setQureyDate(period[0].dates);
    }
  }, [period]);

  useEffect(() => {
    if (!Alltimetables) return;
    const queryOne = Alltimetables.filter((item) => queryDate === item.date);
    setQureyTimetable(queryOne);
  }, [queryDate]);

  useEffect(() => {
    if (!initQureyDate.id) return;
    const queryOne = Alltimetables.filter(
      (item) => initQureyDate.id === item.date
    );
    setQureyTimetable(queryOne);
    setQureyDate(initQureyDate.id);
  }, [Alltimetables]);

  return (
    <>
      <div className="mt-32 mb-10 min-h-[500px]">
        <select
          className="block  mb-0 mx-auto  border-4 rounded-xl text-center  border-[#94bed1]"
          onChange={(event) => setQureyDate(event.target.value)}
          value={queryDate}
        >
          {period &&
            period.map((item, index) => (
              <option key={index} value={item.dates}>
                {item.displayDates}
              </option>
            ))}
        </select>

        {locations &&
          locations.map((item, index) => (
            <div key={index} className=" my-4 mx-auto w-4/5  rounded-lg">
              <div className=" flex mx-auto  p-1 rounded-lg text-xl">
                {item}
              </div>
              <div className=" flex flex-wrap mx-auto   border-t-2 border-stone-500   ">
                {queryTimetable.map((film, index) =>
                  film.location === item ? (
                    <TimetableFilmBox
                      key={index}
                      router={
                        userState === 'build'
                          ? `/build/feature-details/${film.featureID}/festival=${festivalPathName}`
                          : userState === 'preview'
                          ? `/preview/feature-details/${film.featureID}`
                          : `/feature-details/${film.featureID}`
                      }
                      className="relative text-xl mr-4 my-4 border-4 text-center rounded w-48 h-48 | md:w-64 md:h-64 "
                      title={`${film.name}`}
                      text={`${film.start}-${film.end}`}
                      img={film.img}
                    />
                  ) : (
                    ''
                  )
                )}
              </div>
            </div>
          ))}
        <div className="w-4/5  mt-10 mx-auto">
          {rankIcons.map((item, index) => (
            <MovieRating
              className={`min-w-[24px] h-6 mr-2 text-center text-shadow-light text-white rounded-md ${item.color} `}
              rank={item.rank}
              text={item.text}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}

Timetable.propTypes = {
  userState: PropTypes.oneOf(['build', 'preview']).isRequired,
};

export default Timetable;
