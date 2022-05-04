import { useSelector, useDispatch } from "react-redux";
import { isGuide } from "../actions";
import IndexContainer from "../components/IndexContainer";
import Joyride, { STATUS } from "react-joyride";

function Index(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.state);
  const isFirstViewed = useSelector((state) => state.isGuide);
  const steps = [
    {
      title: "Welcome！",
      content: "在這裡您可以建立自己的影展網站！",
      target: "body",
      disableBeacon: true,
      placement: "center",
    },
    {
      title: "Step1",
      content: "請先瀏覽範例網站介面",
      target: "#step1",
      placement: "top",
    },
    {
      title: "Step2",
      content: "登入後開始上傳您的影片！",
      target: "#step2",
      placement: "top",
    },
  ];

  const handleJoyrideCallback = (data) => {
    const {status} = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      dispatch(isGuide(false));
    }
  };

  return (
    <>
   
      { state === "logout" && isFirstViewed ? (
        <Joyride
          callback={handleJoyrideCallback}
          steps={steps}
          continuous={true}
          styles={{
            options: {
              arrowColor: '#fff',
              backgroundColor:  "#fff",
              primaryColor: "#f97316",
              textColor: '#000',
              zIndex: 1000,
            }
          }}
        />
      ) : (
        ""
      )}

      <IndexContainer userState={props.userState} />

    </>
  );
}

export default Index;
