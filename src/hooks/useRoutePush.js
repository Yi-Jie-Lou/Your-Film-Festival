import { useNavigate } from 'react-router-dom';
import { saveAlert } from '../utils/customAlert';
import BlueCloudImg from '../img/BlueCloud.png';

const useRoutePush = () => {
  const navigate = useNavigate();

  const routerHandler = (alertText, nextPath) => {
    saveAlert(alertText, BlueCloudImg).then((res) => {
      if (res.isConfirmed) {
        navigate(nextPath);
      }
    });
  };

  return routerHandler;
};

export default useRoutePush;
