import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BlindBookShell from '../../_components/BlindBookShell';
import { MOCK_SELL_ITEMS } from '../../_mocks/blindBook.mock';
import { formatPrice } from '../../_utils/blindBook.util';
import blindBookIcon from '../../../../assets/icons/blindBook-1.svg';

export default function BuyPaymentPage() {
  const nav = useNavigate();
  const { postId } = useParams();

  const item = useMemo(
    () => MOCK_SELL_ITEMS.find((i) => i.id === postId),
    [postId],
  );

  const [selectedMethod, setSelectedMethod] = useState('toss');

  if (!item) {
    return (
      <BlindBookShell activeMode="buy" showHero={false}>
        <div className="py-10 text-center">존재하지 않는 도서입니다.</div>
      </BlindBookShell>
    );
  }

  const paymentMethods = [
    { id: 'toss', label: '토스 퀵 계좌이체' },
    { id: 'card', label: '신용 / 체크카드' },
    { id: 'easy', label: '간편 결제' },
    { id: 'phone', label: '휴대폰 결제' },
  ];

  return (
    <BlindBookShell
      activeMode="buy"
      showHero={true}
      heroVariant="minimal"
      noBottomPadding={true}
      hideTabs={true}
    >
      <div className="pt-[0px] pb-[140px] flex flex-col font-[Freesentation] items-center">
        {/* 상단 바 */}
        <div className="flex justify-center mb-[20px] w-full">
          <div
            style={{
              width: '370px',
              height: '0.7px',
              opacity: 0.7,
              background: '#58534E',
            }}
          />
        </div>

        {/* 블라인드 책 정보 섹션 */}
        <section
          style={{
            display: 'flex',
            width: '370px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '10px',
            marginBottom: '30px',
          }}
        >
          <h2 className="text-[16px] font-medium text-[#58534E] pl-[4px]">
            블라인드 책 정보
          </h2>
          <div
            style={{
              display: 'flex',
              padding: '10px 16px',
              justifyContent: 'space-between',
              alignItems: 'center',
              alignSelf: 'stretch',
              borderRadius: '12px',
              background: '#FFF',
              boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
              border: '1px solid rgba(88, 83, 78, 0.05)',
            }}
          >
            <div className="flex items-center gap-[16px] min-w-0 flex-1">
              <div className="relative flex-shrink-0">
                <img
                  src={blindBookIcon}
                  alt="Blind Book"
                  className="w-[70px] h-[70px] object-contain"
                />
              </div>
              <span className="text-[17px] font-medium text-[#58534E] truncate mr-2">
                {item.titleHint.replace('...', '')}
              </span>
            </div>
            <span className="text-[18px] font-bold text-[#58534E] flex-shrink-0 ml-4">
              {formatPrice(item.price)}
            </span>
          </div>
        </section>

        {/* 배송지 입력 섹션 */}
        <section
          style={{
            display: 'flex',
            width: '370px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '12px',
            marginBottom: '60px',
          }}
        >
          <h2 className="text-[16px] font-medium text-[#58534E] mb-[12px] pl-[4px]">
            배송지 입력
          </h2>
          <button
            className="flex items-center w-full h-[47px] bg-white rounded-full px-[20px] gap-[10px] shadow-[0_4px_10px_rgba(0,0,0,0.03)] border border-[#58534E]/5 group transition-all"
            onClick={() => alert('주소 검색 Mock')}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5833 13.3333H13.925L13.6917 13.1083C14.5083 12.1583 15 10.925 15 9.58333C15 6.59167 12.575 4.16667 9.58333 4.16667C6.59167 4.16667 4.16667 6.59167 4.16667 9.58333C4.16667 12.575 6.59167 15 9.58333 15C10.925 15 12.1583 14.5083 13.1083 13.6917L13.3333 13.925V14.5833L17.5 18.7417L18.7417 17.5L14.5833 13.3333ZM9.58333 13.3333C7.50833 13.3333 5.83333 11.6583 5.83333 9.58333C5.83333 7.50833 7.50833 5.83333 9.58333 5.83333C11.6583 5.83333 13.3333 7.50833 13.3333 9.58333C13.3333 11.6583 11.6583 13.3333 9.58333 13.3333Z" fill="#BDB7B2" />
            </svg>
            <span className="text-[#BDB7B2] text-[16px] font-normal font-[Freesentation]">
              주소지 입력하기
            </span>
          </button>
        </section>

        {/* 중단 바 (결제 수단 위) */}
        <div className="w-[calc(100%+40px)] mx-[-20px] mb-[10px] flex justify-center">
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
        <section className="pt-[10px] pb-[60px] w-full flex flex-col items-center">
          <div className="w-[370px]">
            <h2 className="text-[16px] font-medium text-[#58534E] mb-[20px] pl-[4px]">
              결제 수단
            </h2>
            <div className="flex flex-col gap-[18px]">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  className="flex items-center gap-[14px] group"
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className={`w-[24px] h-[24px] rounded-full border-[1.5px] flex items-center justify-center transition-all ${selectedMethod === method.id ? 'border-[#827A74] bg-white' : 'border-[#D9D9D9] bg-white'
                    }`}>
                    {selectedMethod === method.id && (
                      <div className="w-[12px] h-[12px] rounded-full bg-[#827A74]" />
                    )}
                  </div>
                  <span className={`text-[17px] transition-colors ${selectedMethod === method.id ? 'text-[#58534E] font-medium' : 'text-[#827A74] font-normal'
                    }`}>
                    {method.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 하단 버튼 섹션 */}
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
            gap: '10px',
            background: '#F7F5F1',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.10)',
            zIndex: 50,
            left: '50%',
            transform: 'translateX(-50%)', // 중앙 정렬
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
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: 'normal',
              transition: 'all 0.2s',
            }}
            className="active:scale-[0.98]"
            onClick={() => {
              nav(`/blind-book/buy/${item.id}/complete`);
            }}
          >
            {formatPrice(item.price)} 결제하기
          </button>
        </div>
      </div>
    </BlindBookShell>
  );
}
