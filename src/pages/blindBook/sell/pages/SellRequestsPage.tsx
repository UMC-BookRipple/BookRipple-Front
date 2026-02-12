import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BlindBookShell from '../../_components/BlindBookShell';
import Divider from '../../_components/Divider';
import RequestItem from '../_components/RequestItem';
import Toast from '../../../../components/Toast'; // Toast 추가

import { formatPrice } from '../../_utils/blindBook.util';
import type { SellRequest } from '../../_types/blindBook.type';
import { getBlindBookDetail, getBlindBookRequests } from '../../../../api/blindBook.api';
import { approvePurchaseRequest } from '../../../../api/purchase.api';

import arrowIcon from '../../../../assets/icons/arrowIcon.svg';
import memoPaper from '../../../../assets/icons/memoPaper.svg';

export default function SellRequestsPage() {
  const nav = useNavigate();
  const { postId } = useParams();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [item, setItem] = useState<any>(null);
  const [requests, setRequests] = useState<SellRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Toast 상태
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!postId) return;
      try {
        // 1. Fetch Detail (책 정보)
        const detailRes = await getBlindBookDetail(Number(postId));
        if (detailRes.isSuccess) {
          const detail = detailRes.result;
          setItem({
            id: String(detail.blindBookId),
            stickyText: detail.subtitle || '소개글이 없습니다.', // subtitle을 메모지에 표시
            titleHint: detail.title, // 판매자 본인이므로 실제 제목 표시
            price: detail.price,
            requestCount: detail.requestCount
          });
        }

        // 2. Fetch Requests (요청 목록)
        const requestsRes = await getBlindBookRequests(Number(postId));
        console.log('API Response (getBlindBookRequests):', requestsRes);

        if (requestsRes.isSuccess) {
          const mappedRequests = requestsRes.result.requests.map((r) => ({
            id: String(r.requestId),
            nickname: r.name,
            accepted: r.status === 'ACCEPTED'
          }));
          setRequests(mappedRequests);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  const accept = async (id: string) => {
    if (!window.confirm('이 구매 요청을 승인하시겠습니까?')) return;

    try {
      const response = await approvePurchaseRequest(Number(id));
      console.log('Approve Purchase Request Response:', response);

      if (response.isSuccess) {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, accepted: true } : r)),
        );
        showToast('구매 요청이 승인되었습니다.');

        // 승인 후 '거래 대기' 페이지로 이동
        setTimeout(() => {
          nav(`/blind-book/sell/${item.id}/waiting`);
        }, 1000);

      } else {
        showToast(`승인 실패: ${response.message}`);
      }
    } catch (error: any) {
      console.error('Failed to approve purchase request:', error);
      const message = error.response?.data?.message || '승인 중 오류가 발생했습니다.';
      showToast(message);
    }
  };

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

  // 승인된 요청이 하나라도 있는지 확인 (있다면 '승인완료' 상태 표시용)
  const hasAcceptedRequest = requests.some((r) => r.accepted);

  return (
    <BlindBookShell
      activeMode="sell"
      showHero={true}
      heroVariant="minimal"
      noBottomPadding={true}
    >
      <div className="pt-[14px] pb-[20px]">
        {/* Sub Header */}
        <button
          onClick={() => nav(-1)}
          className="flex items-center gap-[10px] py-[6px] px-[10px]"
        >
          <img src={arrowIcon} alt="back" className="h-[14px] w-[8px]" />
          <span className="text-[18px] leading-normal font-medium text-[#58534E]">
            판매중 도서
          </span>
        </button>

        {/* Memo Paper Section */}
        <div className="flex w-full items-center justify-center gap-[10px] self-stretch py-[30px]">
          <div className="relative h-[181px] w-[181px]">
            <img
              src={memoPaper}
              alt="Memo Paper"
              className="absolute top-0 left-0 h-full w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
            />
            <div className="absolute inset-0 flex items-center justify-center p-6 pt-[50px] text-center">
              <span
                className="text-[16px] leading-[1.2] font-normal whitespace-pre-line text-[#58534E]"
                style={{ fontFamily: 'Pak_Yong_jun' }}
              >
                {item.stickyText}
              </span>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex items-start justify-between px-[20px] py-[10px]">
          <div className="flex flex-col gap-[4px]">
            <div
              className="text-[18px] leading-normal font-medium text-[#58534E]"
              style={{ fontFamily: 'Freesentation' }}
            >
              {item.titleHint}
            </div>
            <div
              className="text-[22px] leading-normal font-semibold text-[#58534E]"
              style={{ fontFamily: 'Freesentation' }}
            >
              {formatPrice(item.price)}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center min-w-[60px]">
            <div
              className="text-[16px] leading-normal text-[#58534E] mb-[-2px]"
              style={{ fontFamily: 'Freesentation' }}
            >
              판매요청
            </div>
            <div
              className="text-[22px] leading-normal font-bold text-[#58534E]"
              style={{ fontFamily: 'Freesentation' }}
            >
              {/* 승인된 건이 있으면 '승인완료', 아니면 요청 인원 수 표시 */}
              {hasAcceptedRequest ? '승인완료' : `${requests.length}명`}
            </div>
          </div>
        </div>

        <Divider />

        {/* Requests List */}
        <div className="mt-[20px] mb-0 space-y-[10px] px-[20px]">
          {requests.length === 0 ? (
            <div className="py-10 text-center text-[#58534E]/70" style={{ fontFamily: 'Freesentation' }}>
              아직 판매 요청이 없습니다.
            </div>
          ) : (
            requests.map((r) => (
              <RequestItem
                key={r.id}
                item={r}
                onAccept={() => accept(r.id)}
              // 다른 사람 승인 시 비활성화 처리는 RequestItem 내부 혹은 여기서 처리 필요
              // 예: disabled={hasAcceptedRequest && !r.accepted}
              />
            ))
          )}
        </div>
      </div>

      {/* Toast 메시지 */}
      <div className="fixed bottom-[100px] left-1/2 z-50 -translate-x-1/2 transform">
        <Toast visible={toastVisible} message={toastMessage} />
      </div>
    </BlindBookShell>
  );
}