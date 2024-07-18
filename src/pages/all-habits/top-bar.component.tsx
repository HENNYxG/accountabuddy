const AllHabitsTopBar = () => {
    return (
        <div className="bg-white p-5 rounded-md flex justify-between" >
            <div className="flex flex-col">
                <span className="text-xl">
                    <span className="font-bold">Hi There</span>
                    <span className="font-light">, George</span>
                </span>
                <span className="font-light text-[12px] text-gray-400">
                    welcome back!
                </span>
            </div>
        </div>
    )
}


const RightSideBar = () => {
    return <div className="w-[20%] bg-white"> </div>
}


const AllHabitsPageUI = () => {
  return (
    <div className="w-full flex">
      <div className="w-[80%] m-5">
        <AllHabitsTopBar />
      </div>
      <RightSideBar />
    </div>
  );
};
export default AllHabitsPageUI 