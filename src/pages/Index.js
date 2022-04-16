import Header from "../components/Header";
import Footer from "../components/Footer";

function IndexContainer() {
    return (
      <div className="mt-24 ">
        <div className="h-64 border-2"></div>
        <div className="flex flex-wrap justify-around">
          <div className="my-6 w-2/5 h-64 border-2"></div>
          <div className="my-6 w-2/5 h-64 border-2"></div>
          <div className="my-6 w-1/4 h-60 border-2"></div>
          <div className="my-6 w-1/4 h-60 border-2"></div>
          <div className="my-6 w-1/4 h-60 border-2"></div>
        </div>
      </div>
    );
  }
  
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