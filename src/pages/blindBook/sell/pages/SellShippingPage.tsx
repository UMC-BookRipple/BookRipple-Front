import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import BlindBookShell from '../../_components/BlindBookShell';
import Divider from '../../_components/Divider';
import BottomButton from '../../_components/BottomButton';
import Input from '../_components/Input';
import Toast from '../../../../components/Toast';

import { formatPrice } from '../../_utils/blindBook.util';
import { getShippingInfo, submitShippingInfo } from '../../../../api/trade.api';

import arrowIcon from '../../../../assets/icons/arrowIcon.svg';

export default function SellShippingPage() {
  const nav = useNavigate();
  const { postId } = useParams();
  const location = useLocation();

  // ✅ tradeId 우선 사용
  const tradeId = useMemo<number | null>(() => {
    const fromState = (location.state as any)?.tradeId;
    if (typeof fromState === 'number') return fromState;
    if (postId) return Number(postId);
    return null;
  }, [location.state, postId]);

  const [shippingInfo, setShippingInfo] = useState<{
    title: string;
    price: number;
    buyerNickname: string;
    shippingAddress: string;
  } | null>(null);

  const [method, setMethod] = useState('');
  const [invoice, setInvoice] = useState('');
  const [loading, setLoading] = useState(true);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  useEffect(() => {
    const fetchInfo = async () => {
      if (!tradeId) {
        showToast('거래 정보를 찾을 수 없습니다.');
        setLoading(false);
        return;
      }

      try {
        const response = await getShippingInfo(tradeId);
        if (response.isSuccess) {
          setShippingInfo(response.result);
        } else {
          showToast(response.message || '배송 정보를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('Failed to fetch shipping info:', error);
        showToast('배송 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [tradeId]);

  const handleSubmit = async () => {
    if (!tradeId) return;

    if (!method.trim() || !invoice.trim()) {
      showToast('배송방법과 송장번호를 입력해주세요.');
      return;
    }

    // ✅ 배송사 enum은 프로젝트에 맞게 조정
    let companyName = 'CONVENIENCE';
    if (method.includes('우체국')) companyName = 'POSTOFFICE';
    else if (method.includes('편의점') || method.includes('반택') || method.includes('CU') || method.includes('GS')) {
      companyName = 'CONVENIENCE';
    }

    try {
      const response = await submitShippingInfo(tradeId, {
        companyName,
        shippingNumber: invoice.trim(),
      });

      if (response.isSuccess) {
        // ✅ 이 시점에 서버가 SOLD_OUT으로 전환되는 게 정석
        showToast('배송이 시작되었습니다. 거래가 완료되었습니다.');
        setTimeout(() => {
          // ✅ 거래완료 탭으로 이동
          nav('/blind-book/sell', { state: { tab: 'done' } });
        }, 900);
      } else {
        showToast(`등록 실패: ${response.message}`);
      }
    } catch (error: any) {
      console.error('Failed to submit shipping info:', error);
      showToast(error.response?.data?.message || '배송 정보 등록 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <BlindBookShell activeMode="sell" showHero={false}>
        <div className="py-10 text-center">로딩 중...</div>
      </BlindBookShell>
    );
  }

  if (!shippingInfo) {
    return (
      <BlindBookShell activeMode="sell" showHero={false}>
        <div className="py-10 text-center">정보를 불러올 수 없습니다.</div>
      </BlindBookShell>
    );
  }

  return (
    <BlindBookShell activeMode="sell" showHero={true} heroVariant="minimal" noBottomPadding={true}>
      <div className="pt-[14px] pb-[140px]">
        <button onClick={() => nav(-1)} className="flex items-center gap-[10px] py-[6px] px-[10px]">
          <img src={arrowIcon} alt="back" className="h-[14px] w-[8px]" />
          <span className="text-[18px] leading-normal font-medium text-[#58534E]" style={{ fontFamily: 'Freesentation' }}>
            판매중 도서
          </span>
        </button>

        <div className="mt-[10px] flex items-center gap-[4px] self-stretch px-[20px] py-[8px]">
          <div className="flex flex-1 flex-col items-start gap-[-2px]">
            <div className="text-[18px] leading-normal font-medium text-[#58534E]" style={{ fontFamily: 'Freesentation' }}>
              {shippingInfo.title}
            </div>
            <div className="text-[22px] leading-normal font-semibold text-[#58534E]" style={{ fontFamily: 'Freesentation' }}>
              {formatPrice(shippingInfo.price)}
            </div>
          </div>

          <div className="flex flex-col items-center gap-[-2px] min-w-[60px]">
            <div className="text-center text-[16px] leading-normal font-semibold text-[#58534E]" style={{ fontFamily: 'Freesentation' }}>
              배송
            </div>
            <div className="text-center text-[22px] leading-normal font-bold text-[#FF6F0F]" style={{ fontFamily: 'Freesentation' }}>
              대기
            </div>
          </div>
        </div>

        <Divider />

        <div className="px-[20px] mt-[20px]">
          <div className="mb-[12px] text-[16px] leading-normal font-medium text-[#58534E]" style={{ fontFamily: 'Freesentation' }}>
            구매자 배송정보
          </div>

          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center self-stretch rounded-[12px] bg-white p-[16px] shadow-sm">
              <div className="flex flex-1 items-center gap-[14px]">
                <div className="h-[40px] w-[40px] flex-shrink-0 rounded-full bg-[#F7F5F1]" />
                <div className="flex flex-col items-start self-stretch">
                  <div className="text-[14px] text-[#BDB7B2] font-medium" style={{ fontFamily: 'Freesentation' }}>
                    구매자
                  </div>
                  <div className="text-[18px] leading-normal font-medium text-[#58534E]" style={{ fontFamily: 'Freesentation' }}>
                    {shippingInfo.buyerNickname}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center self-stretch rounded-[12px] bg-white p-[16px] shadow-sm">
              <div className="flex flex-1 items-center gap-[14px]">
                <div className="flex flex-col items-start self-stretch w-full">
                  <div className="text-[14px] text-[#BDB7B2] font-medium" style={{ fontFamily: 'Freesentation' }}>
                    배송지
                  </div>
                  <div className="text-[16px] leading-normal font-medium text-[#58534E] break-all" style={{ fontFamily: 'Freesentation' }}>
                    {shippingInfo.shippingAddress}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        <div className="px-[20px] mt-[20px]">
          <div className="mb-[12px] text-[16px] leading-normal font-medium text-[#58534E]" style={{ fontFamily: 'Freesentation' }}>
            배송정보 입력
          </div>

          <div className="space-y-[12px]">
            <Input placeholder="배송방법 (예: 편의점 반택, 우체국 등)" value={method} onChange={(e) => setMethod(e.target.value)} />
            <Input placeholder="송장번호 입력" value={invoice} onChange={(e) => setInvoice(e.target.value)} />
          </div>
        </div>

        <BottomButton label="배송시작" onClick={handleSubmit} disabled={!method.trim() || !invoice.trim()} />
      </div>

      <div className="fixed bottom-[100px] left-1/2 z-50 -translate-x-1/2 transform">
        <Toast visible={toastVisible} message={toastMessage} />
      </div>
    </BlindBookShell>
  );
}
