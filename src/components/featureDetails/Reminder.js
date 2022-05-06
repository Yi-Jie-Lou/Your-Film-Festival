
import { AiOutlineCaretUp, AiFillStar } from "react-icons/ai";

function Reminder(props) {
  return (
    <>
      <div className="flex mt-6 my-2">
        <AiFillStar className="mt-1 mr-1" />
        <p>
          影人出席，場次為刊物付印前之最終確認，出刊後仍可能受全球疫情變化而有所調整，異動場次請以網站及現場公佈為準
        </p>
      </div>
      <div className="flex my-2">
        <AiOutlineCaretUp className="mt-1 mr-1" />
        <p> 開幕片或閉幕片</p>
      </div>
      <div>
        {props.currentFeatureObject.note.split("\n").map((line, index) => (
          <div key={index} className="my-2">
            <span >
              {line}
              <br />
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Reminder;
