import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BlindBookShell from '../../_components/BlindBookShell';
import Divider from '../../_components/Divider';
import BottomButton from '../../_components/BottomButton';

import { MOCK_SELL_ITEMS } from '../../_mocks/blindBook.mock';
import { formatPrice } from '../../_utils/blindBook.util';

import arrowIcon from '../../../../assets/icons/arrowIcon.svg';

export default function BuyWaitingPage() {
  const nav = useNavigate();
  const { postId } = useParams();

  const item = useMemo(
    () => MOCK_SELL_ITEMS.find((i) => i.id === postId),
    [postId],
  );

  if (!item) {
    return (
      <BlindBookShell activeMode="buy" showHero={false}>
        <div className="py-10">존재하지 않는 도서입니다.</div>
      </BlindBookShell>
    );
  }

  return (
    <BlindBookShell
      activeMode="buy"
      showHero={true}
      heroVariant="minimal"
      noBottomPadding={true}
    >
      <div className="pt-[14px] pb-[140px]">
        <button
          onClick={() => nav(-1)}
          className="flex items-center gap-[10px] py-[6px]"
        >
          <img src={arrowIcon} alt="back" className="h-[14px] w-[8px]" />
          <span className="text-[18px] leading-normal font-medium text-[#58534E]">
            구매 도서
          </span>
        </button>

        {/* Info */}
        <div className="mt-[10px] flex items-center gap-[4px] self-stretch px-2 py-[8px]">
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

          <div className="flex flex-col items-center gap-[-2px]">
            <div
              className="text-center text-[22px] leading-[1.3] font-semibold text-[#58534E]"
              style={{ fontFamily: 'Freesentation' }}
            >
              결제
            </div>
            <div
              className="text-center text-[22px] leading-[1.1] font-semibold text-[#58534E]"
              style={{ fontFamily: 'Freesentation' }}
            >
              완료
            </div>
          </div>
        </div>

        <Divider />

        <div
          className="mt-[35px] flex-1 text-center text-[16px] leading-normal font-normal text-[#58534E]"
          style={{ fontFamily: 'Freesentation' }}
        >
          판매자가 배송을 시작하면 알림이 와요
        </div>

        <BottomButton label="배송준비중" disabled variant="primary" />
      </div>
    </BlindBookShell>
  );
}
