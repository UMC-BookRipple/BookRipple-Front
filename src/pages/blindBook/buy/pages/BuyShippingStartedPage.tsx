import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import BlindBookShell from '../../_components/BlindBookShell';
import Divider from '../../_components/Divider';
import Toast from '../../../../components/Toast';

import { getTradeDetail } from '../../../../api/trade.api';
import { formatPrice } from '../../_utils/blindBook.util';

import arrowIcon from '../../../../assets/icons/arrowIcon.svg';
import memoPaper from '../../../../assets/icons/memoPaper.svg';

export default function BuyShippingStartedPage() {
  const nav = useNavigate();
  const { postId } = useParams();
  const location = useLocation();

  // ✅ FIXED: Mock 데이터 제거, API 연동
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  // ✅ FIXED: 실제 API로 배송 정보 조회
  useEffect(() => {
    const fetchData = async () => {
      if (!postId) return;
      
      try {
        // location.state에서 tradeId 받아오기
        const tradeId = location.state?.tradeId;
        
        if (!tradeId) {
          showToast('배송 정보를 찾을 수 없습니다.');
          setLoading(false);
          return;
        }
        
        const response = await getTradeDetail(tradeId);
        console.log('Trade Detail Response:', response);
        
        if (response.isSuccess) {
          const detail = response.result;
          setItem({
            titleHint: detail.bookTitle || '도서',
            price: detail.price || 0,
            stickyText: detail.description || '',
            memo: detail.description || '',
            // 배송 정보
            shippingCompany: detail.companyName || 'CONVENIENCE',
            trackingNumber: detail.shippingNumber || '',
            // 판매자 정보 (있다면)
            sellerName: detail.sellerName || '익명의 사용자',
          });
        } else {
          showToast('배송 정보를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('Failed to fetch shipping info:', error);
        showToast('오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [postId, location.state]);

  // 배송사 이름 변환
  const getCompanyDisplayName = (companyName: string) => {
    const companyMap: Record<string, string> = {
      'CONVENIENCE': '편의점 반택',
      'POSTOFFICE': '우체국 택배',
      'POST_OFFICE': '우체국 택배',
      'CJ': 'CJ대한통운',
      'HANJIN': '한진택배',
    };
    return companyMap[companyName] || companyName;
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
        <div className="py-10 text-center">배송 정보를 찾을 수 없습니다.</div>
      </BlindBookShell>
    );
  }

  return (
    <BlindBookShell
      activeMode="buy"
      showHero={true}
      heroVariant="minimal"
      noBottomPadding={false}
      hideTabs={false}
    >
      <div className="pt-[14px] pb-[40px]">
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

        {/* Title and Price Section with Back Button */}
        <div className="flex items-center gap-[27px] self-stretch py-[8px]">
          <button
            onClick={() => nav(-1)}
            className="flex items-center justify-center pl-[0px]"
          >
            <img src={arrowIcon} alt="back" className="h-[28px] w-[28px]" />
          </button>

          <div className="flex flex-1 items-center justify-between">
            <div className="flex flex-col gap-[0px]">
              <div className="font-[Freesentation] text-[18px] leading-normal font-medium text-[#58534E]">
                {item.titleHint?.replace('...', '')}
              </div>
              <div className="font-[Freesentation] text-[22px] leading-normal font-semibold text-[#58534E]">
                {formatPrice(item.price)}
              </div>
            </div>

            {/* Badge: 배송 시작 */}
            <div
              style={{
                display: 'flex',
                padding: '10px',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '20px',
                background: '#827A74',
              }}
            >
              <span
                style={{
                  width: 'auto',
                  height: '19px',
                  padding: '0 5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  textAlign: 'center',
                  fontFamily: 'Freesentation',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                배송 시작
              </span>
            </div>
          </div>
        </div>

        <Divider />

        {/* Description */}
        <div className="flex items-center justify-center gap-[10px] self-stretch px-[10px] py-[30px]">
          <p className="flex-1 text-center font-[Freesentation] text-[16px] leading-normal font-normal whitespace-pre-line text-[#58534E]">
            {item.memo}
          </p>
        </div>

        <Divider />

        {/* Book Status Box */}
        <div className="mt-[20px]">
          <div
            className="shadow-[0_0_4px_0_rgba(0,0,0,0.05)]"
            style={{
              display: 'flex',
              padding: '10px 16px',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
              alignSelf: 'stretch',
              borderRadius: '12px',
              background: '#FFF',
            }}
          >
            <span className="font-[Freesentation] text-[16px] font-medium text-[#58534E]">
              책 상태
            </span>
            <div
              style={{
                display: 'flex',
                width: '30px',
                height: '30px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                borderRadius: '50px',
                background: '#58534E',
                color: '#FFF',
                fontFamily: 'Freesentation',
                fontSize: '14px',
              }}
            >
              상
            </div>
          </div>
        </div>

        {/* Seller Info Box */}
        <div className="mt-[20px] mb-[20px]">
          <div
            style={{
              display: 'flex',
              padding: '16px',
              alignItems: 'center',
              gap: '14px',
              alignSelf: 'stretch',
              borderRadius: '12px',
              background: '#FFF',
            }}
          >
            {/* Avatar */}
            <div
              className="flex flex-shrink-0 items-center justify-center rounded-full"
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#E6E6E6',
              }}
            >
              {/* No icon */}
            </div>

            <div className="flex flex-col gap-[2px]">
              <span className="font-[Freesentation] text-[18px] leading-normal font-medium text-[#58534E]">
                판매자
              </span>
              <span className="font-[Freesentation] text-[16px] leading-normal font-medium text-[#58534E]">
                {item.sellerName}
              </span>
            </div>
          </div>
        </div>

        {/* Separator Bar */}
        <div
          style={{
            width: 'calc(100% + 40px)',
            height: '3px',
            opacity: 0.7,
            background: '#E6E6E6',
            margin: '10px -20px 20px -20px',
          }}
        />

        {/* Delivery Info Section */}
        <div className="mt-[0px]">
          <h3
            className="mb-[10px] pl-[2.5px] font-[Freesentation] font-medium text-[#58534E]"
            style={{
              fontSize: '16px',
              fontStyle: 'normal',
              lineHeight: 'normal',
            }}
          >
            배송정보 확인
          </h3>
          <div className="flex w-full items-stretch justify-start gap-[10px]">
            {/* Delivery Method Box */}
            <div
              className="shadow-[0_0_4px_0_rgba(0,0,0,0.05)]"
              style={{
                display: 'flex',
                padding: '14px 16px',
                alignItems: 'flex-start',
                gap: '10px',
                borderRadius: '12px',
                background: '#FFF',
                flexShrink: 0,
              }}
            >
              <span className="font-[Freesentation] text-[16px] font-medium text-[#58534E]">
                {getCompanyDisplayName(item.shippingCompany)}
              </span>
            </div>

            {/* Tracking Number Box */}
            <div
              className="shadow-[0_0_4px_0_rgba(0,0,0,0.05)]"
              style={{
                display: 'flex',
                padding: '14px 16px',
                alignItems: 'flex-start',
                gap: '10px',
                flex: '1 0 0',
                borderRadius: '12px',
                background: '#FFF',
              }}
            >
              <span className="font-[Freesentation] text-[16px] font-normal text-[#58534E]">
                {item.trackingNumber || '배송 준비 중'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className="fixed bottom-[100px] left-1/2 z-[60] -translate-x-1/2 transform">
        <Toast visible={toastVisible} message={toastMessage} />
      </div>
    </BlindBookShell>
  );
}
