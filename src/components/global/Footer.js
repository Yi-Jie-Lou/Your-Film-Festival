import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import FooterImg from '../../img/FooterImgNew_1920.png';
import CloudsImg from '../../img/Cloud.png';
import GitLogo from '../../img/GitLogo.png';

function TemplateFooter() {
  return (
    <div className="relative flex justify-center z-0    mx-auto | h-[96px] | lg:h-[120px]">
      <a
        className="z-[200] cursor-pointer"
        href="https://github.com/Yi-Jie-Lou/Your-Film-Festival"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="flex h-full">
          <div className="flex items-center mt-5 z-20 text-center text-xl">
            <div className="mx-2 rounded-full ">
              <img className="w-9 mx-auto opacity-80" src={GitLogo} />
            </div>
          </div>
          <div className="flex mt-5 z-20 text-center text-xl">
            <div className="vertical w-full mr-4 text-center  text-stone-600   tracking-wider ">
              <span>Github</span>
            </div>
          </div>
        </div>
      </a>

      <img
        className="absolute bottom-0 h-full w-full object-cover "
        src={FooterImg}
      />
      <img
        className="absolute -z-50 | bottom-36 right-24 w-56 | lg:bottom-40 lg:right-20 lg:w-64"
        src={CloudsImg}
      />
    </div>
  );
}

function CustomerFooter() {
  const sponsor = useSelector((state) => state.sponsor);
  const primaryColor = useSelector((state) => state.primaryColor);
  const textColor = useSelector((state) => state.textColor);
  return (
    <div
      className="flex justify-center w-full min-h-[128px] bottom-0 z-10 "
      style={{
        color: textColor,
        background: primaryColor,
      }}
    >
      <div className="hidden  sm:vertical text-shadow-light  py-1 text-center  w-[40px] | mx-2 text-base | md:mx-6 md:text-xl">
        <span className='w-[40px]'>贊助</span>
      </div>
      <div className="flex justify-center text-shadow-light content-center mx-2 flex-wrap min-w-[192px] |  sm:max-w-[480px] | md:max-w-[530px] ">
        {sponsor.text.map((item, index) => (
          <div
            key={index}
            index={index}
            className="flex py-1  text-start text-xs | mx-2 | sm:mx-4 | md:text-sm"
          >
            <span> {item}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-start flex-wrap min-w-[150px] |  sm:min-w-[240px] |  ">
      {sponsor.img.map((item, index) => (
        <div key={index} className="flex items-center mx-1 | sm:mx-2 ">
          <img className='  w-16 | md:w-24 | xl:w-32' src={item} />
        </div>
      ))}
      </div>
    </div>
  );
}

function Footer({ userState }) {
  const [pageState, setPageState] = useState(userState);

  useEffect(() => {
    setPageState(userState);
  }, [userState]);

  return (
    <>
      {pageState === 'preview' || pageState === 'build' ? (
        <CustomerFooter />
      ) : (
        <TemplateFooter />
      )}
    </>
  );
}

Footer.propTypes = {
  userState: PropTypes.oneOf(['preview', 'build', 'editing', '']),
};

export default Footer;
