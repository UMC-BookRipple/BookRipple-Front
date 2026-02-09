import Badge from '../../_components/Badge';
import { formatPrice } from '../../_utils/blindBook.util';
import type { BlindBookSellItem } from '../../_types/blindBook.type';
import blindBookIcon from '../../../../assets/icons/blindBook-1.svg';

interface Props {
  item: BlindBookSellItem;
  onClick?: () => void;
  selectable?: boolean;
  selected?: boolean;
  onToggleSelect?: () => void;
  hidePrice?: boolean;
  hideBadge?: boolean;
  fullWidth?: boolean;
}

export default function BookListItem({
  item,
  onClick,
  selectable = false,
  selected = false,
  onToggleSelect,
  hidePrice = false,
  hideBadge = false,
  fullWidth = false,
}: Props) {
  return (
    <div
      className={`flex flex-col items-start gap-[10px] self-stretch ${fullWidth ? '' : '-mx-5 px-[16px]'} py-[6px]`}
    >
      <button
        onClick={() => {
          if (selectable) onToggleSelect?.();
          else onClick?.();
        }}
        className={`flex items-center justify-between self-stretch rounded-[15px] px-[16px] py-[10px] transition-colors ${
          selectable && selected ? 'bg-[#E6E6E6]' : 'bg-white'
        }`}
      >
        {/* 아이콘 + 제목 + 작가 */}
        <div
          className={`flex items-center gap-[18px] ${
            item.badge === '거래완료' ? 'opacity-60' : ''
          }`}
        >
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
          <div className="flex flex-col items-start gap-[0px]">
            <div className="w-[126px] text-left text-[16px] leading-normal font-medium text-[#58534E]">
              {item.titleHint}
            </div>
            <div className="self-stretch text-left text-[16px] leading-normal font-normal text-[#58534E]">
              {item.authorHint}
            </div>
          </div>
        </div>

        {/* 거래상태 + 가격 */}
        {!hidePrice && !hideBadge && (
          <div className="flex flex-col items-end justify-center gap-[1px]">
            {item.badge === '거래완료' ? (
              <span className="text-center text-[18px] leading-normal font-semibold text-[#BDB7B2]">
                거래완료
              </span>
            ) : (
              <>
                {item.badge && (
                  <Badge
                    variant={
                      item.badge === '배송대기' ? 'secondary' : 'default'
                    }
                  >
                    {item.badge}
                  </Badge>
                )}
                <div className="text-center text-[18px] leading-normal font-semibold text-[#58534E]">
                  {formatPrice(item.price)}
                </div>
              </>
            )}
          </div>
        )}
      </button>
    </div>
  );
}
