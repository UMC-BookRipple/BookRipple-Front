import searchIcon from '/src/assets/icons/M-search.svg';
import type { BookshelfTabKey } from '../../types/bookshelf.type';

type Props = {
  activeTab: BookshelfTabKey;
  onChangeTab: (tab: BookshelfTabKey) => void;
  onSearchClick?: () => void; // 검색 연결 필요
};

const TABS: Array<{ key: BookshelfTabKey; label: string }> = [
  { key: 'reading', label: '진행 중 도서' },
  { key: 'finished', label: '완독 도서' },
  { key: 'liked', label: '좋아요한 도서' },
];

export default function BookshelfTabs({
  activeTab,
  onChangeTab,
  onSearchClick,
}: Props) {
  return (
    <div className="mx-auto w-full max-w-[420px] bg-[#F7F5F1] px-4">
      <div className="flex items-end justify-between border-b border-[#58534E]">
        <nav className="flex">
          {TABS.map((t) => {
            const isActive = activeTab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => onChangeTab(t.key)}
                className={`relative flex h-[40px] items-center justify-center self-stretch px-[10px] py-[8px] font-[Freesentation] text-[16px] leading-normal text-[#58534E] transition-colors ${
                  isActive ? 'font-bold' : 'font-normal'
                }`}
              >
                {t.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 h-[1px] w-full bg-[#58534E]" />
                )}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onSearchClick}
          className="flex items-center justify-center p-[7px]"
          aria-label="search"
        >
          <img src={searchIcon} alt="Search" className="h-[30px] w-[30px]" />
        </button>
      </div>
    </div>
  );
}
