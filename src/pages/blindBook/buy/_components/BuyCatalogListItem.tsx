import { formatPrice } from '../../_utils/blindBook.util';
import type { BlindBookSellItem } from '../../_types/blindBook.type';
import blindBookIcon from '../../../../assets/icons/blindBook-1.svg';

interface Props {
  item: BlindBookSellItem;
  onClick?: () => void;
}

export default function BuyCatalogListItem({ item, onClick }: Props) {
  const desc = item.stickyText.replaceAll('\n', ', ');

  return (
    <button
      onClick={onClick}
      className="flex w-full items-start gap-[16px] px-[0px] py-[24px] text-left"
    >
      <img
        src={blindBookIcon}
        alt="Blind Book"
        className="h-[89.754px] w-[91.303px] flex-shrink-0"
      />

      <div className="flex h-[89.754px] flex-1 flex-col justify-between pt-[2px]">
        <div className="flex flex-col gap-[2px]">
          <div className="text-[18px] leading-none font-medium text-[#58534E] -mt-[4px]">
            {item.titleHint.replace('...', '')}
          </div>

          <div className="text-[18px] leading-normal font-semibold text-[#58534E]">
            {formatPrice(item.price)}
          </div>
        </div>

        <div className="text-[14px] leading-[1.4] font-normal text-[#58534E]/80 line-clamp-2">
          {desc}
        </div>
      </div>
    </button>
  );
}
