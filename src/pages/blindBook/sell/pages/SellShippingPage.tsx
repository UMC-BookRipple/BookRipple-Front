import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BlindBookShell from '../../_components/BlindBookShell';
import Divider from '../../_components/Divider';
import BottomButton from '../../_components/BottomButton';
import Input from '../_components/Input';

import { MOCK_SELL_ITEMS } from '../../_mocks/blindBook.mock';
import { formatPrice } from '../../_utils/blindBook.util';

import arrowIcon from '../../../../assets/icons/arrowIcon.svg';

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
    <BlindBookShell
      activeMode="sell"
      showHero={true}
      heroVariant="minimal"
      noBottomPadding={true}
    >
      <div className="pt-[14px] pb-[140px]">
        {/* Sub Header */}
        <button
          onClick={() => nav(-1)}
          className="flex items-center gap-[10px] py-[6px]"
        >
          <img src={arrowIcon} alt="back" className="h-[14px] w-[8px]" />
          <span
            className="text-[18px] leading-normal font-medium text-[#58534E]"
            style={{ fontFamily: 'Freesentation' }}
          >
            판매중 도서
          </span>
        </button>

        {/* Info Section */}
        <div className="mt-[10px] flex items-center gap-[4px] self-stretch px-2 py-[8px]">
          <div className="flex flex-1 flex-col items-start gap-[-2px] rounded-[10px]">
            <div
              className="text-[18px] leading-normal font-medium text-[#58534E]"
              style={{ fontFamily: 'Freesentation' }}
            >
              {item.titleHint.replace('...', '')}
            </div>
            <div
              className="text-[22px] leading-normal font-semibold text-[#58534E]"
              style={{ fontFamily: 'Freesentation' }}
            >
              {formatPrice(item.price)}
            </div>
          </div>

          <div className="flex flex-col items-center gap-[-2px]">
            <div
              className="text-center text-[22px] leading-[1.3] font-semibold text-[#58534E]"
              style={{ fontFamily: 'Freesentation' }}
            >
              판매요청
            </div>
            <div
              className="text-center text-[22px] leading-[1.1] font-semibold text-[#58534E]"
              style={{ fontFamily: 'Freesentation' }}
            >
              승인
            </div>
          </div>
        </div>

        <div>
          <Divider />
        </div>

        {/* Buyer Information Section */}
        <div
          className="mt-[8px] mb-[12px] pl-[10px] text-[16px] leading-normal font-medium text-[#58534E]"
          style={{ fontFamily: 'Freesentation' }}
        >
          구매자 배송정보
        </div>

        <div className="flex flex-col gap-[10px]">
          {/* Buyer Card */}
          <div className="flex items-center self-stretch rounded-[12px] bg-white p-[16px]">
            <div className="flex flex-1 items-center gap-[14px]">
              <div
                className="h-[40px] w-[40px] flex-shrink-0 rounded-full bg-[#F7F5F1]"
                style={{ aspectRatio: '1/1' }}
              />
              <div className="flex flex-col items-start self-stretch">
                <div
                  className="self-stretch text-[18px] leading-normal font-medium text-[#58534E]"
                  style={{ fontFamily: 'Freesentation', fontWeight: 500 }}
                >
                  구매자
                </div>
                <div
                  className="-mt-[4px] self-stretch text-[16px] leading-normal font-medium text-[#58534E]"
                  style={{ fontFamily: 'Freesentation', fontWeight: 500 }}
                >
                  익명의 사용자 1325
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address Card */}
          <div className="flex items-center self-stretch rounded-[12px] bg-white p-[16px]">
            <div className="flex flex-1 items-center gap-[14px]">
              <div className="flex flex-col items-start self-stretch">
                <div
                  className="self-stretch text-[18px] leading-normal font-medium text-[#58534E]"
                  style={{ fontFamily: 'Freesentation', fontWeight: 500 }}
                >
                  북리플 블라인드 북
                </div>
                <div
                  className="self-stretch text-[16px] leading-normal font-medium text-[#58534E]"
                  style={{ fontFamily: 'Freesentation', fontWeight: 500 }}
                >
                  서울특별시 중구 세종대로 110
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex flex-col items-center justify-center gap-[10px] self-stretch py-[15px]">
          <div className="h-[3px] w-[402px] bg-[#E6E6E6] opacity-70" />
        </div>

        {/* Shipping Input Section */}
        <div
          className="mb-[12px] pl-[10px] text-[16px] leading-normal font-medium text-[#58534E]"
          style={{ fontFamily: 'Freesentation' }}
        >
          배송정보 입력
        </div>

        <div className="space-y-[10px]">
          <Input
            placeholder="배송방법 (편의점 반택, 우체국)"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
          <div className="flex flex-col items-start gap-[10px] self-stretch pt-[5px]">
            <div
              className="pl-[10px] text-[14px] leading-normal font-normal text-[#58534E]/60"
              style={{ fontFamily: 'Freesentation' }}
            >
              구매자에게 보낼 송장번호를 입력해 주세요
            </div>
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
