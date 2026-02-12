import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BottomButton, { BottomButtonItem } from '../../_components/BottomButton';
import BlindBookShell from '../../_components/BlindBookShell';
import Divider from '../../_components/Divider';
import Toast from '../../../../components/Toast'; // Toast 컴포넌트 추가

import { formatPrice } from '../../_utils/blindBook.util';
import { getBlindBookDetail, deleteBlindBook } from '../../../../api/blindBook.api';

import arrowIcon from '../../../../assets/icons/arrowIcon.svg';
import memoPaper from '../../../../assets/icons/memoPaper.svg';

export default function SellDetailPage() {
  const nav = useNavigate();
  const { postId } = useParams();

  // 상태 관리
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

  // 상세 정보 조회
  useEffect(() => {
    const fetchDetail = async () => {
      if (!postId) return;
      try {
        console.log('Fetching blind book detail for id:', postId);
        const response = await getBlindBookDetail(Number(postId));

        if (response.isSuccess) {
          console.log('SellDetailPage API result:', response.result);
          console.log('SellDetailPage result keys:', Object.keys(response.result));
          setItem(response.result);
        } else {
          console.error('Failed to fetch detail:', response.message);
          showToast('정보를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('Error fetching detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [postId]);

  // 삭제 로직
  const handleDelete = async () => {
    if (!postId) return;
    if (!window.confirm('정말로 이 판매글을 삭제하시겠습니까?')) return;

    try {
      console.log('Deleting blind book id:', postId);
      const response = await deleteBlindBook(Number(postId));

      if (response.isSuccess) {
        // 삭제 성공 시 Toast를 보여주고 잠시 후 이동하거나, 즉시 이동 후 목록에서 Toast 처리 (여기선 즉시 이동)
        alert('삭제되었습니다.'); // 페이지 이동 직전이므로 alert가 더 안전할 수 있음
        nav('/blind-book/sell');
      } else {
        showToast(`삭제 실패: ${response.message}`);
      }
    } catch (error: any) {
      console.error('Error deleting blind book:', error);

      const status = error.response?.status;
      const message = error.response?.data?.message || error.message || '';

      // 거래 중인 도서 삭제 방지 예외 처리
      if (status === 500 && (message.includes('foreign key constraint') || message.includes('purchase_request'))) {
        alert('현재 구매 요청이 들어온 도서는 삭제할 수 없습니다.\n먼저 요청을 거절하거나 거래를 완료해주세요.');
      } else {
        showToast(`오류가 발생했습니다: ${message}`);
      }
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

  // 데이터 매핑
  const displayItem = {
    ...item,
    // stickyText: 메모지 위에 올라갈 짧은 소개글 (보통 subtitle 사용)
    stickyText: item.subtitle || '소개글이 없습니다.',
    // titleHint: 판매자 본인이 보는 화면이므로 실제 책 제목 표시
    titleHint: item.title,
    // memo: 하단 상세 설명
    memo: item.description,
    price: item.price,
    requestCount: item.requestCount || 0
  };

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
          className="flex items-center gap-[10px] py-[6px] px-[10px]"
        >
          <img src={arrowIcon} alt="back" className="h-[14px] w-[8px]" />
          <span className="text-[18px] leading-normal font-medium text-[#58534E]">
            판매중 도서
          </span>
        </button>

        {/* Memo Paper Section (블라인드 힌트) */}
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
                {displayItem.stickyText}
              </span>
            </div>
          </div>
        </div>

        {/* Info Section (제목, 가격, 요청수) */}
        <div className="flex items-start justify-between px-[20px] py-[10px]">
          <div className="flex flex-col gap-[4px]">
            <div
              className="text-[18px] leading-normal font-medium text-[#58534E] break-keep"
              style={{ fontFamily: 'Freesentation' }}
            >
              {displayItem.titleHint}
            </div>
            <div
              className="text-[22px] leading-normal font-semibold text-[#58534E]"
              style={{ fontFamily: 'Freesentation' }}
            >
              {formatPrice(displayItem.price)}
            </div>
          </div>

          <button
            onClick={() => nav(`/blind-book/sell/${displayItem.blindBookId}/requests`)}
            className="flex flex-col items-center justify-center min-w-[60px]"
          >
            <div
              className="text-[16px] leading-normal text-[#58534E] mb-[-2px]"
              style={{ fontFamily: 'Freesentation' }}
            >
              판매요청
            </div>
            <div
              className="text-[22px] leading-normal font-bold text-[#58534E]" // 강조색 적용
              style={{ fontFamily: 'Freesentation' }}
            >
              {displayItem.requestCount}명
            </div>
          </button>
        </div>

        <Divider />

        {/* Description (상세 설명) */}
        <div className="flex items-center justify-center gap-[10px] self-stretch px-[20px] py-[30px]">
          <p
            className="flex-1 text-center text-[15px] leading-relaxed font-normal whitespace-pre-line text-[#58534E]"
            style={{ fontFamily: 'Freesentation' }}
          >
            {displayItem.memo}
          </p>
        </div>

        <Divider />

        {/* 실제 책 정보 */}
        {(item.actualBookTitle || item.author) && (
          <div className="px-[20px] py-[20px]">
            <div
              className="flex items-center gap-[14px] rounded-[12px] bg-white px-[16px] py-[14px] shadow-sm border border-[#F0F0F0]"
            >
              {/* 책 표지 이미지 */}
              {item.coverUrl && (
                <img
                  src={item.coverUrl}
                  alt={item.actualBookTitle || '책 표지'}
                  className="h-[90px] w-[62px] flex-shrink-0 rounded-[4px] object-cover shadow-sm"
                />
              )}

              {/* 책 정보 텍스트 */}
              <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
                {item.actualBookTitle && (
                  <div
                    className="text-[16px] leading-normal font-semibold text-[#58534E] line-clamp-2"
                    style={{ fontFamily: 'Freesentation' }}
                  >
                    {item.actualBookTitle}
                  </div>
                )}
                {item.author && (
                  <div
                    className="text-[14px] leading-normal font-medium text-[#827A74] line-clamp-1"
                    style={{ fontFamily: 'Freesentation' }}
                  >
                    {item.author}
                  </div>
                )}
                <div
                  className="text-[16px] leading-normal font-semibold text-[#58534E] mt-[2px]"
                  style={{ fontFamily: 'Freesentation' }}
                >
                  {formatPrice(item.price)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <BottomButton>
          <BottomButtonItem
            label="글 수정하기"
            variant="secondary"
            onClick={() => {
              // API의 상태값을 UI 폼에 맞는 값으로 변환
              const reverseConditionMap: Record<string, '상' | '중' | '하'> = {
                'HIGH': '상', 'GOOD': '상',
                'MEDIUM': '중', 'NORMAL': '중',
                'LOW': '하', 'BAD': '하'
              };

              nav(`/blind-book/sell/${displayItem.blindBookId}/edit`, {
                state: {
                  blindBookId: displayItem.blindBookId,
                  formState: {
                    title: displayItem.title,
                    subtitle: displayItem.stickyText, // 수정 시 subtitle로 전달
                    description: displayItem.description,
                    price: displayItem.price.toString(),
                    condition: reverseConditionMap[item.bookCondition] || '중'
                  }
                }
              });
            }}
          />
          <BottomButtonItem
            label="글 삭제하기"
            variant="primary"
            onClick={handleDelete}
          />
        </BottomButton>
      </div>

      {/* Toast 메시지 */}
      <div className="fixed bottom-[100px] left-1/2 z-50 -translate-x-1/2 transform">
        <Toast visible={toastVisible} message={toastMessage} />
      </div>
    </BlindBookShell>
  );
}