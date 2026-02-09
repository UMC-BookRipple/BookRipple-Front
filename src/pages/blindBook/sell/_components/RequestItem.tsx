import type { SellRequest } from '../../_types/blindBook.type';
import Badge from '../../_components/Badge';

interface Props {
  item: SellRequest;
  onAccept?: () => void;
}

export default function RequestItem({ item, onAccept }: Props) {
  return (
    <div className="flex items-center justify-between self-stretch rounded-[12px] bg-white p-[16px]">
      <div className="flex items-center gap-[12px]">
        {/* Profile */}
        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#E8E4DE]" />

        <div className="flex flex-col items-start gap-[5px]">
          <div
            className="self-stretch text-[18px] leading-[1.0] font-medium text-[#58534E]"
            style={{ fontFamily: 'Freesentation' }}
          >
            판매요청
          </div>
          <div
            className="self-stretch text-[16px] leading-[1.2] font-medium text-[#58534E]"
            style={{ fontFamily: 'Freesentation' }}
          >
            {item.nickname}
          </div>
        </div>
      </div>

      {onAccept && (
        <button onClick={onAccept}>
          <Badge
            variant={item.accepted ? 'secondary' : 'default'}
            className="px-[12px] py-[4px] text-[14px] leading-normal font-medium"
            style={{ fontFamily: 'Freesentation' }}
          >
            요청 수락
          </Badge>
        </button>
      )}
    </div>
  );
}
