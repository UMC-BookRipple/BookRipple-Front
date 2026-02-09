import { useNavigate, useParams } from 'react-router-dom';
import BlindBookShell from '../../_components/BlindBookShell';
import Divider from '../../_components/Divider';
import UserInfoCard from '../../_components/UserInfoCard';

import { MOCK_SELL_ITEMS } from '../../_mocks/blindBook.mock';
import { formatPrice } from '../../_utils/blindBook.util';

import arrowIcon from '../../../../assets/icons/arrowIcon.svg';
import memoPaper from '../../../../assets/icons/memoPaper.svg';

export default function BuyApprovedPage() {
  const nav = useNavigate();
  const { postId } = useParams();

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
      hideTabs={false}
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

            <div
              style={{
                display: 'flex',
                padding: '10px',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '20px',
                background: '#827A74',
              }}
            >
              <span
                style={{
                  width: '49px',
                  height: '19px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  textAlign: 'center',
                  fontFamily: 'Freesentation',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                }}
              >
                승인완료
              </span>
            </div>
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

        {/* Seller Info Box */}
        <div className="mt-[15px] mb-[50px]">
          <UserInfoCard
            label="판매자"
            username="익명의 사용자 1325"
            avatarSize="large"
            showIcon={false}
          />
        </div>

        {/* CTA */}
        <div
          className="fixed right-0 bottom-0 left-0 z-50"
          style={{
            display: 'flex',
            padding: '12px 20px 20px 20px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            alignSelf: 'stretch',
            background: '#F7F5F1',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.10)',
          }}
        >
          <div className="mx-auto flex w-full max-w-[430px] flex-col gap-[10px]">
            <button
              className="h-[54px] w-full rounded-full bg-[#827A74] font-[Freesentation] text-[18px] font-medium text-white"
              style={{ lineHeight: 'normal' }}
              onClick={() => nav(`/blind-book/buy/${postId}/payment`)}
            >
              결제하기
            </button>
            <button
              className="h-[54px] w-full rounded-full bg-white font-[Freesentation] text-[18px] font-medium text-[#58534E] shadow-[0_0_1px_rgba(0,0,0,0.25)]"
              style={{ lineHeight: 'normal' }}
              onClick={() => nav(-1)}
            >
              구매요청 취소하기
            </button>
          </div>
        </div>
      </div>
    </BlindBookShell>
  );
}
