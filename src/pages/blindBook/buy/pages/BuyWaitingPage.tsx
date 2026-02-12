import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BlindBookShell from '../../_components/BlindBookShell';
import Divider from '../../_components/Divider';
import BottomButton from '../../_components/BottomButton';
import Toast from '../../../../components/Toast'; // Toast 추가

import { getBlindBookDetailForBuyer } from '../../../../api/blindBook.api';
import { formatPrice } from '../../_utils/blindBook.util';

import arrowIcon from '../../../../assets/icons/arrowIcon.svg';

export default function BuyWaitingPage() {
  const nav = useNavigate();
  const { postId } = useParams();

  // 상태 관리
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
    const fetchData = async () => {
      if (!postId) return;
      try {
        setLoading(true);
        // 구매자 관점에서의 상세 정보 조회
        const response = await getBlindBookDetailForBuyer(Number(postId));
        
        if (response.isSuccess) {
          const detail = response.result;
          setItem({
            id: String(detail.blindBookId),
            titleHint: detail.subtitle || detail.title, // 힌트 제목 우선 표시
            price: detail.price,
            // 필요한 경우 추가 필드 매핑
          });
        } else {
          showToast('도서 정보를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        showToast('오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

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
          <p>존재하지 않는 도서입니다.</p>
          <button onClick={() => nav(-1)} className="mt-4 underline text-[#827A74]">
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
        {/* 상단 네비게이션 */}
        <button
          onClick={() => nav(-1)}
          className="flex items-center gap-[10px] py-[6px] px-[10px]"
        >
          <img src={arrowIcon} alt="back" className="h-[14px] w-[8px]" />
          <span className="text-[18px] leading-normal font-medium text-[#58534E]">
            구매 도서
          </span>
        </button>

        {/* 책 정보 섹션 */}
        <div className="mt-[10px] flex items-center gap-[4px] self-stretch px-[20px] py-[8px]">
          <div className="flex flex-1 flex-col items-start gap-[-2px]">
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

          {/* 상태 배지 */}
          <div className="flex flex-col items-center gap-[-2px] min-w-[60px]">
            <div
              className="text-center text-[16px] leading-[1.3] font-semibold text-[#58534E]"
              style={{ fontFamily: 'Freesentation' }}
            >
              결제
            </div>
            <div
              className="text-center text-[22px] leading-[1.1] font-bold text-[#FF6F0F]"
              style={{ fontFamily: 'Freesentation' }}
            >
              완료
            </div>
          </div>
        </div>

        <Divider />

        {/* 안내 문구 */}
        <div
          className="mt-[35px] flex-1 text-center text-[16px] leading-normal font-normal text-[#58534E] px-[20px] whitespace-pre-line"
          style={{ fontFamily: 'Freesentation' }}
        >
          결제가 정상적으로 완료되었습니다.{'\n'}
          판매자가 배송을 시작하면 알림을 드릴게요.
        </div>

        {/* 하단 버튼 (비활성화 상태로 표시) */}
        <BottomButton 
            label="배송준비중" 
            disabled={true} 
            variant="secondary" // 비활성화 느낌을 위해 secondary 스타일 사용 (디자인 시스템에 따라 primary 유지 가능)
        />
      </div>

      {/* Toast 메시지 */}
      <div className="fixed bottom-[100px] left-1/2 z-50 -translate-x-1/2 transform">
        <Toast visible={toastVisible} message={toastMessage} />
      </div>
    </BlindBookShell>
  );
}