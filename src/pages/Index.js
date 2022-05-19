import PropTypes from "prop-types"
import FilmsContainer from "../components/index/FilmsContainer";
import Carousel from "../components/index/Carousel";

function Index({userState}) {

  return (
    <>
      <Carousel userState={userState} />
      <FilmsContainer userState={userState} />
    </>
  );
}

Index.propTypes = {
  userState: PropTypes.string.isRequired
}

export default Index;
