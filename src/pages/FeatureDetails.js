import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ImageGallery from 'react-image-gallery';
import PropTypes from 'prop-types';

import Details from '../components/featureDetails/Details';
import Trailer from '../components/featureDetails/Trailer';
import Creators from '../components/featureDetails/Creators';
import TimetableLink from '../components/featureDetails/TimetableLink';
import Reminder from '../components/featureDetails/Reminder';

function FeatureDetails({ userState }) {
  const features = useSelector((state) => state.features);
  const [currentFeatureObject, setCurrentFeatureObject] = useState();
  const [imgArray, setImgArray] = useState();
  const currentID = useParams();

  useEffect(() => {
    const currentOne = features.filter(
      (item) => item.featureID === currentID.id
    );
    setCurrentFeatureObject(...currentOne);
  }, [features]);

  useEffect(() => {
    if (!currentFeatureObject) return;
    const imgArray = currentFeatureObject.featureImgs.map((item) => ({
      original: item,
      thumbnail: item,
    }));
    setImgArray(imgArray);
  }, [currentFeatureObject]);

  return (
    <div className="mx-auto min-h-[800px]  w-11/12">
      {imgArray && (
        <>
          <div className="flex  justify-center  pb-12 min-h-[500px]  border-b-2 border-stone-500 | flex-col mt-24 | md:flex-row md:mt-36 ">
            <div className="vertical mx-auto w-[80%] | md:w-[50%] md:mx-6 ">
              <ImageGallery items={imgArray} />
            </div>

            <div className="w-[80%] mx-auto | md:w-4/12  md:mx-6 ">
              <Details currentFeatureObject={currentFeatureObject} />
            </div>
          </div>
          <div className=" mt-16 pb-12  border-b-2 border-stone-500">
            <Trailer currentFeatureObject={currentFeatureObject} />
          </div>
          <div className=" mt-16 pb-12">
            <Creators currentFeatureObject={currentFeatureObject} />

            <div className="vertical mx-auto mt-8 w-4/5">
              <TimetableLink
                userState={userState}
                currentFeatureObject={currentFeatureObject}
              />
              <Reminder currentFeatureObject={currentFeatureObject} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

FeatureDetails.propTypes = {
  userState: PropTypes.string.isRequired,
};

export default FeatureDetails;
