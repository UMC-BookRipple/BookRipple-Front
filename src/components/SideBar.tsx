import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuSection {
  title: string;
  koreanLabel: string;
  path: string;
  items: { label: string; path: string }[];
}

// 페이지 라우트 테스트를 위한 임의의 주소 설정 (추후 수정 예정)
const menuSections: MenuSection[] = [
  {
    title: 'MY BOOK SHELF',
    koreanLabel: '독서기록',
    path: '/library',
    items: [
      { label: '진행중 도서', path: '/library/reading' },
      { label: '완독 도서', path: '/library/completed' },
      { label: '좋아요 한 도서', path: '/library/liked' },
    ],
  },
  {
    title: 'COMMUNITY',
    koreanLabel: '커뮤니티',
    path: '/community',
    items: [
      { label: '도서별 질문 답변', path: '/community/qna' },
      { label: '도서별 감상평 읽기', path: '/community/reviews' },
      { label: '도서별 추천 도서', path: '/community/recommendations' },
    ],
  },
  {
    title: 'BLIND BOOK',
    koreanLabel: '블라인드 도서',
    path: '/blind-book',
    items: [
      { label: '블라인드 도서 구매', path: '/blind-book/buy' },
      { label: '블라인드 도서 판매', path: '/blind-book/sell' },
    ],
  },
  {
    title: 'MY PAGE',
    koreanLabel: '마이페이지',
    path: '/mypage',
    items: [
      { label: '내 정보 수정', path: '/mypage/profile' },
      { label: '기록 관리', path: '/mypage/records' },
    ],
  },
];

const SideBar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* background overlay */}
      <div
        className={`fixed inset-0 top-[49px] z-40 duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside
        className={`fixed top-[49px] left-0 z-40 flex h-[calc(100vh-49px)] w-[360px] max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Scrollable content */}
        <nav className="flex flex-1 flex-col overflow-y-auto p-[14px]">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className={sectionIndex > 0 ? 'mt-4' : ''}>
              {/* Section Header */}
              <button
                onClick={() => handleNavigation(section.path)}
                className="flex w-full items-center justify-between border-b-[2px] border-[#58534E] px-[10px] pt-[35px] pb-[6px] transition-colors hover:bg-gray-50 active:bg-gray-100"
              >
                <h2 className="font-gmarket text-[18px] font-bold text-[#58534E]">
                  {section.title}
                </h2>
                <span className="font-sans text-[16px] font-medium text-[#58534E]">
                  {section.koreanLabel}
                </span>
              </button>

              {/* Menu Items */}
              <ul className="mt-1 flex flex-col">
                {section.items.map((item, itemIndex) => {
                  // 첫 번째 아이템인지 확인하는 변수
                  const isFirstItem = itemIndex === 0;

                  return (
                    <li key={itemIndex} className="w-full">
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className={`/* 2. 피그마 CSS 그대로 반영 */ flex w-full cursor-pointer items-center gap-[10px] self-stretch text-left text-[#58534E] transition-colors hover:bg-gray-50 ${
                          isFirstItem
                            ? 'px-[10px] pt-[12px] pb-[4px]' // 첫 번째 아이템 패딩
                            : 'px-[10px] py-[4px]' // 나머지 아이템 패딩
                        } `}
                      >
                        <span className="font-sans text-[16px] leading-normal font-normal">
                          {item.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default SideBar;
