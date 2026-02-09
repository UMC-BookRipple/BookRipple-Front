import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BlindBookShell from '../../_components/BlindBookShell';
import Divider from '../../_components/Divider';
import BottomButton from '../../_components/BottomButton';
import UserInfoCard from '../../_components/UserInfoCard';

import { MOCK_SELL_ITEMS } from '../../_mocks/blindBook.mock';
import { formatPrice } from '../../_utils/blindBook.util';

import arrowIcon from '../../../../assets/icons/arrowIcon.svg';
import memoPaper from '../../../../assets/icons/memoPaper.svg';

export default function BuyDetailPage() {
  const nav = useNavigate();
  const { postId } = useParams();
  const [hasRequested, setHasRequested] = useState(false);

  const item = MOCK_SELL_ITEMS.find((i) => i.id === postId);

  if (!item) {
    return (
      <BlindBookShell activeMode="buy" showHero={false}>
        <div className="py-10 text-center">존재하지 않는 도서입니다.</div>
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
        {/* Memo Paper Section */}
        <div className="flex w-full items-center justify-center gap-[10px] self-stretch py-[30px]">
          <div className="relative h-[181px] w-[181px]">
            <img
              src={memoPaper}
              alt="Memo Paper"
              className="absolute top-0 left-0 h-full w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
            />
            <div className="absolute inset-0 flex items-center justify-center p-6 pt-[50px] text-center">
              <span className="font-handwriting text-[16px] leading-[1.4] font-normal whitespace-pre-line text-[#58534E]">
                {item.stickyText}
              </span>
            </div>
          </div>
        </div>

        {/* Title and Price Section with Back Button */}
        <div className="flex items-center gap-[27px] self-stretch py-[8px]">
          <button
            onClick={() => nav(-1)}
            className="flex items-center justify-center pl-[0px]"
          >
            <img src={arrowIcon} alt="back" className="h-[28px] w-[28px]" />
          </button>

          <div className="flex flex-1 items-center justify-between">
            <div className="flex flex-col gap-[0px]">
              <div className="font-[Freesentation] text-[18px] leading-normal font-medium text-[#58534E]">
                {item.titleHint.replace('...', '')}
              </div>
              <div className="font-[Freesentation] text-[22px] leading-normal font-semibold text-[#58534E]">
                {formatPrice(item.price)}
              </div>
            </div>

            {hasRequested && (
              <div className="flex flex-shrink-0 items-center justify-center rounded-[20px] bg-[#BDB7B2] p-[10px]">
                <span className="flex h-[19px] w-[49px] items-center justify-center text-center font-[Freesentation] text-[16px] leading-normal font-medium text-white">
                  승인대기
                </span>
              </div>
            )}
          </div>
        </div>

        <Divider />

        {/* Description */}
        <div className="flex items-center justify-center gap-[10px] self-stretch px-[10px] py-[30px]">
          <p className="flex-1 text-center font-[Freesentation] text-[16px] leading-normal font-normal whitespace-pre-line text-[#58534E]">
            {item.memo}
          </p>
        </div>

        <Divider />

        {/* Book Status Box */}
        <div className="mt-[20px] mb-[16px] flex items-center justify-between gap-[14px] self-stretch rounded-[12px] bg-[#FFFFFF] px-[16px] py-[10px]">
          <span className="font-[Freesentation] text-[18px] leading-normal font-medium text-[#58534E]">
            책 상태
          </span>
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#58534E]">
            <span className="text-center font-[Freesentation] text-[14px] leading-normal font-medium text-white">
              상
            </span>
          </div>
        </div>

        {/* Seller Info Box */}
        <div className="mb-[20px]">
          <UserInfoCard
            label="판매자"
            username="익명의 사용자 1325"
            avatarSize="large"
            showIcon={false}
          />
        </div>

        {/* CTA */}
        <BottomButton
          label={hasRequested ? '구매요청 취소하기' : '구매요청 보내기'}
          onClick={() => {
            if (hasRequested) {
              setHasRequested(false);
            } else {
              setHasRequested(true);
            }
          }}
        />
      </div>
    </BlindBookShell>
  );
}
