import { useState } from 'react';
import menuIcon from '/src/assets/icons/menu1.svg';
import profileIcon from '/src/assets/icons/M-profile1.svg';
import SideBar from './SideBar';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenu = () => {
    setIsSidebarOpen(true);
  };

  const handleProfile = () => {
    console.log('Profile clicked!');
  };

  return (
    <>
      {/* 가로 전체 채우는 영역 */}
      <div className="w-full border-b border-[#58534E] bg-[#F7F5F1]">
        {/* 가운데 정렬 + 고정폭은 이 안에 */}
        <header className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
          <button onClick={handleMenu} className="menu-button">
            <img src={menuIcon} alt="Menu" className="menu-icon h-6 w-6" />
          </button>

          <h1 className="text-base font-semibold text-[#58534E]">
            BOOK RIPPLE
          </h1>

          <button onClick={handleProfile}>
            <img src={profileIcon} alt="Profile" className="h-6 w-6" />
          </button>
        </header>
      </div>

      {/* Sidebar */}
      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;
