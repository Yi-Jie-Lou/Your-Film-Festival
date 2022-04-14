import "./App.css";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";

function App() {
  const [features, setFeatures] = useState();
  const [pageNumber, setPageNumber] = useState(0);

  const featuresPerPage = 1;
  const pagesVisited = pageNumber * featuresPerPage;

  const displayfeatures = features
    .slice(pagesVisited, pagesVisited + featuresPerPage)
    .map((user) => {
      return (
        <div className="user">
          <h3>{user.firstName}</h3>
          <h3>{user.lastName}</h3>
          <h3>{user.email}</h3>
        </div>
      );
    });

  const pageCount = Math.ceil(features.length / featuresPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="App">
      {displayfeatures}
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={changePage}
      />
    </div>
  );
}

export default App;