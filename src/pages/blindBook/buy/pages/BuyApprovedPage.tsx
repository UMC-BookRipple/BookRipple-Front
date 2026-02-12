import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import BlindBookShell from '../../_components/BlindBookShell';
import Divider from '../../_components/Divider';
import UserInfoCard from '../../_components/UserInfoCard';
import Toast from '../../../../components/Toast';

import { cancelTrade } from '../../../../api/trade.api';
import { getBlindBookDetailForBuyer } from '../../../../api/blindBook.api';
import { formatPrice } from '../../_utils/blindBook.util';

import arrowIcon from '../../../../assets/icons/arrowIcon.svg';
import memoPaper from '../../../../assets/icons/memoPaper.svg';

export default function BuyApprovedPage() {
  const nav = useNavigate();
  const { postId } = useParams();
  const location = useLocation();

  // ✅ FIXED: tradeId 추가
  const [tradeId, setTradeId] = useState<number | null>(null);
  const [item, setItem] = useState<any>(location.state?.item || null);
  const [loading, setLoading] = useState(!location.state?.item);
  
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2000);
  };

  // ✅ FIXED: location.state에서 tradeId 추출
  useEffect(() => {
    if (location.state?.tradeId) {
      setTradeId(location.state.tradeId);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!postId) return;

      try {
        setLoading(true);
        const response = await getBlindBookDetailForBuyer(Number(postId));
        if (response.isSuccess) {
          const detail = response.result;
          setItem({
            id: String(detail.blindBookId),
            stickyText: detail.subtitle || '소개글이 없습니다.',
            titleHint: detail.title,
            price: detail.price,
            memo: detail.description,
            sellerName: detail.sellerName || '판매자'
          });
        } else {
          showToast('도서 정보를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('Failed to fetch book detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [postId]);

  // ✅ FIXED: tradeId 사용
  const handleCancelTrade = async () => {
    if (!tradeId) {
      showToast('거래 정보를 찾을 수 없습니다.');
      return;
    }

    if (!window.confirm('정말로 구매 요청을 취소하시겠습니까?')) return;

    try {
      const response = await cancelTrade(tradeId);
      console.log('Cancel Trade Response:', response);

      if (response.isSuccess) {
        showToast('거래가 취소되었습니다.');
        setTimeout(() => nav('/blind-book/buy'), 1000);
      } else {
        showToast(`취소 실패: ${response.message}`);
      }
    } catch (error: any) {
      console.error('Failed to cancel trade:', error);
      showToast('거래 취소 중 오류가 발생했습니다.');
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
        <div className="py-10 text-center">존재하지 않는 도서입니다.</div>
      </BlindBookShell>
    );
  }

  return (
    <BlindBookShell
      activeMode="buy"
      showHero={true}
      heroVariant="minimal"
      noBottomPadding={true}
      hideTabs={false}
    >
      <div className="pt-[14px] pb-[140px]">
        <button
          onClick={() => nav(-1)}
          className="flex items-center gap-[10px] py-[6px] px-[10px]"
        >
          <img src={arrowIcon} alt="back" className="h-[14px] w-[8px]" />
          <span className="text-[18px] leading-normal font-medium text-[#58534E]">
            구매 내역
          </span>
        </button>

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
                style={{ fontFamily: 'Pak_Yong_jun' }}
              >
                {item.stickyText}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-[20px] py-[8px]">
          <div className="flex flex-col gap-[2px]">
            <div 
              className="text-[18px] leading-normal font-medium text-[#58534E]"
              style={{ fontFamily: 'Freesentation' }}
            >
              {item.titleHint?.replace('...', '') || item.title}
            </div>
            <div 
              className="text-[22px] leading-normal font-semibold text-[#58534E]"
              style={{ fontFamily: 'Freesentation' }}
            >
              {formatPrice(item.price)}
            </div>
          </div>

          <div className="flex items-center justify-center px-[10px] py-[4px] rounded-[20px] bg-[#827A74]">
            <span 
              className="text-white text-[16px] font-medium"
              style={{ fontFamily: 'Freesentation' }}
            >
              승인완료
            </span>
          </div>
        </div>

        <Divider />

        <div className="flex items-center justify-center px-[20px] py-[30px]">
          <p 
            className="w-full text-center text-[16px] leading-relaxed font-normal whitespace-pre-line text-[#58534E]"
            style={{ fontFamily: 'Freesentation' }}
          >
            {item.memo || item.description}
          </p>
        </div>

        <Divider />

        <div className="mt-[15px] mb-[50px] px-[20px]">
          <UserInfoCard
            label="판매자"
            username={item.sellerName || "판매자"}
            avatarSize="large"
            showIcon={false}
          />
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-[#F7F5F1] px-[20px] pb-[20px] pt-[12px] shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
          <div className="mx-auto w-full max-w-[430px] flex flex-col gap-[10px]">
            <button
              className="h-[54px] w-full rounded-full bg-[#827A74] text-[18px] font-medium text-white transition-opacity active:opacity-90"
              style={{ fontFamily: 'Freesentation' }}
              onClick={() => nav(`/blind-book/buy/${postId}/payment`, { 
                state: { item, tradeId } // ✅ FIXED: tradeId 추가
              })}
            >
              결제하기
            </button>
            <button
              className="h-[54px] w-full rounded-full bg-white border border-[#E5E5E5] text-[18px] font-medium text-[#58534E] shadow-sm transition-colors active:bg-gray-50"
              style={{ fontFamily: 'Freesentation' }}
              onClick={handleCancelTrade}
            >
              구매요청 취소하기
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-[150px] left-1/2 z-[60] -translate-x-1/2 transform">
        <Toast visible={toastVisible} message={toastMessage} />
      </div>
    </BlindBookShell>
  );
}
