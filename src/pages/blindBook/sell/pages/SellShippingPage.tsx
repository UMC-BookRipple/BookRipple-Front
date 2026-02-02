import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BlindBookShell from '../../_components/BlindBookShell';
import Divider from '../../_components/Divider';
import BottomButton from '../../_components/BottomButton';
import Input from '../_components/Input';

import { MOCK_SELL_ITEMS } from '../../_mocks/blindBook.mock';
import { formatPrice } from '../../_utils/blindBook.util';

export default function SellShippingPage() {
  const nav = useNavigate();
  const { postId } = useParams();
  const item = useMemo(
    () => MOCK_SELL_ITEMS.find((i) => i.id === postId),
    [postId],
  );

  const [method, setMethod] = useState('');
  const [invoice, setInvoice] = useState('');

  if (!item) {
    return (
      <BlindBookShell activeMode="sell" showHero={false}>
        <div className="py-10">존재하지 않는 판매글입니다.</div>
      </BlindBookShell>
    );
  }

  return (
    <BlindBookShell activeMode="sell" showHero={false}>
      <div className="pt-5 pb-24">
        <div className="flex items-center gap-2 text-[16px]">
          <button onClick={() => nav(-1)} className="text-[18px]">
            〈
          </button>
          <span>판매중 도서</span>
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <div className="text-[16px] font-semibold">
              {item.titleHint.replace('...', '')}
            </div>
            <div className="mt-1 text-[24px] font-bold">
              {formatPrice(item.price)}
            </div>
          </div>

          <div className="text-right">
            <div className="text-[18px] font-semibold">판매요청</div>
            <div className="text-[18px] font-semibold">승인</div>
          </div>
        </div>

        <Divider />

        <div className="mb-3 text-[14px] font-semibold">구매자 배송정보</div>

        <div className="overflow-hidden rounded-[16px] bg-white shadow-[0px_2px_6px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-3 border-b border-[#EFEAE5] px-4 py-4">
            <div className="h-10 w-10 rounded-full bg-[#E8E4DE]" />
            <div>
              <div className="text-[14px] font-semibold">구매자</div>
              <div className="text-[14px] text-[#58534E]/70">
                익명의 사용자 1325
              </div>
            </div>
          </div>

          <div className="px-4 py-4">
            <div className="text-[14px] font-semibold">북리플 블라인드 북</div>
            <div className="mt-1 text-[14px] text-[#58534E]/70">
              서울특별시 중구 세종대로 110
            </div>
          </div>
        </div>

        <div className="mt-6 text-[14px] font-semibold">배송정보 입력</div>

        <div className="mt-3 space-y-3">
          <Input
            placeholder="배송방법 (편의점 반택, 우체국)"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
          <div className="text-[12px] text-[#58534E]/60">
            구매자에게 보낼 송장번호를 입력해 주세요
          </div>
          <Input
            placeholder="송장번호 입력"
            value={invoice}
            onChange={(e) => setInvoice(e.target.value)}
          />
        </div>

        <BottomButton
          label="배송시작"
          onClick={() => {
            alert(`배송시작(목업)\n방법: ${method}\n송장: ${invoice}`);
            nav('/blind-book/sell');
          }}
          disabled={!method || !invoice}
        />
      </div>
    </BlindBookShell>
  );
}
