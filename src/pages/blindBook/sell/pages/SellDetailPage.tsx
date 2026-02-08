import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BottomButton, { BottomButtonItem } from '../../_components/BottomButton';

import BlindBookShell from '../../_components/BlindBookShell';
import Divider from '../../_components/Divider';
import BookListItem from '../_components/BookListItem';

import { MOCK_SELL_ITEMS } from '../../_mocks/blindBook.mock';
import { formatPrice } from '../../_utils/blindBook.util';

import arrowIcon from '../../../../assets/icons/arrowIcon.svg';
import memoPaper from '../../../../assets/icons/memoPaper.svg';

export default function SellDetailPage() {
  const nav = useNavigate();
  const { postId } = useParams();

  const item = useMemo(
    () => MOCK_SELL_ITEMS.find((i) => i.id === postId),
    [postId],
  );

  if (!item) {
    return (
      <BlindBookShell activeMode="sell" showHero={false}>
        <div className="py-10 text-center">존재하지 않는 판매글입니다.</div>
      </BlindBookShell>
    );
  }

  return (
    <BlindBookShell
      activeMode="sell"
      showHero={true}
      heroVariant="minimal"
      noBottomPadding={true}
    >
      <div className="pt-[14px] pb-[140px]">
        {/* Sub Header */}
        <button
          onClick={() => nav(-1)}
          className="flex items-center gap-[10px] py-[6px]"
        >
          <img src={arrowIcon} alt="back" className="h-[14px] w-[8px]" />
          <span className="text-[18px] leading-normal font-medium text-[#58534E]">
            판매중 도서
          </span>
        </button>

        {/* Memo Paper Section */}
        <div className="flex w-full items-center justify-center gap-[10px] self-stretch py-[30px]">
          <div className="relative h-[181px] w-[181px]">
            <img
              src={memoPaper}
              alt="Memo Paper"
              className="absolute top-0 left-0 h-full w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
            />
            <div className="absolute inset-0 flex items-center justify-center p-6 pt-[50px] text-center">
              <span
                className="text-[16px] leading-[1.2] font-normal whitespace-pre-line text-[#58534E]"
                style={{ fontFamily: 'Pak_Yong_jun' }}
              >
                {item.stickyText}
              </span>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex items-center gap-[4px] self-stretch px-[8px] py-[8px]">
          <div className="flex flex-1 flex-col items-start gap-[-2px] rounded-[10px]">
            <div
              className="text-[18px] leading-normal font-medium text-[#58534E]"
              style={{ fontFamily: 'Freesentation' }}
            >
              {item.titleHint.replace('...', '')}
            </div>
            <div
              className="text-[22px] leading-normal font-semibold text-[#58534E]"
              style={{ fontFamily: 'Freesentation' }}
            >
              {formatPrice(item.price)}
            </div>
          </div>

          <button
            onClick={() => nav(`/blind-book/sell/${item.id}/requests`)}
            className="flex flex-col items-center gap-[-2px]"
          >
            <div
              className="text-center text-[22px] leading-normal font-semibold text-[#58534E]"
              style={{ fontFamily: 'Freesentation' }}
            >
              판매요청
            </div>
            <div
              className="text-center text-[22px] leading-normal font-semibold text-[#58534E]"
              style={{ fontFamily: 'Freesentation' }}
            >
              {item.requestCount}명
            </div>
          </button>
        </div>

        <Divider />

        {/* Description */}
        <div className="flex items-center justify-center gap-[10px] self-stretch px-[20px] py-[30px]">
          <p
            className="flex-1 text-center text-[15px] leading-normal font-normal whitespace-pre-line text-[#58534E]"
            style={{ fontFamily: 'Freesentation' }}
          >
            {item.memo}
          </p>
        </div>

        {/* Bottom Card */}
        <div className="mb-[25px]">
          <BookListItem item={item} onClick={() => {}} />
        </div>

        {/* Action Buttons */}
        <BottomButton>
          <BottomButtonItem
            label="글 수정하기"
            variant="secondary"
            onClick={() => nav(`/blind-book/sell/${item.id}/edit`)}
          />
          <BottomButtonItem
            label="글 삭제하기"
            variant="primary"
            onClick={() => {}}
          />
        </BottomButton>
      </div>
    </BlindBookShell>
  );
}
