import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import BlindBookShell from '../../_components/BlindBookShell';
import SellStatusTabs from '../_components/SellStatusTabs';
import BookListItem from '../_components/BookListItem';
import BottomButton from '../../_components/BottomButton';
import EditUnderBar from '../../../../components/EditUnderBar';

import { getMyBlindBooks, deleteBlindBook } from '../../../../api/blindBook.api';
import type { SellStatusTab } from '../../_types/blindBook.type';

import Toast from '../../../../components/Toast';

export default function SellListPage() {
  const nav = useNavigate();
  const location = useLocation();

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  // ✅ (중요) 초기 탭은 무조건 selling으로 시작 (state로 초기값 세팅 금지)
  const [statusTab, setStatusTab] = useState<SellStatusTab>('selling');

  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // ✅ state.tab을 딱 1번만 적용하기 위한 ref
  const appliedTabRef = useRef(false);

  // ✅ RESERVED 안에서 결제 전/후 badge 분기
  const statusToBadge = (status: string | null, isPaid?: boolean): string | null => {
    switch (status) {
      case 'SALE':
        return '거래요청';
      case 'RESERVED':
        return isPaid ? '배송대기' : '거래요청';
      case 'SOLD_OUT':
        return '거래완료';
      default:
        return null;
    }
  };

  // ✅ (중요) location.state.tab은 딱 1번만 적용하고, 바로 state를 지워서 히스토리 오염 방지
  useEffect(() => {
    const tabFromState = (location.state as any)?.tab as SellStatusTab | undefined;

    if (!appliedTabRef.current && tabFromState) {
      appliedTabRef.current = true;
      setStatusTab(tabFromState);

      // ✅ state 제거 (히스토리 덮어쓰기)
      nav('/blind-book/sell', { replace: true, state: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const fetchMyBooks = useCallback(async () => {
    setLoading(true);
    try {
      if (statusTab === 'selling') {
        const [saleRes, reservedRes] = await Promise.allSettled([
          getMyBlindBooks({ status: 'SALE', size: 100 }),
          getMyBlindBooks({ status: 'RESERVED' as any, size: 100 }),
        ]);

        let allContent: any[] = [];

        if (saleRes.status === 'fulfilled' && saleRes.value.isSuccess) {
          allContent = [...allContent, ...saleRes.value.result.content];
        }
        if (reservedRes.status === 'fulfilled' && reservedRes.value.isSuccess) {
          allContent = [...allContent, ...reservedRes.value.result.content];
        }

        // ✅ 혹시라도 섞여 들어오면 selling 탭에서는 SALE/RESERVED만 강제
        allContent = allContent.filter((x) => x.status === 'SALE' || x.status === 'RESERVED');

        allContent.sort((a, b) => Number(b.blindBookId) - Number(a.blindBookId));

        const mappedItems = allContent.map((item) => ({
          ...item,
          id: item.blindBookId.toString(),
          titleHint: item.name || item.title,
          authorHint: item.author || '',
          price: item.price,
          badge: statusToBadge(item.status, item.isPaid),
          status: item.status,
          isDone: false,
          memo: '',
          stickyText: '',
          requestCount: 0,
        }));

        setItems(mappedItems);
      } else {
        const response = await getMyBlindBooks({ status: 'SOLD_OUT', size: 100 });

        if (response.isSuccess) {
          const mappedItems = response.result.content.map((item: any) => ({
            ...item,
            id: item.blindBookId.toString(),
            titleHint: item.name || item.title,
            authorHint: item.author || '',
            price: item.price,
            badge: '거래완료',
            status: item.status,
            isDone: true,
            memo: '',
            stickyText: '',
            requestCount: 0,
          }));
          mappedItems.sort((a: any, b: any) => Number(b.id) - Number(a.id));
          setItems(mappedItems);
        } else {
          setItems([]);
          showToast('완료된 도서를 불러오지 못했습니다.');
        }
      }
    } catch (error) {
      console.error('Error fetching my blind books:', error);
      showToast('목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [statusTab]);

  useEffect(() => {
    fetchMyBooks();
    setSelectMode(false);
    setSelectedIds([]);
  }, [fetchMyBooks]);

  const allSelected = items.length > 0 && selectedIds.length === items.length;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleAll = () => {
    if (allSelected) setSelectedIds([]);
    else setSelectedIds(items.map((i) => i.id));
  };

  const handleDeleteClick = () => {
    if (selectedIds.length === 0) {
      showToast('선택된 도서가 없습니다.');
      return;
    }
    setIsDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    setIsDeleteModalOpen(false);

    try {
      let successCount = 0;
      let failCount = 0;
      let failMessage = '';

      for (const id of selectedIds) {
        try {
          const response = await deleteBlindBook(Number(id));
          if (response.isSuccess) successCount++;
          else failCount++;
        } catch (innerError: any) {
          failCount++;
          const status = innerError.response?.status;
          const message = innerError.response?.data?.message || innerError.message || '';

          if (
            status === 500 &&
            (message.includes('foreign key constraint') || message.includes('purchase_request'))
          ) {
            failMessage = '거래 진행(예약) 중인 도서는 삭제할 수 없습니다.';
          } else {
            console.error(`Error deleting blind book ${id}:`, innerError);
          }
        }
      }

      if (failCount === 0) showToast('삭제가 완료되었습니다.');
      else if (successCount > 0)
        showToast(
          `일부 삭제 성공 (${successCount}건), 실패 (${failCount}건) ${failMessage ? '- ' + failMessage : ''
          }`
        );
      else showToast(`삭제 실패: ${failMessage || '오류가 발생했습니다.'}`);

      setSelectedIds([]);
      setSelectMode(false);
      fetchMyBooks();
    } catch (error: any) {
      console.error('Fatal error during batch delete:', error);
      showToast('삭제 중 알 수 없는 오류가 발생했습니다.');
    }
  };

  return (
    <BlindBookShell activeMode="sell">
      {/* ✅ 반응형 중앙 정렬 래퍼: 가로 오버플로우 방지 + 중앙 정렬 */}
      <div className="w-full max-w-full overflow-x-hidden box-border">
        <div className="flex flex-col items-start justify-center gap-[10px] py-[16px] sm:py-[20px]">
          <div className="flex items-center gap-[10px] self-stretch px-[4px] sm:px-[10px]">
            <div className="flex-1 text-[17px] leading-normal font-medium text-[#58534E] sm:text-[18px]">
              판매중 도서
            </div>
            {statusTab === 'selling' && (
              <button
                className="shrink-0 text-right text-[15px] leading-normal font-medium text-[#58534E] sm:text-[16px]"
                onClick={() => {
                  setSelectMode((v) => !v);
                  setSelectedIds([]);
                }}
              >
                {selectMode ? '취소' : '선택하기'}
              </button>
            )}
          </div>
        </div>

        <SellStatusTabs value={statusTab} onChange={setStatusTab} />

        <div className="mb-[112px] space-y-[2px] sm:mb-[120px]">
          {loading ? (
            <div className="py-10 text-center text-gray-500">목록을 불러오고 있습니다...</div>
          ) : items.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              {statusTab === 'selling' ? '판매 중인 도서가 없습니다.' : '거래 완료된 도서가 없습니다.'}
            </div>
          ) : (
            items.map((item) => (
              <BookListItem
                key={item.id}
                item={item}
                selectable={selectMode}
                selected={selectedIds.includes(item.id)}
                onToggleSelect={() => toggleSelect(item.id)}
                onClick={() => {
                  if (selectMode) {
                    toggleSelect(item.id);
                    return;
                  }

                  if (item.status === 'RESERVED') {
                    nav(`/blind-book/sell/${item.id}/waiting`);
                  } else {
                    nav(`/blind-book/sell/${item.id}`);
                  }
                }}
              />
            ))
          )}
        </div>
      </div>

      {selectMode ? (
        <EditUnderBar onSelectAll={toggleAll} onDelete={handleDeleteClick} />
      ) : (
        <BottomButton label="도서 판매하기" onClick={() => nav('/blind-book/sell/new')} />
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
          <div className="animate-fade-in-up w-full max-w-[360px] rounded-[16px] bg-white p-[20px] shadow-lg sm:p-[24px]">
            <h3 className="text-[18px] font-bold text-[#58534E] text-center mb-[8px]">판매글 삭제</h3>
            <p className="text-[15px] text-[#827A74] text-center mb-[24px] leading-relaxed">
              선택한 {selectedIds.length}개의 판매글을<br />
              정말 삭제하시겠습니까?
            </p>
            <div className="flex gap-[10px]">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 h-[48px] rounded-[12px] bg-[#F5F5F5] text-[#827A74] font-medium text-[16px]"
              >
                취소
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 h-[48px] rounded-[12px] bg-[#827A74] text-white font-medium text-[16px]"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-[104px] left-1/2 z-[110] flex w-[calc(100%-24px)] max-w-[320px] -translate-x-1/2 justify-center transform sm:bottom-[112px]">
        <Toast visible={toastVisible} message={toastMessage} />
      </div>
    </BlindBookShell>
  );
}
