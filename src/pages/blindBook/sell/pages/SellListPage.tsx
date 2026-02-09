import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BlindBookShell from '../../_components/BlindBookShell';
import SellStatusTabs from '../_components/SellStatusTabs';
import BookListItem from '../_components/BookListItem';
import BottomButton from '../../_components/BottomButton';
import EditUnderBar from '../../../../components/EditUnderBar';

import { MOCK_SELL_ITEMS } from '../../_mocks/blindBook.mock';
import type { SellStatusTab } from '../../_types/blindBook.type';

export default function SellListPage() {
  const nav = useNavigate();

  const [statusTab, setStatusTab] = useState<SellStatusTab>('selling');
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const items = useMemo(() => {
    const selling = MOCK_SELL_ITEMS.filter((i) => !i.isDone);
    const done = MOCK_SELL_ITEMS.filter((i) => i.isDone);
    return statusTab === 'selling' ? selling : done;
  }, [statusTab]);

  const allSelected = items.length > 0 && selectedIds.length === items.length;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (allSelected) setSelectedIds([]);
    else setSelectedIds(items.map((i) => i.id));
  };

  const onDelete = () => {
    // UI만: 실제 삭제는 API 연결 후
    alert(`선택 삭제(목업): ${selectedIds.join(', ')}`);
    setSelectedIds([]);
    setSelectMode(false);
  };

  return (
    <BlindBookShell activeMode="sell">
      <div className="flex flex-col items-start justify-center gap-[10px] py-[20px]">
        <div className="flex items-center gap-[10px] self-stretch px-[10px]">
          <div className="flex-1 text-[18px] leading-normal font-medium text-[#58534E]">
            판매중 도서
          </div>
          {statusTab === 'selling' && (
            <button
              className="text-right text-[16px] leading-normal font-medium text-[#58534E]"
              onClick={() => {
                setSelectMode((v) => !v);
                setSelectedIds([]);
              }}
            >
              선택하기
            </button>
          )}
        </div>
      </div>

      <SellStatusTabs value={statusTab} onChange={setStatusTab} />

      <div className="space-y-[2px]">
        {items.map((item) => (
          <BookListItem
            key={item.id}
            item={item}
            selectable={selectMode}
            selected={selectedIds.includes(item.id)}
            onToggleSelect={() => toggleSelect(item.id)}
            onClick={() => nav(`/blind-book/sell/${item.id}`)}
          />
        ))}
      </div>

      {/* 하단 바 */}
      {selectMode ? (
        <EditUnderBar onSelectAll={toggleAll} onDelete={onDelete} />
      ) : (
        <BottomButton
          label="도서 판매하기"
          onClick={() => nav('/blind-book/sell/new')}
        />
      )}
    </BlindBookShell>
  );
}
