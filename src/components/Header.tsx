import { useSidebarStore } from '../stores/SidebarStore';
import menuIcon from '/src/assets/icons/menu1.svg';
import profileIcon from '/src/assets/icons/M-profile1.svg';

const Header = () => {
  const { toggle } = useSidebarStore();

  const handleMenu = () => {
    toggle();
  };

  const handleSearch = () => {
    console.log('Search clicked!');
  };

  return (
    <>
      {/* 가로 전체 채우는 영역 */}
      <div className="w-full border-b border-[#58534E] bg-[#F7F5F1]">
        {/* 가운데 정렬 + 고정폭은 이 안에 */}
<<<<<<< feat/#22-bookshelf-select-ui
        <header className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
=======
        <header className="flex justify-between items-center px-[14px] pt-[14px] pb-[10px] w-full">
>>>>>>> develop
          <button onClick={handleMenu} className="menu-button">
            <img src={menuIcon} alt="Menu" className="menu-icon h-6 w-6" />
          </button>

          <h1 className="text-[#58534E] 
    text-center 
    font-[GmarketSansBold] 
    text-[16px] 
    font-normal
    leading-normal
    tracking-[-0.16px]">BOOK RIPPLE</h1>

          <button onClick={handleSearch}>
            <img src={profileIcon} alt="Profile" className="h-6 w-6" />
          </button>
        </header>
      </div>
    </>
  );
};

export default Header;
