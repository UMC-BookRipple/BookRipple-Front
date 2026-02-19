import type { SellStatusTab } from '../../_types/blindBook.type';
import TabButton from './TabButton';

interface Props {
  value: SellStatusTab;
  onChange: (v: SellStatusTab) => void;
}

export default function SellStatusTabs({ value, onChange }: Props) {
  return (
    <div className="-mx-3 flex items-center gap-[8px] px-[12px] pt-[4px] pb-[10px] sm:-mx-5 sm:gap-[10px] sm:px-[16px]">
      <TabButton
        active={value === 'selling'}
        onClick={() => onChange('selling')}
      >
        판매중
      </TabButton>
      <TabButton active={value === 'done'} onClick={() => onChange('done')}>
        거래완료
      </TabButton>
    </div>
  );
}
