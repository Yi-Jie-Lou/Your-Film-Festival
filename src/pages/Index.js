import Header from "../components/Header";
import Footer from "../components/Footer";
import IndexContainer from "../components/IndexContainer"

  
  function Index(props) {
    return (
      <>
        <Header userUID={props.userUID} userState={props.userState} />
        <IndexContainer />
        <Footer />
      </>
    );
  }

  export default Index