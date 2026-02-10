import { useNavigate } from 'react-router-dom';
import { useSidebarStore } from '../stores/SidebarStore';
import SideBar from './SideBar';
import menuIcon from '/src/assets/icons/menu1.svg';
import profileIcon from '/src/assets/icons/M-profile1.svg';
import bellIcon from '/src/assets/icons/bell.svg';

const Header = () => {
  const navigate = useNavigate();
  const { isOpen, toggle, close } = useSidebarStore();

  const handleMenu = () => {
    toggle();
  };

  return (
    <>
      {/* 가로 전체 채우는 영역 - 스크롤 시 상단 고정 */}
      <div className="sticky top-0 z-50 w-full border-b border-[#58534E] bg-[#F7F5F1]">
        {/* 가운데 정렬 + 고정폭은 이 안에 */}
        <header className="relative flex w-full items-center justify-between px-[14px] pt-[14px] pb-[10px]">
          <button onClick={handleMenu} className="menu-button">
            <img src={menuIcon} alt="Menu" className="menu-icon h-6 w-6" />
          </button>

          <h1 className="absolute left-1/2 -translate-x-1/2 text-center font-[GmarketSansBold] text-[16px] leading-normal font-normal tracking-[-0.16px] text-[#58534E]">
            BOOK RIPPLE
          </h1>

          <div className="flex items-center gap-[5px]">
            <button onClick={() => navigate('/notification')}>
              <img src={bellIcon} alt="Notification" className="h-6 w-6" />
            </button>
            <button onClick={() => navigate('/mypage')}>
              <img src={profileIcon} alt="Profile" className="h-6 w-6" />
            </button>
          </div>
        </header>
      </div>

      {/* Sidebar - 모든 페이지에서 사용 가능 */}
      <SideBar isOpen={isOpen} onClose={close} />
    </>
  );
};

export default Header;
