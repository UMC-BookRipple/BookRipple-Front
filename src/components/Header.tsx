import { useNavigate } from 'react-router-dom';
import { useSidebarStore } from '../stores/SidebarStore';
import menuIcon from '/src/assets/icons/menu1.svg';
import bellIcon from '/src/assets/icons/bell.svg';
import profileIcon from '/src/assets/icons/M-profile1.svg';
import SideBar from './SideBar';

const Header = () => {
  const navigate = useNavigate();
  const { isOpen, toggle, close } = useSidebarStore();

  const handleMenu = () => {
    toggle();
  };

  const handleSearch = () => {
    console.log('Search clicked!');
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="w-full border-b border-[#58534E] bg-[#F7F5F1]">
        <header className="relative flex w-full items-center px-[14px] pt-[14px] pb-[10px]">
          <button onClick={handleMenu} className="menu-button">
            <img src={menuIcon} alt="Menu" className="menu-icon h-6 w-6" />
          </button>

          <h1 className="absolute inset-x-0 text-center font-[GmarketSansBold] text-[16px] leading-normal font-normal tracking-[-0.16px] text-[#58534E] pointer-events-none">
            BOOK RIPPLE
          </h1>

          <div className="ml-auto flex items-center gap-[10px]">
            <button onClick={() => navigate('/notification')}>
              <img src={bellIcon} alt="Notification" className="h-6 w-6" />
            </button>
            <button onClick={handleSearch}>
              <img src={profileIcon} alt="Profile" className="h-6 w-6" />
            </button>
          </div>
        </header>
      </div>
      <SideBar isOpen={isOpen} onClose={close} />
    </div>
  );
};

export default Header;
