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
      className={`flex flex-col items-start gap-[10px] self-stretch ${fullWidth ? '' : '-mx-3 px-[12px] sm:-mx-5 sm:px-[16px]'} py-[6px]`}
    >
      <button
        onClick={() => {
          if (selectable) onToggleSelect?.();
          else onClick?.();
        }}
        className={`flex items-center justify-between gap-[10px] self-stretch rounded-[15px] px-[12px] py-[10px] sm:px-[16px] transition-colors ${
          selectable && selected ? 'bg-[#E6E6E6]' : 'bg-white'
        }`}
      >
        {/* 아이콘 + 제목 + 작가 */}
        <div
          className={`flex min-w-0 flex-1 items-center gap-[12px] sm:gap-[18px] ${
            item.badge === '거래완료' ? 'opacity-60' : ''
          }`}
        >
          {/* 아이콘 */}
          <div className="relative">
            <img
              src={blindBookIcon}
              alt="Blind Book"
              className="h-[60px] w-[61px] shrink-0 sm:h-[68.814px] sm:w-[70px]"
              style={{ aspectRatio: '59/58' }}
            />
          </div>

          {/* 제목 + 작가 */}
          <div className="flex min-w-0 flex-1 flex-col items-start gap-[0px]">
            <div className="w-full text-left text-[15px] leading-normal font-medium text-[#58534E] sm:text-[16px] break-words">
              {item.titleHint}
            </div>
            <div className="self-stretch text-left text-[14px] leading-normal font-normal text-[#58534E] sm:text-[16px] break-words">
              {item.authorHint}
            </div>
          </div>
        </div>

        {/* 거래상태 + 가격 */}
        {!hidePrice && !hideBadge && (
          <div className="shrink-0 flex flex-col items-end justify-center gap-[1px]">
            {item.badge === '거래완료' ? (
              <span className="text-center text-[16px] leading-normal font-semibold text-[#BDB7B2] sm:text-[18px]">
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
                <div className="text-center text-[16px] leading-normal font-semibold text-[#58534E] sm:text-[18px]">
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
