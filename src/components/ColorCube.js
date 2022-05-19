import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePrimaryColor, updateSecondaryColor } from "../actions";
import PropTypes from "prop-types"

const mainColor = [
  {
    slate: [
      "bg-[#f8fafc]",
      "bg-[#f1f5f9]",
      "bg-[#e2e8f0]",
      "bg-[#cbd5e1]",
      "bg-[#94a3b8]",
      "bg-[#64748b]",
      "bg-[#475569]",
      "bg-[#334155]",
      "bg-[#1e293b]",
      "bg-[#0f172a]",
    ],
  },
  {
    red: [
      "bg-[#fef2f2]",
      "bg-[#fee2e2]",
      "bg-[#fecaca]",
      "bg-[#fca5a5]",
      "bg-[#f87171]",
      "bg-[#ef4444]",
      "bg-[#dc2626]",
      "bg-[#b91c1c]",
      "bg-[#991b1b]",
      "bg-[#7f1d1d]",
    ],
  },
  {
    orange: [
      "bg-[#fff7ed]",
      "bg-[#ffedd5]",
      "bg-[#fed7aa]",
      "bg-[#fdba74]",
      "bg-[#fb923c]",
      "bg-[#f97316]",
      "bg-[#ea580c]",
      "bg-[#c2410c]",
      "bg-[#9a3412]",
      "bg-[#7c2d12]",
    ],
  },
  {
    amber: [
      "bg-[#fffbeb]",
      "bg-[#fef3c7]",
      "bg-[#fde68a]",
      "bg-[#fcd34d]",
      "bg-[#fbbf24]",
      "bg-[#f59e0b]",
      "bg-[#d97706]",
      "bg-[#b45309]",
      "bg-[#92400e]",
      "bg-[#78350f]",
    ],
  },
  {
    yellow: [
      "bg-[#fefce8]",
      "bg-[#fef9c3]",
      "bg-[#fef08a]",
      "bg-[#fde047]",
      "bg-[#facc15]",
      "bg-[#eab308]",
      "bg-[#ca8a04]",
      "bg-[#a16207]",
      "bg-[#854d0e]",
      "bg-[#713f12]",
    ],
  },
  {
    lime: [
      "bg-[#f7fee7]",
      "bg-[#ecfccb]",
      "bg-[#d9f99d]",
      "bg-[#bef264]",
      "bg-[#a3e635]",
      "bg-[#84cc16]",
      "bg-[#65a30d]",
      "bg-[#4d7c0f]",
      "bg-[#3f6212]",
      "bg-[#365314]",
    ],
  },
  {
    green: [
      "bg-[#f0fdf4]",
      "bg-[#dcfce7]",
      "bg-[#bbf7d0]",
      "bg-[#86efac]",
      "bg-[#4ade80]",
      "bg-[#22c55e]",
      "bg-[#16a34a]",
      "bg-[#15803d]",
      "bg-[#166534]",
      "bg-[#14532d]",
    ],
  },
  {
    emerald: [
      "bg-[#ecfdf5]",
      "bg-[#d1fae5]",
      "bg-[#a7f3d0]",
      "bg-[#6ee7b7]",
      "bg-[#34d399]",
      "bg-[#10b981]",
      "bg-[#059669]",
      "bg-[#047857]",
      "bg-[#065f46]",
      "bg-[#064e3b]",
    ],
  },
  {
    teal: [
      "bg-[#f0fdfa]",
      "bg-[#ccfbf1]",
      "bg-[#99f6e4]",
      "bg-[#5eead4]",
      "bg-[#2dd4bf]",
      "bg-[#14b8a6]",
      "bg-[#0d9488]",
      "bg-[#0f766e]",
      "bg-[#115e59]",
      "bg-[#134e4a]",
    ],
  },
  {
    cyan: [
      "bg-[#ecfeff]",
      "bg-[#cffafe]",
      "bg-[#a5f3fc]",
      "bg-[#67e8f9]",
      "bg-[#22d3ee]",
      "bg-[#06b6d4]",
      "bg-[#0891b2]",
      "bg-[#0e7490]",
      "bg-[#155e75]",
      "bg-[#164e63]",
    ],
  },
  {
    sky: [
      "bg-[#f0f9ff]",
      "bg-[#e0f2fe]",
      "bg-[#bae6fd]",
      "bg-[#7dd3fc]",
      "bg-[#38bdf8]",
      "bg-[#0ea5e9]",
      "bg-[#0284c7]",
      "bg-[#0369a1]",
      "bg-[#075985]",
      "bg-[#0c4a6e]",
    ],
  },
  {
    blue: [
      "bg-[#eff6ff]",
      "bg-[#dbeafe]",
      "bg-[#bfdbfe]",
      "bg-[#93c5fd]",
      "bg-[#60a5fa]",
      "bg-[#3b82f6]",
      "bg-[#2563eb]",
      "bg-[#1d4ed8]",
      "bg-[#1e40af]",
      "bg-[#1e3a8a]",
    ],
  },
  {
    indigo: [
      "bg-[#eef2ff]",
      "bg-[#e0e7ff]",
      "bg-[#c7d2fe]",
      "bg-[#a5b4fc]",
      "bg-[#818cf8]",
      "bg-[#6366f1]",
      "bg-[#4f46e5]",
      "bg-[#4338ca]",
      "bg-[#3730a3]",
      "bg-[#312e81]",
    ],
  },

  {
    violet: [
      "bg-[#f5f3ff]",
      "bg-[#ede9fe]",
      "bg-[#ddd6fe]",
      "bg-[#c4b5fd]",
      "bg-[#a78bfa]",
      "bg-[#8b5cf6]",
      "bg-[#7c3aed]",
      "bg-[#6d28d9]",
      "bg-[#5b21b6]",
      "bg-[#4c1d95]",
    ],
  },
  {
    purple: [
      "bg-[#faf5ff]",
      "bg-[#f3e8ff]",
      "bg-[#e9d5ff]",
      "bg-[#d8b4fe]",
      "bg-[#c084fc]",
      "bg-[#a855f7]",
      "bg-[#9333ea]",
      "bg-[#7e22ce]",
      "bg-[#6b21a8]",
      "bg-[#581c87]",
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

function ColorCube(props) {
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState("");
  const dispatch = useDispatch();
  const choseMainColor = (color, index) => {
    setCurrentSelectedIndex(index);

    switch (props.color) {
      case "primary":
        return dispatch(updatePrimaryColor(color.slice(4, 11)));
      case "secondary":
        return dispatch(updateSecondaryColor(color.slice(4, 11)));
      default:
        throw new Error();
    }
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
              currentSelectedIndex === index ? "border-4 border-red-700" : ""
            } hover:scale-105 ease-in-out duration-300 hover:border-4 border-sky-700 `}
          ></button>
        </div>
      ))}
    </div>
  );
}

ColorCube.propTypes = {
  color: PropTypes.oneOf(["primary","secondary"]).isRequired
}

export default ColorCube;
