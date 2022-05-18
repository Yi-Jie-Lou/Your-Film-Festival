import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Loading from "./Loading";
import { redirectAlert } from "../../utils/customAlert";
import PuzzleImg from "../../img/Puzzle.png";


function RedirectPage() {
  const login = useSelector((state) => state.state);
  const navigate = useNavigate();

  if (login === "logout") {
    redirectAlert("您還沒登入", PuzzleImg).then((okay) => {
      if (okay) {
        navigate("/");
      }
    });
  }

  return (
    <div className="h-screen vertical">
      <Loading />
    </div>
  );
}

export default RedirectPage;
