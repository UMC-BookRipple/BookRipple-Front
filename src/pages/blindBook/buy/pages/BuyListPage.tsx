import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BlindBookShell from '../../_components/BlindBookShell';
import BuyTabs from '../_components/BuyTabs';
import type { BuyTab } from '../_types/buy.type';

import { MOCK_SELL_ITEMS } from '../../_mocks/blindBook.mock';
import BuyCatalogListItem from '../_components/BuyCatalogListItem';

import BuyRequestCard from '../_components/BuyRequestCard';
import { MOCK_BUY_REQUESTS } from '../_mocks/buy.mock';
import Divider from '../../_components/Divider';


export default function BuyListPage() {
  const nav = useNavigate();
  const [tab, setTab] = useState<BuyTab>('catalog');

  const catalogItems = useMemo(
    () => MOCK_SELL_ITEMS.filter((i) => !i.isDone),
    []
  );

  return (
    <BlindBookShell activeMode="buy">
      <div className="flex flex-col items-start justify-center gap-[10px] pt-[20px] pb-[10px]">
        <div className="flex items-center gap-[6px] self-stretch px-[10px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
          >
            <circle cx="8.5" cy="8.5" r="8" stroke="#58534E" />
            <circle cx="8.5" cy="5.5" r="0.5" fill="#58534E" stroke="#58534E" />
            <path
              d="M8.5 7.5V12.5"
              stroke="#58534E"
              strokeLinecap="round"
            />
          </svg>
          <div className="text-[18px] leading-normal font-medium text-[#58534E] text-center font-[Freesentation]">
            블라인드 북 안내
          </div>
        </div>
      </div>

      {/* ✅ 피그마처럼: 블라인드 북 목록 / 구매요청 보낸 책 */}
      <BuyTabs value={tab} onChange={setTab} />

      {/* ✅ 1) 블라인드 북 목록: “리스트 형태” */}
      {tab === 'catalog' && (
        <div>
          {catalogItems.map((item, index) => (
            <div key={item.id}>
              <BuyCatalogListItem
                item={item}
                onClick={() => nav(`/blind-book/buy/${item.id}`)}
              />
              {index < catalogItems.length - 1 && (
                <Divider style={{ padding: '0', opacity: 0.3 }} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* ✅ 2) 구매요청 보낸 책: 피그마 카드(뱃지 + 가격/결제하기) */}
      {tab === 'requested' && (
        <div className="space-y-[10px] pt-[2px]">
          <Divider style={{ padding: '2px 0', marginTop: '-2px' }} />
          {MOCK_BUY_REQUESTS.map((item) => (
            <BuyRequestCard
              key={item.id}
              item={item}
              onClick={() => {
                if (item.status === '거래 취소') nav(`/blind-book/buy/${item.id}/canceled`);
                else if (item.status === '거래 수락') nav(`/blind-book/buy/${item.id}/approved`);
                else if (item.status === '배송 시작') nav(`/blind-book/buy/${item.id}/shipping-started`);
                else if (item.needsPayment) nav(`/blind-book/buy/${item.id}/payment`);
                else nav(`/blind-book/buy/${item.id}`);
              }}
            />
          ))}
        </div>
      )}

    </BlindBookShell>
  );
}
