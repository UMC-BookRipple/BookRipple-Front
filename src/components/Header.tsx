import menuIcon from "/src/assets/icons/menu1.svg";
import profileIcon from "/src/assets/icons/M-profile1.svg";

const Header = () => {
  const handleMenu = () => {
    console.log("Menu button clicked!");
  };

  const handleSearch = () => {
    console.log("Search clicked!");
  };

  return (
    <>
      {/* 가로 전체 채우는 영역 */}
      <div className="w-full border-b border-[#58534E] bg-[#F7F5F1]">
        {/* 가운데 정렬 + 고정폭은 이 안에 */}
        <header className="flex justify-between items-center px-[14px] pt-[14px] pb-[10px] w-full">
          <button onClick={handleMenu} className="menu-button">
            <img src={menuIcon} alt="Menu" className="w-6 h-6 menu-icon" />
          </button>

          <h1 className="text-[#58534E] 
    text-center 
    font-[GmarketSansBold] 
    text-[16px] 
    font-normal
    leading-normal
    tracking-[-0.16px]">BOOK RIPPLE</h1>

          <button onClick={handleSearch}>
            <img src={profileIcon} alt="Profile" className="w-6 h-6" />
          </button>
        </header>
      </div>
    </>
  );
};

export default Header;
