const UserNumber = () => {
  return (
    <div className="flex h-[29px] w-[134px] items-center justify-center rounded-[20px] bg-[#827A74] px-[10px] py-[5px] font-sans leading-normal font-medium text-[#FFFFFF] text-[14x]">
      {localStorage.getItem('userName')}
    </div>
  );
};

export default UserNumber;
