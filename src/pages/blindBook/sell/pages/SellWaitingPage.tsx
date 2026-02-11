import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BlindBookShell from '../../_components/BlindBookShell';
import Divider from '../../_components/Divider';
import BottomButton from '../../_components/BottomButton';
import RequestItem from '../_components/RequestItem';

import { MOCK_REQUESTS, MOCK_SELL_ITEMS } from '../../_mocks/blindBook.mock';
import { formatPrice } from '../../_utils/blindBook.util';
import type { SellRequest } from '../../_types/blindBook.type';

import arrowIcon from '../../../../assets/icons/arrowIcon.svg';

export default function SellWaitingPage() {
  const nav = useNavigate();
  const { postId } = useParams();

  const item = useMemo(
    () => MOCK_SELL_ITEMS.find((i) => i.id === postId),
    [postId],
  );

  // In a real app, we would fetch the accepted request from the server.
  // Here we just mock picking the first one as accepted if none marked in mock.
  const requests: SellRequest[] = MOCK_REQUESTS[postId ?? ''] ?? [];

  if (!item) {
    return (
      <BlindBookShell activeMode="sell" showHero={false}>
        <div className="py-10">존재하지 않는 판매글입니다.</div>
      </BlindBookShell>
    );
  }

  const acceptedRequest = requests.find((r) => r.accepted) || requests[0];

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

        {/* Info Section */}
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
              판매요청
            </div>
            <div
              className="text-center text-[22px] leading-[1.1] font-semibold text-[#58534E]"
              style={{ fontFamily: 'Freesentation' }}
            >
              승인
            </div>
          </div>
        </div>

        <div>
          <Divider />
        </div>

        {/* Accepted Item Card */}
        {acceptedRequest && (
          <div className="mt-[20px]">
            <RequestItem item={acceptedRequest} />
          </div>
        )}

        <div
          className="mt-[35px] flex-1 text-center text-[16px] leading-normal font-normal text-[#58534E]"
          style={{ fontFamily: 'Freesentation' }}
        >
          요청자가 결제를 하면 책을 보내주세요
        </div>

        <BottomButton label="결제대기중" disabled variant="primary" />
      </div>
    </BlindBookShell>
  );
}
