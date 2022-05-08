function Loading() {
  return (
    <>
    <div className="loader justify-center bg-white p-5 rounded-full flex space-x-3">
      <div className="w-5 h-5 bg-[#f4cd7f] rounded-full animate-bounce"></div>
      <div className="w-5 h-5 bg-[#57bdc8] rounded-full animate-bounce"></div>
      <div className="w-5 h-5 bg-[#f08074] rounded-full animate-bounce"></div>
    </div>
    </>
  );
}

export default Loading;
