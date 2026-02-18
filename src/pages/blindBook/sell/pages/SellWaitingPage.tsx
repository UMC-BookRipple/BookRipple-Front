import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BlindBookShell from '../../_components/BlindBookShell';
import Divider from '../../_components/Divider';
import BottomButton from '../../_components/BottomButton';
import RequestItem from '../_components/RequestItem';
import Toast from '../../../../components/Toast';

import { getBlindBookDetail, getBlindBookRequests } from '../../../../api/blindBook.api';
import { formatPrice } from '../../_utils/blindBook.util';
import type { SellRequest } from '../../_types/blindBook.type';
import arrowIcon from '../../../../assets/icons/arrowIcon.svg';

interface WaitingSellRequest extends SellRequest {
  status: string;
  isPaid: boolean; // ✅ 결제 완료 플래그
  tradeId?: number;
}

// ✅ getBlindBookRequests 응답에서 실제로 쓰는 필드만 로컬 타입 정의
type RequestFromApi = {
  requestId: number;
  name: string;
  status: string;
  // ✅ 서버가 내려줄 수 있는 결제 플래그 후보들
  isPaid?: boolean;
  paid?: boolean;
  tradeId?: number;
};

export default function SellWaitingPage() {
  const nav = useNavigate();
  const { postId } = useParams();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [item, setItem] = useState<any>(null);
  const [acceptedRequest, setAcceptedRequest] = useState<WaitingSellRequest | null>(null);
  const [loading, setLoading] = useState(true);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  // ✅ 결제 완료 판단: 서버 플래그 우선 + 레거시 상태값도 안전하게 대응
  const isPaid =
    acceptedRequest?.isPaid === true ||
    acceptedRequest?.status === 'PAYMENT_COMPLETED' ||
    acceptedRequest?.status === 'TRADING';

  useEffect(() => {
    if (!postId) return;

    let mounted = true;

    const fetchData = async () => {
      try {
        // 1) 책 정보
        const detailRes = await getBlindBookDetail(Number(postId));
        if (mounted) {
          if (detailRes.isSuccess) {
            const detail = detailRes.result;
            setItem({
              id: String(detail.blindBookId),
              titleHint: detail.subtitle || detail.title,
              price: detail.price,
            });
          } else {
            showToast('도서 정보를 불러오는데 실패했습니다.');
          }
        }

        // 2) 요청 정보 (승인 요청 + 결제 플래그 확인)
        const requestsRes = await getBlindBookRequests(Number(postId));
        if (mounted && requestsRes.isSuccess) {
          const requests = requestsRes.result.requests as RequestFromApi[];

          // ✅ “승인된 요청”을 기준으로 봄 (서버가 RESERVED 유지하므로 status만으로는 결제 여부를 판단 못함)
          const target = requests.find((r) => r.status === 'ACCEPTED' || r.status === 'TRADING' || r.status === 'PAYMENT_COMPLETED');

          if (target) {
            const paidFlag = target.isPaid === true || target.paid === true;

            setAcceptedRequest({
              id: String(target.requestId),
              nickname: target.name,
              accepted: true,
              status: target.status,
              isPaid: paidFlag, // ✅ 핵심
              tradeId: target.tradeId,
            });
          } else {
            setAcceptedRequest(null);
          }
        }
      } catch (error) {
        console.error('Error fetching data in SellWaitingPage:', error);
        showToast('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    // ✅ 폴링: 결제 완료 플래그 감지
    const intervalId = window.setInterval(fetchData, 5000);

    return () => {
      mounted = false;
      window.clearInterval(intervalId);
    };
  }, [postId]);

  if (loading) {
    return (
      <BlindBookShell activeMode="sell" showHero={false}>
        <div className="py-10 text-center">로딩 중...</div>
      </BlindBookShell>
    );
  }

  if (!item) {
    return (
      <BlindBookShell activeMode="sell" showHero={false}>
        <div className="py-10 text-center">존재하지 않는 판매글입니다.</div>
      </BlindBookShell>
    );
  }

  return (
    <BlindBookShell activeMode="sell" showHero={true} heroVariant="minimal" noBottomPadding={true}>
      <div className="pt-[14px] pb-[140px]">
        <button onClick={() => nav(-1)} className="flex items-center gap-[10px] py-[6px] px-[10px]">
          <img src={arrowIcon} alt="back" className="h-[14px] w-[8px]" />
          <span className="text-[18px] leading-normal font-medium text-[#58534E]">판매중 도서</span>
        </button>

        <div className="mt-[10px] flex items-center gap-[4px] self-stretch px-[20px] py-[8px]">
          <div className="flex flex-1 flex-col items-start gap-[-2px]">
            <div className="text-[18px] leading-normal font-medium text-[#58534E]" style={{ fontFamily: 'Freesentation' }}>
              {item.titleHint}
            </div>
            <div className="text-[22px] leading-normal font-semibold text-[#58534E]" style={{ fontFamily: 'Freesentation' }}>
              {formatPrice(item.price)}
            </div>
          </div>

          <div className="flex flex-col items-center gap-[-2px] min-w-[60px]">
            <div className="text-center text-[22px] leading-[1.3] font-semibold text-[#58534E]" style={{ fontFamily: 'Freesentation' }}>
              판매요청
            </div>
            <div className="text-center text-[22px] leading-[1.1] font-bold text-[#58534E]" style={{ fontFamily: 'Freesentation' }}>
              승인
            </div>
          </div>
        </div>

        <Divider />

        {acceptedRequest ? (
          <div className="mt-[20px] px-[20px]">
            <RequestItem item={acceptedRequest} />
          </div>
        ) : (
          <div className="py-10 text-center text-[#BDB7B2]">승인된 요청 정보를 찾을 수 없습니다.</div>
        )}

        <div
          className="mt-[35px] flex-1 text-center text-[16px] leading-normal font-normal text-[#58534E] px-[20px] whitespace-pre-line"
          style={{ fontFamily: 'Freesentation' }}
        >
          {isPaid
            ? '결제가 완료되었습니다.\n배송 정보 입력 버튼이 활성화됩니다.'
            : '구매자가 결제를 진행 중입니다.\n결제가 완료되면 배송 정보 입력 버튼이 활성화됩니다.'}
        </div>

        {/* ✅ 결제 완료 전: 비활성 / 결제 완료 후: 배송 정보 입력 가능 */}
        {isPaid ? (
          <BottomButton
            label="배송 정보 입력하기"
            onClick={() => {
              const tradeId = acceptedRequest?.tradeId ?? Number(postId); // tradeId 없으면 fallback
              nav(`/blind-book/sell/${postId}/shipping`, { state: { tradeId } });
            }}
          />
        ) : (
          <BottomButton label="결제 대기중" disabled variant="secondary" />
        )}
      </div>

      <div className="fixed bottom-[100px] left-1/2 z-50 -translate-x-1/2 transform">
        <Toast visible={toastVisible} message={toastMessage} />
      </div>
    </BlindBookShell>
  );
}
