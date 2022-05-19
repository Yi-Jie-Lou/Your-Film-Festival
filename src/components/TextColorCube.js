import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateTextColor } from '../actions';

const mainColor = [
  {
    slate: [
      'bg-[#f8fafc]',
      'bg-[#f1f5f9]',
      'bg-[#e2e8f0]',
      'bg-[#cbd5e1]',
      'bg-[#94a3b8]',
      'bg-[#64748b]',
      'bg-[#475569]',
      'bg-[#334155]',
      'bg-[#1e293b]',
      'bg-[#0f172a]',
    ],
  },
];

const colorCategoryList = mainColor.reduce(
  (previousValue, currentValue) => [
    ...previousValue,
    ...Object.values(currentValue),
  ],
  []
);

const allcolors = colorCategoryList.reduce(
  (previousValue, currentValue) => [...previousValue, ...currentValue],
  []
);

function TextColorCube() {
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState('');
  const dispatch = useDispatch();

  const choseMainColor = (color, index) => {
    setCurrentSelectedIndex(index);
    dispatch(updateTextColor(color.slice(4, 11)));
  };

  return (
    <div className="flex flex-wrap ">
      {allcolors.map((color, index) => (
        <div key={index}>
          <p>{index}</p>
          <button
            onClick={() => {
              choseMainColor(color, index);
            }}
            className={`m-2 h-12 w-24  ${color}  rounded-lg ${
              currentSelectedIndex === index ? 'border-4 border-red-700' : ''
            } hover:scale-105 ease-in-out duration-300 hover:border-4 border-sky-700 `}
          ></button>
        </div>
      ))}
    </div>
  );
}

export default TextColorCube;
