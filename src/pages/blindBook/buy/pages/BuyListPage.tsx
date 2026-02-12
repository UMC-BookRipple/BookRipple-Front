import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import BlindBookShell from '../../_components/BlindBookShell';
import BuyTabs from '../_components/BuyTabs';
import type { BuyTab } from '../_types/buy.type';
import BuyCatalogListItem from '../_components/BuyCatalogListItem';
import BuyRequestCard from '../_components/BuyRequestCard';
import Divider from '../../_components/Divider';

import { getBlindBookList, getMyBlindBookRequests } from '../../../../api/blindBook.api';
import type { BlindBookSellItem } from '../../_types/blindBook.type';

export default function BuyListPage() {
  const nav = useNavigate();
  const [tab, setTab] = useState<BuyTab>('catalog');

  const [apiItems, setApiItems] = useState<BlindBookSellItem[]>([]);
  const [myRequests, setMyRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tab !== 'catalog') return;

    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const response = await getBlindBookList({ size: 20 });
        if (response.isSuccess) {
          const mappedItems: BlindBookSellItem[] = response.result.content.map((item: any) => ({
            id: String(item.blindBookId),
            titleHint: item.title,
            authorHint: '',
            price: item.price,
            badge: item.status,
            isDone: item.status === 'SOLD_OUT',
            requestCount: item.requestCount || 0,
            stickyText: item.subtitle || '',
            memo: item.description || '',
          }));
          setApiItems(mappedItems);
        }
      } catch (error) {
        console.error('Failed to fetch blind book list:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, [tab]);

  useEffect(() => {
    if (tab !== 'requested') return;

    const fetchMyRequests = async () => {
      setLoading(true);
      try {
        const response = await getMyBlindBookRequests({ size: 20 });
        console.log('My Requests Response:', response);

        if (response.isSuccess) {
          const mappedRequests = response.result.content
            .map((item: any) => {
              let statusText = '승인 대기';
              let needsPayment = false;
              let isDone = false;

              switch (item.purchaseStatus) {
                case 'REQUESTED':
                  statusText = '승인 대기';
                  break;
                case 'ACCEPTED':
                  statusText = '거래 수락';
                  needsPayment = true;
                  break;
                case 'PAYMENT_COMPLETED':
                  statusText = '배송 시작';
                  isDone = true;
                  break;
                case 'TRADING':
                  statusText = '배송 시작';
                  isDone = true;
                  break;
                case 'COMPLETED':
                  statusText = '배송 시작';
                  isDone = true;
                  break;
                case 'REJECTED':
                case 'CANCELED':
                  statusText = '거래 취소';
                  break;
                default:
                  statusText = '승인 대기';
              }

              return {
                uniqueKey: item.requestId,
                blindBookId: String(item.blindBookId),
                tradeId: item.tradeId ? String(item.tradeId) : null,
                titleHint: item.subtitle || item.actualBookTitle || item.blindBookTitle || '제목 없음',
                authorHint: item.author || '',
                description: item.description || '',
                price: item.price,
                status: statusText,
                purchaseStatus: item.purchaseStatus,
                needsPayment: needsPayment,
                isDone: isDone
              };
            });
          setMyRequests(mappedRequests);
        }
      } catch (error) {
        console.error('Failed to fetch my requests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyRequests();
  }, [tab]);

  const displayCatalogItems = useMemo(
    () => (apiItems.length > 0 ? apiItems : []),
    [apiItems]
  );

  return (
    <BlindBookShell activeMode="buy">
      {/* ✅ 반응형 중앙 정렬 래퍼: 가로 오버플로우 방지 + 중앙 정렬 */}
      <div className="w-full max-w-full overflow-x-hidden box-border">
        <div className="flex flex-col items-start justify-center gap-[10px] pt-[20px] pb-[10px]">
          <div className="flex items-center gap-[6px] self-stretch px-[10px]">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="flex-shrink-0">
              <circle cx="8.5" cy="8.5" r="8" stroke="#58534E" />
              <circle cx="8.5" cy="5.5" r="0.5" fill="#58534E" stroke="#58534E" />
              <path d="M8.5 7.5V12.5" stroke="#58534E" strokeLinecap="round" />
            </svg>
            <div className="text-[18px] font-medium text-[#58534E] font-[Freesentation]">
              블라인드 북 안내
            </div>
          </div>
        </div>

        <BuyTabs value={tab} onChange={setTab} />

        {tab === 'catalog' && (
          <div className="pb-[100px]">
            {loading && apiItems.length === 0 ? (
              <div className="py-10 text-center text-[#58534E]/60">로딩 중...</div>
            ) : displayCatalogItems.length > 0 ? (
              displayCatalogItems.map((item, index) => (
                <div key={item.id}>
                  <BuyCatalogListItem
                    item={item}
                    onClick={() => nav(`/blind-book/buy/${item.id}`)}
                  />
                  {index < displayCatalogItems.length - 1 && (
                    <div className="opacity-30">
                      <Divider />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-[#58534E]/60">
                현재 판매 중인 도서가 없습니다.
              </div>
            )}
          </div>
        )}

        {tab === 'requested' && (
          <div className="space-y-[10px] pt-[2px] pb-[100px]">
            <div className="py-[2px] -mt-[2px]">
              <Divider />
            </div>

            {loading && myRequests.length === 0 ? (
              <div className="py-10 text-center text-[#58534E]/60">로딩 중...</div>
            ) : myRequests.length > 0 ? (
              myRequests.map((item) => (
                <BuyRequestCard
                  key={item.uniqueKey}
                  item={item}
                  onClick={() => {
                    // ✅ FIXED: 상태별 라우팅 개선
                    if (item.purchaseStatus === 'ACCEPTED') {
                      nav(`/blind-book/buy/${item.blindBookId}/approved`, {
                        state: { item, tradeId: item.tradeId }
                      });
                    } else if (item.purchaseStatus === 'PAYMENT_COMPLETED') {
                      // ✅ FIXED: 결제 완료 -> reveal 페이지로
                      nav(`/blind-book/buy/${item.blindBookId}/reveal`);
                    } else if (item.purchaseStatus === 'TRADING') {
                      // ✅ FIXED: 배송 중 -> shipping-started 페이지로
                      nav(`/blind-book/buy/${item.blindBookId}/shipping-started`, {
                        state: { tradeId: item.tradeId }
                      });
                    } else if (item.purchaseStatus === 'COMPLETED') {
                      // ✅ FIXED: 거래 완료 -> reveal 페이지로
                      nav(`/blind-book/buy/${item.blindBookId}/reveal`);
                    } else if (item.purchaseStatus === 'CANCELED') {
                      // ✅ FIXED: 취소됨 -> canceled 페이지로
                      nav(`/blind-book/buy/${item.blindBookId}/canceled`);
                    } else {
                      // 기타 (REQUESTED, REJECTED 등) -> 일반 상세 페이지
                      nav(`/blind-book/buy/${item.blindBookId}`);
                    }
                  }}
                />
              ))
            ) : (
              <div className="py-20 text-center text-[#58534E]/70 font-[Freesentation]">
                구매 요청 내역이 없습니다.
              </div>
            )}
          </div>
        )}
      </div>
    </BlindBookShell>
  );
}
