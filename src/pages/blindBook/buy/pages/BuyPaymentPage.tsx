import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';

import BlindBookShell from '../../_components/BlindBookShell';
import Toast from '../../../../components/Toast';

// ✅ 결제 API
import { preparePayment, confirmPayment } from '../../../../api/trade.api';
import { formatPrice } from '../../_utils/blindBook.util';

import blindBookIcon from '../../../../assets/icons/blindBook-1.svg';

export default function BuyPaymentPage() {
  const nav = useNavigate();
  const { postId } = useParams();
  const location = useLocation();

  // 1) 데이터 수신
  const [item] = useState<any>(location.state?.item || null);
  const [tradeId] = useState<number | null>(location.state?.tradeId ?? null);

  // 2) 상태 관리
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('toss');

  // UI 상태
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  useEffect(() => {
    if (!item || !tradeId) {
      showToast('결제 정보가 부족합니다.');
      setTimeout(() => nav(-1), 1500);
    }
  }, [item, tradeId, nav]);

  // 주소 찾기 핸들러
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') extraAddress += data.bname;
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress);
    setIsPostcodeOpen(false);
  };

  // ✅ 결제 로직: prepare -> confirm 순차 호출
  const handlePayment = async () => {
    if (!address.trim()) {
      showToast('배송지 주소를 입력해주세요.');
      return;
    }
    if (!tradeId) {
      showToast('거래 정보를 찾을 수 없습니다.');
      return;
    }

    setIsProcessing(true);

    try {
      // 백엔드 Enum에 맞춘 Provider 매핑
      const providerMap: Record<string, string> = {
        toss: 'TOSS',
        card: 'TOSS',
        easy: 'TOSS',
        phone: 'TOSS',
        mock: 'MOCK',
      };

      const provider = providerMap[selectedMethod] || 'TOSS';
      const fullAddress = detailAddress.trim()
        ? `${address} ${detailAddress}`.trim()
        : address.trim();

      // 1) 결제 준비
      const prepareRes = await preparePayment(tradeId, {
        address: fullAddress,
        provider,
      });

      if (!prepareRes.isSuccess) {
        showToast(`결제 준비 실패: ${prepareRes.message}`);
        setIsProcessing(false);
        return;
      }

      const { orderId, amount } = prepareRes.result;

      // 2) 결제 승인 (MOCK)
      const confirmRes = await confirmPayment(
        tradeId,
        `MOCK_PAYMENT_KEY_${Date.now()}`,
        orderId,
        amount,
      );

      if (confirmRes.isSuccess) {
        showToast('결제가 완료되었습니다.');
        setTimeout(() => {
          // ✅ 결제 완료 후: 구매자 "대기" 화면으로 이동 (판매자 배송 시작 대기)
          nav(`/blind-book/buy/${postId}/waiting`, {
            state: { tradeId, item },
          });
        }, 1000);
      } else {
        showToast(`결제 승인 실패: ${confirmRes.message}`);
        setIsProcessing(false);
      }
    } catch (error: any) {
      console.error('Payment failed:', error);
      const msg =
        error.response?.data?.message || '결제 처리 중 오류가 발생했습니다.';
      showToast(msg);
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    { id: 'toss', label: '토스 퀵 계좌이체' },
    { id: 'card', label: '신용 / 체크카드' },
    { id: 'easy', label: '간편 결제' },
    { id: 'phone', label: '휴대폰 결제' },
  ];

  if (!item) return <div />;

  return (
    <BlindBookShell
      activeMode="buy"
      showHero={true}
      heroVariant="minimal"
      noBottomPadding={true}
      hideTabs={true}
    >
      <div className="flex flex-col items-center pt-[0px] pb-[140px] font-[Freesentation]">
        {/* 상단 바 */}
        <div className="mb-[20px] flex w-full justify-center">
          <div
            style={{
              width: '370px',
              height: '0.7px',
              opacity: 0.7,
              background: '#58534E',
            }}
          />
        </div>

        {/* 책 정보 */}
        <section
          style={{
            display: 'flex',
            width: '370px',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '30px',
          }}
        >
          <h2 className="pl-[4px] text-[16px] font-medium text-[#58534E]">
            블라인드 책 정보
          </h2>
          <div
            style={{
              display: 'flex',
              padding: '10px 16px',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: '12px',
              background: '#FFF',
              boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
              border: '1px solid rgba(88, 83, 78, 0.05)',
            }}
          >
            <div className="flex min-w-0 flex-1 items-center gap-[16px]">
              <img
                src={blindBookIcon}
                alt="Blind Book"
                className="h-[70px] w-[70px] object-contain"
              />
              <span className="mr-2 truncate text-[17px] font-medium text-[#58534E]">
                {item.titleHint?.replace('...', '') || '비공개 도서'}
              </span>
            </div>
            <span className="ml-4 text-[18px] font-bold text-[#58534E]">
              {formatPrice(item.price)}
            </span>
          </div>
        </section>

        {/* 배송지 입력 */}
        <section
          style={{
            display: 'flex',
            width: '370px',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '60px',
          }}
        >
          <h2 className="mb-[12px] pl-[4px] text-[16px] font-medium text-[#58534E]">
            배송지 입력
          </h2>

          <button
            className="flex h-[47px] w-full items-center gap-[10px] rounded-full border border-[#58534E]/5 bg-white px-[20px] shadow-[0_4px_10px_rgba(0,0,0,0.03)] transition-all active:scale-[0.98]"
            onClick={() => setIsPostcodeOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M14.5833 13.3333H13.925L13.6917 13.1083C14.5083 12.1583 15 10.925 15 9.58333C15 6.59167 12.575 4.16667 9.58333 4.16667C6.59167 4.16667 4.16667 6.59167 4.16667 9.58333C4.16667 12.575 6.59167 15 9.58333 15C10.925 15 12.1583 14.5083 13.1083 13.6917L13.3333 13.925V14.5833L17.5 18.7417L18.7417 17.5L14.5833 13.3333ZM9.58333 13.3333C7.50833 13.3333 5.83333 11.6583 5.83333 9.58333C5.83333 7.50833 7.50833 5.83333 9.58333 5.83333C11.6583 5.83333 13.3333 7.50833 13.3333 9.58333C13.3333 11.6583 11.6583 13.3333 9.58333 13.3333Z"
                fill="#BDB7B2"
              />
            </svg>
            <span
              className={`text-[16px] ${
                address ? 'text-[#58534E]' : 'text-[#BDB7B2]'
              }`}
            >
              {address || '주소지 입력하기'}
            </span>
          </button>

          {address && (
            <input
              type="text"
              placeholder="상세주소 입력 (예: 101동 1202호)"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              className="h-[47px] w-full rounded-full border border-[#58534E]/5 bg-white px-[20px] text-[16px] text-[#58534E] shadow-[0_4px_10px_rgba(0,0,0,0.03)] outline-none placeholder:text-[#BDB7B2]"
            />
          )}

          {isPostcodeOpen && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
              onClick={() => setIsPostcodeOpen(false)}
            >
              <div
                className="relative h-[500px] w-[400px] rounded-lg bg-white p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsPostcodeOpen(false)}
                  className="absolute top-2 right-2 text-xl font-bold text-gray-500"
                >
                  &times;
                </button>
                <DaumPostcode
                  onComplete={handleComplete}
                  style={{ height: '100%', marginTop: '20px' }}
                />
              </div>
            </div>
          )}
        </section>

        <div className="mx-[-20px] mb-[10px] flex w-[calc(100%+40px)] justify-center">
          <div
            style={{
              width: '100%',
              height: '3px',
              opacity: 0.7,
              background: '#E6E6E6',
            }}
          />
        </div>

        {/* 결제 수단 섹션 */}
        <section className="flex w-full flex-col items-center pt-[10px] pb-[60px]">
          <div className="w-[370px]">
            <h2 className="mb-[20px] pl-[4px] text-[16px] font-medium text-[#58534E]">
              결제 수단
            </h2>

            <div className="flex flex-col gap-[18px]">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  className="group flex w-full items-center gap-[14px] text-left"
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div
                    className={`flex h-[24px] w-[24px] flex-shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all ${
                      selectedMethod === method.id
                        ? 'border-[#827A74] bg-white'
                        : 'border-[#D9D9D9] bg-white'
                    }`}
                  >
                    {selectedMethod === method.id && (
                      <div className="h-[12px] w-[12px] rounded-full bg-[#827A74]" />
                    )}
                  </div>

                  <span
                    className={`text-[17px] transition-colors ${
                      selectedMethod === method.id
                        ? 'font-medium text-[#58534E]'
                        : 'font-normal text-[#827A74]'
                    }`}
                  >
                    {method.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 하단 결제 버튼 */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            display: 'flex',
            width: '402px',
            height: '85px',
            padding: '12px 20px 20px 20px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#F7F5F1',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.10)',
            zIndex: 50,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <button
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '24px',
              background: '#827A74',
              color: '#FFF',
              fontFamily: 'Freesentation',
              fontSize: '18px',
              fontWeight: 500,
            }}
            className="active:scale-[0.98] disabled:opacity-50"
            onClick={handlePayment}
            disabled={isProcessing || !address.trim()}
          >
            {isProcessing
              ? '처리 중...'
              : `${formatPrice(item.price)} 결제하기`}
          </button>
        </div>
      </div>

      <div className="pointer-events-none fixed bottom-[100px] left-1/2 z-[60] -translate-x-1/2">
        <Toast visible={toastVisible} message={toastMessage} />
      </div>
    </BlindBookShell>
  );
}
