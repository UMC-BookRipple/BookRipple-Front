const UserNumber = () => {
  const nickName = localStorage.getItem('userName') ?? '';

  return (
    <div className="inline-flex max-w-[180px] items-center justify-center rounded-[20px] bg-[#827A74] px-[10px] py-[5px] font-sans text-[14px] leading-normal font-medium text-[#FFFFFF]">
      <span className="truncate whitespace-nowrap">{nickName}</span>
    </div>
  );
};

export default UserNumber;
