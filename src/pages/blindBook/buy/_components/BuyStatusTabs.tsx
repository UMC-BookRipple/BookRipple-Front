import type { BuyTab } from '../_types/buy.type';
import TabButton from './TabButton';

interface Props {
  value: BuyTab;
  onChange: (v: BuyTab) => void;
}

export default function BuyStatusTabs({ value, onChange }: Props) {
  return (
    <div className="-mx-5 flex items-center gap-[10px] px-[16px] pt-[4px] pb-[10px]">
      <TabButton
        active={value === 'catalog'}
        onClick={() => onChange('catalog')}
      >
        블라인드 북 목록
      </TabButton>

      <TabButton
        active={value === 'requested'}
        onClick={() => onChange('requested')}
      >
        구매요청 보낸 책
      </TabButton>
    </div>
  );
}
