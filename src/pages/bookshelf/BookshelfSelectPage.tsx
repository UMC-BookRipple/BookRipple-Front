import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '/src/assets/icons/logo.svg';
import likeIcon from '/src/assets/icons/M-like1.svg';
import likedIcon from '/src/assets/icons/M-like2.svg';

import Header from '../../components/Header';
import ReadingProgress from '../../components/ReadingProgress';
import Button from '../../components/Button';
import BookshelfSection from './_components/BookshelfSection';

import type { BookshelfTabKey } from './_types/bookshelf.type';
import { isBookshelfTabKey } from './_utils/bookshelf.utils';
import { useBookshelfStore } from '../../stores/BookshelfStore';

const TABS: Array<{ key: BookshelfTabKey; label: string }> = [
  { key: 'reading', label: '진행 중 도서' },
  { key: 'finished', label: '완독 도서' },
  { key: 'liked', label: '좋아요한 도서' },
];

export default function BookshelfSelectPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { getBookById, toggleLike } = useBookshelfStore();

  const [isMemoOpen, setIsMemoOpen] = useState(false);

  const tabParam = params.tab ?? 'reading';
  const tab: BookshelfTabKey = isBookshelfTabKey(tabParam)
    ? tabParam
    : 'reading';
  const bookId = params.bookId ?? '';

  const book = getBookById(bookId);

  if (!book)
    return (
      <div className="min-h-screen bg-[#F7F5F1] p-6">
        도서를 찾을 수 없습니다.
      </div>
    );

  const isFinishedView = tab === 'finished' || book.status === 'finished';
  const progress = book.progressPercent ?? 0;
  const pages = book.pages ?? 0;
  const current = book.currentPage ?? 0;

  const handleLikeToggle = () => {
    toggleLike(bookId);
  };

  const handleTabChange = (newTab: BookshelfTabKey) => {
    navigate(`/bookshelf/${newTab}`);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F1]">
      <Header />

      <div className="mx-auto w-full max-w-[402px] bg-[#F7F5F1]">
        {/* Logo Section */}
        <section className="flex flex-col items-center justify-center gap-[10px] self-stretch px-[10px] pt-[26px] pb-[28px]">
          <img src={logo} alt="BookRipple" className="h-[95.6px] w-[382px]" />
        </section>

        {/* Tabs */}
        <div className="mx-auto w-full max-w-[420px] bg-[#F7F5F1] px-4">
          <div className="flex items-end justify-between border-b border-[#58534E]">
            <nav className="flex">
              {TABS.map((t) => {
                const isActive = tab === t.key;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => handleTabChange(t.key)}
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
          </div>
        </div>

        {/* Book Info Card */}
        <div className="flex justify-center px-[16px] pt-[20px]">
          <div className="relative flex w-full max-w-[370px] gap-[16px]">
            {/* Like Button */}
            <button
              type="button"
              className="absolute top-1 right-0 flex h-[30px] w-[30px] items-center justify-center"
              onClick={handleLikeToggle}
            >
              <img
                src={book.isLiked ? likedIcon : likeIcon}
                alt="좋아요"
                className="h-full w-full"
              />
            </button>
            {/* Book Cover */}
            <div className="h-[210px] w-[140px] shrink-0 overflow-hidden border border-[#D4CEC6] bg-white">
              <div
                className="h-full w-full bg-cover bg-center bg-no-repeat"
                style={{
                  background: `url(${book.coverUrl}) lightgray 50% / cover no-repeat`,
                }}
              />
            </div>

            {/* Book Info */}
            <div className="flex flex-col items-start justify-between self-stretch pt-[2px] pb-[8px]">
              <div className="flex h-[21px] flex-1 items-center gap-[10px] self-stretch overflow-hidden border-t border-b border-[#58534E] px-0 py-[4px] font-[Freesentation] text-[18px] leading-normal font-medium text-[#58534E]">
                <span className="truncate">{book.title}</span>
              </div>

              <div className="mt-[12px] self-stretch font-[Freesentation] text-[16px] leading-normal font-normal text-[#58534E]">
                {book.author && <div>{book.author}</div>}
                {book.publisher && <div>{book.publisher}</div>}
                {!!pages && <div>{pages}P</div>}
              </div>

              <div className="mt-[16px] flex gap-[4px] font-[Freesentation] text-[16px] leading-normal font-normal">
                <span className="flex-[1_0_0] text-[#58534E]">
                  독서율 {progress}%
                </span>
                <span className="text-[#827A74]">
                  {current}/{pages}
                </span>
              </div>

              <div className="mt-[3px]">
                <ReadingProgress
                  progress={progress}
                  className="h-[20px] w-[155px] shrink-0"
                />
              </div>

              <div className="mt-[6px] flex-[1_0_0] font-[Freesentation] text-[14px] leading-normal font-medium text-[#827A74]">
                5일 후 완독 가능
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-[15px] flex flex-col items-center justify-center gap-[10px] self-stretch px-[16px] py-0">
          {isFinishedView ? (
            <>
              <Button variant="secondary">감상평 작성</Button>
              <Button variant="secondary">추천 도서 보기</Button>
            </>
          ) : (
            <Button variant="primary">독서하기</Button>
          )}
        </div>

        {/* Detail Sections */}
        <div className="mt-[10px] flex w-full max-w-[402px] flex-col items-start justify-center gap-[3px] px-[14px] py-[10px]">
          {/* 독서메모 - Toggle */}
          <BookshelfSection
            title="독서메모"
            type="toggle"
            isOpen={isMemoOpen}
            onToggle={() => setIsMemoOpen((prev) => !prev)}
          >
            {/* Mock memo data - 추후 API 연동 */}
            {[
              {
                id: '1',
                title: '제목',
                content:
                  '물결이 잔잔한 오후, 창가에 앉아 커피를 한 모금 마셨다. 오래 미뤄둔 메모장을 펼치자 머릿속에 흩어져 있던 생각들이 천천히 줄을 맞추기 시작했다. 오늘은 거창한 목표 대신, 작은 일을 하나씩 끝내는 날로 정했다.',
              },
            ].map((memo) => (
              <button
                key={memo.id}
                type="button"
                onClick={() => {
                  // 메모 페이지 라우팅 필요
                  console.log('Navigate to memo:', memo.id);
                }}
                className="flex w-full items-center gap-[10px] self-stretch rounded-[10px] bg-white px-[16px] py-[10px]"
              >
                <div className="flex-1 text-left font-[Freesentation] text-[16px] leading-snug font-[500] text-[#58534E]">
                  {memo.title}
                  <br />
                  <br />
                  {memo.content}
                </div>
              </button>
            ))}

            {/* Write button */}
            <button
              type="button"
              onClick={() => {
                // 메모 작성 페이지 라우팅
                console.log('Navigate to write memo');
              }}
              className="flex w-full items-center gap-[10px] self-stretch rounded-[10px] bg-white px-[12px] py-[14px]"
            >
              <span className="flex-1 text-center font-[Freesentation] text-[16px] leading-normal font-[500] text-[#58534E]">
                작성하기
              </span>
            </button>
          </BookshelfSection>

          {/* 질문답변 - Navigation */}
          <BookshelfSection
            title="질문답변"
            type="navigation"
            onClick={() => {
              console.log('Navigate to Q&A');
            }}
          />

          {/* 사람들의 질문 답변 - Navigation */}
          <BookshelfSection
            title="사람들의 질문 답변"
            type="navigation"
            onClick={() => {
              console.log('Navigate to community Q&A');
            }}
          />
        </div>
      </div>
    </div>
  );
}
