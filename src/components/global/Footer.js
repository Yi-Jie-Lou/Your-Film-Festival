import React,{useState,useEffect} from "react";
import FooterImg from "../../img/FooterImgNew_1920.png";
import CloudsImg from "../../img/Cloud.png"
import AppWorksSchool from "../../img/AppWorksSchool.png";
import { useSelector } from "react-redux";

function TemplateFooter() {
  return (
    <div className="relative flex justify-center -z-10    mx-auto | h-[96px] | xl:h-[120px]">
      <div className="flex mt-5 z-20 text-center text-1xl">
        <div className="vertical w-full mr-4 text-center  text-stone-600   tracking-wider ">
          <span>贊助</span>
        </div>
      </div>

      <div className="flex items-center mt-5 z-20 text-center text-1xl">
        <div className="w-48 rounded-full ">
          <img src={AppWorksSchool} />
        </div>
      </div>
      <img
        className="absolute bottom-0 h-full w-full object-cover "
        src={FooterImg}
      />
      <img className="absolute -z-50 | bottom-36 right-24 w-56 | xl:bottom-40 xl:right-20 xl:w-64" src={CloudsImg}  />
    </div>
  );
}

function CustomerFooter() {
  const sponsor = useSelector((state) => state.sponsor);
  const primaryColor = useSelector((state) => state.primaryColor);
  return (
    <div
      className="flex justify-center w-full  h-32 bottom-0 z-10 "
      style={{
        background: primaryColor,
      }}
    >
      <div className="vertical mr-12 py-1 text-center text-1xl ">
        <span>贊助</span>
      </div>
      <div className="flex justify-center content-center flex-wrap max-w-530 ">
        {sponsor.text.map((item, index) => (
          <div key={index} index={index} className="flex py-1  mx-4 text-start text-sm">
            <span> {item}</span>
          </div>
        ))}
      </div>

      {sponsor.img.map((item, index) => (
        <div key={index} className="flex items-center w-32  mx-2 ">
          <img src={item} />
        </div>
      ))}
    </div>
  );
}

function Footer(props) {

  const [pageState, setPageState] = useState(props.userState);

  useEffect(() => {
    setPageState(props.userState);
  }, [props.userState]);

  return (
    <>
      {pageState === "preview" || pageState === "build" ? (
        <CustomerFooter />
      ) : (
        <TemplateFooter />
      )}
    </>
  );
}

export default Footer;
