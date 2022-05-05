import { useSelector } from "react-redux";
import PriceTable from "../components/price/PriceTable";

function Price() {
  const price = useSelector((state) => state.price);
  const traffic = useSelector((state) => state.traffic);
  return (
    <div className="my-32 ">
      {price.map((item, index) => (
        <div
          key={index}
          className="flex flex-col w-11/12 mt-8 mx-auto rounded-lg   border-2 border-stone-700 "
        >
          <div className="vertical  h-10 border-b-2 border-stone-700 bg-slate-300 text-center  ">
            {item.category}
          </div>
          {item.tickets.map((ticket, index) => (
            <PriceTable
              key={index}
              className="flex border-b-2 border-stone-700"
              title={ticket.kind}
              text={ticket.price}
            />
          ))}

          <PriceTable
            className="flex border-b-2 border-stone-700"
            title="銷售時間"
            text={item.saleTime}
          />
          <PriceTable
            className="flex border-stone-700"
            title="銷售通路"
            text={item.marketing}
          />
        </div>
      ))}

      <h2 className="w-11/12 mx-auto mt-8 text-xl">交通方式</h2>
      {traffic.map((item, index) => (
        <div key={index} className="flex w-11/12  mt-4 mx-auto ">
          <div className="w-600">{item.text}</div>
          <img className="w-600" src={item.img} />
        </div>
      ))}
    </div>
  );
}

export default Price;
