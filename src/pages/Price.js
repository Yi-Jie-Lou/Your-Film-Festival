import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PriceContainer() {
  const price = useSelector((state) => state.price);
  const traffic = useSelector((state) => state.traffic);
  return (
    <div className="my-32 ">
      {price.map((item,index) => (
        <div key={index} className="flex flex-col w-11/12 mt-8 mx-auto rounded-lg   border-2 border-stone-700 ">
          <div className="vertical  h-10 border-b-2 border-stone-700 bg-slate-300 text-center  ">{item.category}</div>
          {item.tickets.map((ticket) => (
            <div className="flex border-b-2 border-stone-700  ">
              <div className="vertical min-h-10 w-2/12 border-r-2 border-stone-700 text-center ">
                {ticket.kind}
              </div>
              <div className="vertical w-10/12 ml-2">{ticket.price}</div>
            </div>
          ))}

          <div className="flex border-b-2 border-stone-700  ">
            <div className="vertical h-10 w-2/12  border-r-2 border-stone-700 text-center">銷售時間</div>
            <div className="vertical h-10 ml-2  w-10/12">{item.saleTime}</div>
          </div>
          <div className="flex ">
            <div className="vertical h-10 w-2/12  border-r-2 border-stone-700 text-center">銷售通路</div>
            <div className="vertical h-10 ml-2  w-10/12">{item.marketing}</div>
          </div>
        </div>
      ))}

      <h2 className="w-11/12 mx-auto mt-4 text-xl">交通方式</h2>
      {traffic.map(item =>(
        <div className="w-11/12 h-64 mt-4 mx-auto border-2 rounded-lg"></div>


      ))}

    </div>
  );
}

function Price(props) {
  return (
    <>
      <Header userUID={props.userUID} userState={props.userState} />
      <PriceContainer />
      <Footer />
    </>
  );
}

export default Price;
