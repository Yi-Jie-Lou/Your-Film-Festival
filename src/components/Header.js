import React from "react";

function Header() {
  return (
    <div className=" flex fixed top-0 w-full my-0 mx-auto border-2 rounded-lg bg-neutral-300">
      <div className="w-40 py-2 m-4 border-2 rounded text-center text-1xl">
       <a href="/">Your Film Festival</a>
      </div>
      <div className="flex  my-4 mr-4 ml-auto  text-center text-1xl">
        <div className="w-28 py-2  text-center leading-7  text-1xl"><a href="/news">最新消息</a></div>
        <div className="w-28 py-2  text-center leading-7 text-1xl"><a href="/price">購票資訊</a></div>
        <div className="w-28 py-2  text-center leading-7 text-1xl"><a href="/timetable">場次表</a></div>
        <div className="w-28 py-2 text-center leading-7 text-1xl"><a href="/workshop">工作坊</a></div>
        <div className="w-40 py-2 border-2 rounded text-center text-1xl">
         <a href="/backstage">登入客製化</a> 
        </div>
      </div>
    </div>
  );
}

export default Header;
