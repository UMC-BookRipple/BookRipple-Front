import blindBookIcon from '../../../../assets/icons/blindBook-1.svg';
import type { BuyRequestItem, BuyRequestStatus } from '../_types/buy.type';

const badgeLabelMap: Record<BuyRequestStatus, string> = {
  '배송 시작': '배송 시작',
  '승인 대기': '승인 대기',
  '거래 수락': '거래 수락',
  '거래 취소': '거래 취소',
};

// ✅ Tailwind 색상 클래스는 text-#58534E ❌ (안 먹힘) → text-[#58534E] ✅
const badgeStyle: Record<BuyRequestStatus, string> = {
  '배송 시작': 'bg-[#E6E6E6] text-[#58534E]',
  '승인 대기': 'bg-[#BDB7B2] text-white',
  '거래 수락': 'bg-[#827A74] text-white',
  '거래 취소': 'bg-[#BDB7B2] text-white',
};

interface Props {
  item: BuyRequestItem;
  onClick?: () => void;
  fullWidth?: boolean; // ✅ BookListItem과 동일 옵션
}

export default function BuyRequestCard({ item, onClick, fullWidth = false }: Props) {
  const isPayOnly = item.status === '거래 수락' || item.status === '거래 취소';

  return (
    <div
      className={`flex flex-col items-start gap-[10px] self-stretch ${fullWidth ? '' : '-mx-5 px-[16px]'
        } py-[1.5px]`}
    >
      <button
        onClick={onClick}
        className="flex items-center justify-between self-stretch rounded-[12px] bg-white px-[16px] py-[10px] transition-colors"
      >
        {/* ✅ 아이콘 + 제목 + 작가 (BookListItem 구조 그대로) */}
        <div className="flex items-center gap-[18px] min-w-0">
          {/* 아이콘 */}
          <div className="relative">
            <img
              src={blindBookIcon}
              alt="Blind Book"
              className="h-[68.814px] w-[70px]"
              style={{ aspectRatio: '59/58' }}
            />
          </div>

          {/* 제목 + 작가 */}
          <div className="flex flex-col items-start gap-[0px] min-w-0">
            <div className="w-[126px] text-left text-[16px] font-medium font-[Freesentation] text-[#58534E] line-clamp-1">
              {item.titleHint}
            </div>
            <div className="self-stretch text-left text-[16px] font-normal font-[Freesentation] text-[#58534E] line-clamp-1">
              {item.authorHint}
            </div>
          </div>
        </div>

        {/* ✅ 거래상태 + 가격/결제하기 (BookListItem 구조 그대로) */}
        <div className="flex flex-col items-end justify-center gap-[1px] flex-shrink-0">
          {/* 상태 뱃지 */}
          <span
            className={`
              flex items-center justify-center gap-[10px]
              px-[8px] py-[4px]
              rounded-full
              text-[14px] font-medium text-center font-[Freesentation]
              ${badgeStyle[item.status]}
            `}
          >
            {badgeLabelMap[item.status]}
          </span>

          {/* 가격 or 결제하기 (피그마 규칙 반영) */}
          {!isPayOnly ? (
            <div className="text-center text-[18px] font-semibold font-[Freesentation] text-[#58534E]">
              {item.price.toLocaleString()}원
            </div>
          ) : (
            <div className="text-center text-[18px] font-semibold font-[Freesentation] text-[#58534E]">
              결제하기
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
