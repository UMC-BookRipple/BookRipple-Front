import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BlindBookShell from '../../_components/BlindBookShell';
import Divider from '../../_components/Divider';
import BottomButton from '../../_components/BottomButton';
import UserInfoCard from '../../_components/UserInfoCard';
import Toast from '../../../../components/Toast'; // Toast 추가

import { getBlindBookDetailForBuyer } from '../../../../api/blindBook.api';
import { createPurchaseRequest, cancelPurchaseRequest } from '../../../../api/purchase.api';
import { formatPrice } from '../../_utils/blindBook.util';

import arrowIcon from '../../../../assets/icons/arrowIcon.svg';
import memoPaper from '../../../../assets/icons/memoPaper.svg';

export default function BuyDetailPage() {
  const nav = useNavigate();
  const { postId } = useParams();
  
  // 상태 관리
  const [hasRequested, setHasRequested] = useState(false);
  const [purchaseRequestId, setPurchaseRequestId] = useState<number | null>(null);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [item, setItem] = useState<any>(null);
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
    const fetchDetail = async () => {
      if (!postId) return;
      try {
        const response = await getBlindBookDetailForBuyer(Number(postId));
        console.log('API Response (getBlindBookDetailForBuyer):', response);

        if (response.isSuccess) {
          const result = response.result;

          // Condition mapping
          const conditionMap: Record<string, string> = {
            'HIGH': '상', 'GOOD': '상',
            'MEDIUM': '중', 'NORMAL': '중',
            'LOW': '하', 'BAD': '하',
          };

          setItem({
            ...result,
            titleHint: result.title,
            stickyText: result.subtitle, // 포스트잇 (부제)
            memo: result.description, // 상세 설명
            bookConditionKor: conditionMap[result.bookCondition] || '중'
          });

          // Set requested state based on API
          // API가 purchaseStatus(boolean) 혹은 requestId를 반환한다고 가정
          if (result.purchaseStatus === 'REQUESTED' || result.requestId) {
            setHasRequested(true);
            setPurchaseRequestId(result.requestId);
          }
        } else {
          console.error('Failed to fetch buyer detail:', response.message);
          showToast('도서 정보를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('Error fetching buyer detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [postId]);

  // 구매 요청 핸들러
  const handleRequestPurchase = async () => {
    if (!postId) return;
    try {
      const response = await createPurchaseRequest(Number(postId));
      console.log('Create Purchase Request Response:', response);
      
      if (response.isSuccess) {
        setHasRequested(true);
        // 응답에 requestId가 있다면 저장
        if (response.result && response.result.purchaseRequestId) {
            setPurchaseRequestId(response.result.purchaseRequestId);
        } else if (typeof response.result === 'number') {
            // 혹시 result 자체가 ID인 경우
            setPurchaseRequestId(response.result);
        }
        showToast('구매 요청이 완료되었습니다.');
      } else {
        showToast(`구매 요청 실패: ${response.message}`);
      }
    } catch (error: any) {
      console.error('Failed to create purchase request:', error);
      showToast('구매 요청 중 오류가 발생했습니다.');
    }
  };

  // 요청 취소 핸들러
  const handleCancelRequest = async () => {
    if (!window.confirm('구매 요청을 취소하시겠습니까?')) return;

    try {
      // purchaseRequestId가 없으면 취소 불가 (새로고침 유도)
      if (!purchaseRequestId) {
        showToast('요청 정보를 찾을 수 없습니다. 페이지를 새로고침해주세요.');
        return;
      }

      const response = await cancelPurchaseRequest(purchaseRequestId);
      console.log('Cancel Purchase Request Response:', response);

      if (response.isSuccess) {
        setHasRequested(false);
        setPurchaseRequestId(null);
        showToast('구매 요청이 취소되었습니다.');
      } else {
        showToast(`취소 실패: ${response.message}`);
      }
    } catch (error: any) {
      console.error('Failed to cancel purchase request:', error);
      showToast('취소 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <BlindBookShell activeMode="buy" showHero={false}>
        <div className="py-10 text-center">로딩 중...</div>
      </BlindBookShell>
    );
  }

  if (!item) {
    return (
      <BlindBookShell activeMode="buy" showHero={false}>
        <div className="py-10 text-center">
          <p className="text-[#58534E] text-lg font-medium">게시글을 찾을 수 없습니다.</p>
          <button
            onClick={() => nav(-1)}
            className="mt-4 text-[#827A74] underline"
          >
            뒤로가기
          </button>
        </div>
      </BlindBookShell>
    );
  }

  return (
    <BlindBookShell
      activeMode="buy"
      showHero={true}
      heroVariant="minimal"
      noBottomPadding={true}
    >
      <div className="pt-[14px] pb-[140px]">
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
                className="text-[16px] leading-[1.4] font-normal whitespace-pre-line text-[#58534E]"
                style={{ fontFamily: 'Pak_Yong_jun' }} // 폰트 통일
              >
                {item.stickyText}
              </span>
            </div>
          </div>
        </div>

        {/* Title and Price Section with Back Button */}
        <div className="flex items-center gap-[10px] px-[20px] py-[8px]">
          <button
            onClick={() => nav(-1)}
            className="flex items-center justify-center pr-[10px]"
          >
            <img src={arrowIcon} alt="back" className="h-[28px] w-[28px]" />
          </button>

          <div className="flex flex-1 items-center justify-between">
            <div className="flex flex-col gap-[2px]">
              <div 
                className="text-[18px] leading-normal font-medium text-[#58534E]"
                style={{ fontFamily: 'Freesentation' }}
              >
                {item.titleHint?.replace('...', '')}
              </div>
              <div 
                className="text-[22px] leading-normal font-semibold text-[#58534E]"
                style={{ fontFamily: 'Freesentation' }}
              >
                {formatPrice(item.price)}
              </div>
            </div>

            {hasRequested && (
              <div className="flex items-center justify-center rounded-[20px] bg-[#BDB7B2] px-[12px] py-[6px]">
                <span 
                  className="text-[14px] font-medium text-white"
                  style={{ fontFamily: 'Freesentation' }}
                >
                  승인대기
                </span>
              </div>
            )}
          </div>
        </div>

        <Divider />

        {/* Description */}
        <div className="flex items-center justify-center gap-[10px] self-stretch px-[20px] py-[30px]">
          <p 
            className="flex-1 text-center text-[16px] leading-relaxed font-normal whitespace-pre-line text-[#58534E]"
            style={{ fontFamily: 'Freesentation' }}
          >
            {item.memo}
          </p>
        </div>

        <Divider />

        {/* Book Status Box */}
        <div className="px-[20px] mt-[20px] mb-[16px]">
            <div className="flex items-center justify-between gap-[14px] self-stretch rounded-[12px] bg-white px-[16px] py-[14px] shadow-sm border border-[#F0F0F0]">
            <span 
                className="text-[18px] leading-normal font-medium text-[#58534E]"
                style={{ fontFamily: 'Freesentation' }}
            >
                책 상태
            </span>
            <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#58534E] text-white">
                <span 
                className="text-[14px] font-medium"
                style={{ fontFamily: 'Freesentation' }}
                >
                {item.bookConditionKor}
                </span>
            </div>
            </div>
        </div>

        {/* Seller Info Box */}
        <div className="mb-[20px] px-[20px]">
          <UserInfoCard
            label="판매자"
            username={item.sellerName || "익명의 사용자"}
            avatarSize="large"
            showIcon={false}
          />
        </div>

        {/* CTA */}
        <BottomButton
          label={hasRequested ? '구매요청 취소하기' : '구매요청 보내기'}
          onClick={hasRequested ? handleCancelRequest : handleRequestPurchase}
          variant={hasRequested ? 'secondary' : 'primary'} // 상태에 따라 버튼 스타일 변경 가능
        />
      </div>

      {/* Toast 메시지 */}
      <div className="fixed bottom-[100px] left-1/2 z-50 -translate-x-1/2 transform">
        <Toast visible={toastVisible} message={toastMessage} />
      </div>
    </BlindBookShell>
  );
}