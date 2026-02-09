import { useNavigate, useParams } from 'react-router-dom';
import BlindBookShell from '../../_components/BlindBookShell';
import Divider from '../../_components/Divider';
// import UserInfoCard from '../../_components/UserInfoCard'; // Removed unused import

import { MOCK_SELL_ITEMS } from '../../_mocks/blindBook.mock';
import { formatPrice } from '../../_utils/blindBook.util';

import arrowIcon from '../../../../assets/icons/arrowIcon.svg';
import memoPaper from '../../../../assets/icons/memoPaper.svg';

export default function BuyShippingStartedPage() {
  const nav = useNavigate();
  const { postId } = useParams();

  // Mock data based on id (fallback to first item if not found, but logic should be sound)
  const item =
    MOCK_SELL_ITEMS.find((i) => i.id === postId) || MOCK_SELL_ITEMS[0];

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
      noBottomPadding={false}
      hideTabs={false}
    >
      <div className="pt-[14px] pb-[40px]">
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

            {/* Badge: 배송 시작 */}
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
                  width: 'auto',
                  height: '19px',
                  padding: '0 5px',
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
                  whiteSpace: 'nowrap',
                }}
              >
                배송 시작
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

        {/* Book Status Box */}
        <div className="mt-[20px]">
          <div
            className="shadow-[0_0_4px_0_rgba(0,0,0,0.05)]"
            style={{
              display: 'flex',
              padding: '10px 16px',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
              alignSelf: 'stretch',
              borderRadius: '12px',
              background: '#FFF',
            }}
          >
            <span className="font-[Freesentation] text-[16px] font-medium text-[#58534E]">
              책 상태
            </span>
            <div
              style={{
                display: 'flex',
                width: '30px',
                height: '30px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                borderRadius: '50px',
                background: '#58534E',
                color: '#FFF',
                fontFamily: 'Freesentation',
                fontSize: '14px',
              }}
            >
              상
            </div>
          </div>
        </div>

        {/* Seller Info Box */}
        <div className="mt-[20px] mb-[20px]">
          <div
            style={{
              display: 'flex',
              padding: '16px',
              alignItems: 'center',
              gap: '14px',
              alignSelf: 'stretch',
              borderRadius: '12px',
              background: '#FFF',
            }}
          >
            {/* Avatar */}
            <div
              className="flex flex-shrink-0 items-center justify-center rounded-full"
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#E6E6E6',
              }}
            >
              {/* showIcon={false}, so no icon */}
            </div>

            <div className="flex flex-col gap-[2px]">
              <span className="font-[Freesentation] text-[18px] leading-normal font-medium text-[#58534E]">
                판매자
              </span>
              <span className="font-[Freesentation] text-[16px] leading-normal font-medium text-[#58534E]">
                익명의 사용자 1325
              </span>
            </div>
          </div>
        </div>

        {/* Separator Bar */}
        <div
          style={{
            width: 'calc(100% + 40px)',
            height: '3px',
            opacity: 0.7,
            background: '#E6E6E6',
            margin: '10px -20px 20px -20px', // Negative margin to extend full width. Redeced margin-bottom
          }}
        />

        {/* Delivery Info Section */}
        <div className="mt-[0px]">
          <h3
            className="mb-[10px] pl-[2.5px] font-[Freesentation] font-medium text-[#58534E]"
            style={{
              fontSize: '16px',
              fontStyle: 'normal',
              lineHeight: 'normal',
            }}
          >
            배송정보 확인
          </h3>
          <div className="flex w-full items-stretch justify-start gap-[10px]">
            {/* Delivery Method Box */}
            <div
              className="shadow-[0_0_4px_0_rgba(0,0,0,0.05)]"
              style={{
                display: 'flex',
                padding: '14px 16px',
                alignItems: 'flex-start',
                gap: '10px',
                borderRadius: '12px',
                background: '#FFF',
                flexShrink: 0,
              }}
            >
              <span className="font-[Freesentation] text-[16px] font-medium text-[#58534E]">
                편의점 반택
              </span>
            </div>

            {/* Tracking Number Box */}
            <div
              className="shadow-[0_0_4px_0_rgba(0,0,0,0.05)]"
              style={{
                display: 'flex',
                padding: '14px 16px',
                alignItems: 'flex-start',
                gap: '10px',
                flex: '1 0 0',
                borderRadius: '12px',
                background: '#FFF',
              }}
            >
              <span className="font-[Freesentation] text-[16px] font-normal text-[#58534E]">
                6543-2109-8765
              </span>
            </div>
          </div>
        </div>
      </div>
    </BlindBookShell>
  );
}
