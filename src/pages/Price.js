import { useSelector } from 'react-redux';
import PriceTable from '../components/price/PriceTable';

function Price() {
  const price = useSelector((state) => state.price);
  const traffic = useSelector((state) => state.traffic);
  return (
    <div className="mt-24 mb-10 | sm:mt-32 sm:mb-10">
      {price.map((item, index) => (
        <div
          key={index}
          className="flex flex-col w-11/12 mt-8 mx-auto rounded-lg   border-4 border-[#77929a] "
        >
          <div className="vertical rounded-t  h-10 border-b-2 border-stone-500 bg-slate-300 text-center  ">
            {item.category}
          </div>
          {item.tickets.map((ticket, index) => (
            <PriceTable
              key={index}
              className="flex border-b-2 border-stone-500"
              title={ticket.kind}
              text={ticket.price}
            />
          ))}

          <PriceTable
            className="flex border-b-2 border-stone-500"
            title="銷售時間"
            text={item.saleTime}
          />
          <PriceTable
            className="flex border-stone-500"
            title="銷售通路"
            text={item.marketing}
          />
        </div>
      ))}

      <h2 className="w-11/12  mx-auto mt-8 text-xl">交通方式</h2>
      {traffic.map((item, index) => (
        <div
          key={index}
          className="flex  w-11/12  mt-4 mx-auto | flex-col | md:flex-row "
        >
          <div className="vertical | w-full | md:w-1/2">
            <div>{item.text}</div>
          </div>
          <img
            className=" rounded-lg   border-4 border-[#77929a] w-full  my-2  | md:mx-6 md:w-5/12"
            src={item.img}
          />
        </div>
      ))}
    </div>
  );
}

export default Price;
