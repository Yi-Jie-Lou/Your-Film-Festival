import { useSelector } from 'react-redux';

import Proptypes from 'prop-types';
import NewsBox from '../components/global/NewsBox';

function Workshop({ userState }) {
  const workshop = useSelector((state) => state.workshop);
  const festivalPathName = useSelector((state) => state.festivalPathName);

  return (
    <div className="flex flex-wrap justify-center w-full min-h-[600px]  mt-24 mb-10 | xl:mt-32 mx-auto rounded-lg">
      {workshop &&
        workshop.map((item, index) => (
          <div key={index}>
            <NewsBox
              router={
                userState === 'build'
                  ? `/build/workshop/${item.workshopID}/festival=${festivalPathName}`
                  : userState === 'preview'
                  ? `/preview/workshop/${item.workshopID}`
                  : `/workshop/${item.workshopID}`
              }
              className="relative h-1/2 mb-8 drop-shadow-2xl  cursor-pointer | w-11/12 | md:w-full"
              title={item.title}
              img={item.img}
            />
          </div>
        ))}
    </div>
  );
}

Workshop.propTypes = {
  userState: Proptypes.oneOf(['build', 'preview', '']).isRequired,
};

export default Workshop;
