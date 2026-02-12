import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import BlindBookShell from '../../_components/BlindBookShell';
import Divider from '../../_components/Divider';
import BottomButton from '../../_components/BottomButton';
import Input from '../_components/Input';
import BookShelfResultCard from '../../../../components/Bookshelf/BookShelfSearchResultCard';
import ConditionSelector from '../_components/ConditionSelector';
import Toast from '../../../../components/Toast'; // Toast 추가

import { createBlindBook, updateBlindBook } from '../../../../api/blindBook.api';

export default function SellRegisterPage() {
  const nav = useNavigate();
  const location = useLocation();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);

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

  // 입력 상태
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState<'상' | '중' | '하'>('중');

  // 초기 로드 및 상태 복원
  useEffect(() => {
    if (location.state) {
      if (location.state.blindBookId) {
        setIsEditMode(true);
        setTargetId(location.state.blindBookId);
      }

      if (location.state.selectedBook) {
        setSelectedBook(location.state.selectedBook);
      }

      // 책 검색에서 돌아왔을 때 입력했던 내용 복원
      if (location.state.formState) {
        const { title, subtitle, description, price, condition } = location.state.formState;
        if (title !== undefined) setTitle(title);
        if (subtitle !== undefined) setSubtitle(subtitle);
        if (description !== undefined) setDescription(description);
        if (price !== undefined) setPrice(price);
        if (condition !== undefined) setCondition(condition);
      }
    } else {
      if (!isEditMode) setSelectedBook(null);
    }
  }, [location.state, isEditMode]);

  const handleRegister = async () => {
    // 1. 유효성 검사
    if (!selectedBook && !isEditMode) {
      showToast('책을 먼저 검색하여 선택해주세요!');
      return;
    }
    if (!title.trim()) {
      showToast('제목을 입력해주세요.');
      return;
    }
    if (!subtitle.trim()) {
      showToast('부제를 입력해주세요.');
      return;
    }
    if (!description.trim()) {
      showToast('블라인드 북 문구를 입력해주세요.');
      return;
    }
    if (!price.toString().trim()) {
      showToast('가격을 입력해주세요.');
      return;
    }

    // 2. 상태 매핑 (상/중/하 -> API Enum)
    const conditionMap: Record<string, string> = {
      '상': 'HIGH',
      '중': 'MEDIUM', 
      '하': 'LOW',
    };

    try {
      // 3. 수정 모드
      if (isEditMode && targetId) {
        const requestBody = {
          title,
          subtitle,
          description,
          bookCondition: conditionMap[condition] || 'MEDIUM',
          price: Number(price),
        };
        
        console.log('Sending Update Blind Book Request:', requestBody);
        const response = await updateBlindBook(targetId, requestBody);

        if (response.isSuccess) {
          showToast('수정이 완료되었습니다!');
          setTimeout(() => nav(-1), 1000); // Toast 보여줄 시간 확보 후 이동
        } else {
          showToast(`수정 실패: ${response.message}`);
        }

      } else {
        // 4. 등록 모드
        const actualBookId = selectedBook?.bookId;

        if (!actualBookId) {
          showToast('책 정보 오류: 다시 검색해주세요.');
          return;
        }

        const requestBody = {
          actualBookId: Number(actualBookId),
          title,
          subtitle,
          description,
          bookCondition: conditionMap[condition] || 'MEDIUM',
          price: Number(price),
        };

        console.log('Sending Create Blind Book Request:', requestBody);
        const response = await createBlindBook(requestBody);

        if (response.isSuccess) {
          showToast('블라인드 북 등록 완료!');
          setTimeout(() => nav('/blind-book/sell'), 1000); // 목록으로 이동
        } else {
          showToast(`등록 실패: ${response.message}`);
        }
      }
    } catch (error: any) {
      console.error('Failed to save blind book:', error);
      const serverMessage = error.response?.data?.message || '알 수 없는 오류';
      showToast(`저장 중 오류가 발생했습니다: ${serverMessage}`);
    }
  };

  return (
    <BlindBookShell
      activeMode="sell"
      showHero={true}
      heroVariant="minimal"
      noBottomPadding={true}
    >
      <div className="pt-[14px] pb-[140px]">
        {/* Page Title */}
        <div
          className="text-[#58534E] px-[6px] py-[6px]"
          style={{ fontFamily: 'Freesentation', fontSize: '18px', fontWeight: 500 }}
        >
          {isEditMode ? '블라인드 도서 수정' : '블라인드 도서 등록'}
        </div>

        {/* --- 제목 입력 --- */}
        <div className="mt-[10px] flex flex-col gap-[14px]">
          <div className="flex items-center gap-[10px] px-[6px]">
            <div className="text-[#58534E] text-[16px] font-medium" style={{ fontFamily: 'Freesentation' }}>
              제목 입력
            </div>
          </div>
          <div className="text-[#BDB7B2] text-[14px] font-medium px-[6px]" style={{ fontFamily: 'Freesentation' }}>
            책 제목을 직접적으로 나타내지 말아주세요!
          </div>
          <div className="mb-[5px] w-full">
            <Input
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <Divider />

        {/* --- 부제 입력 --- */}
        <div className="flex flex-col gap-[14px]">
          <div className="flex items-center gap-[10px] px-[6px]">
            <div className="text-[#58534E] text-[16px] font-medium" style={{ fontFamily: 'Freesentation' }}>
              부제 입력
            </div>
          </div>
          <div className="text-[#BDB7B2] text-[14px] font-medium px-[6px]" style={{ fontFamily: 'Freesentation' }}>
            구매자에게 보여질 한 줄 소개글입니다.
          </div>
          <div className="mb-[5px] w-full">
            <Input
              placeholder="부제를 입력하세요"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>
        </div>

        <Divider />

        {/* --- 책 정보 입력 --- */}
        <div className="flex flex-col gap-[14px]">
          <div className="flex items-center gap-[10px] px-[6px]">
            <div className="text-[#58534E] text-[16px] font-medium" style={{ fontFamily: 'Freesentation' }}>
              책 정보 입력
            </div>
          </div>
        </div>

        {/* 검색 버튼 (클릭 시 이동) */}
        <div
          onClick={() => {
            // 현재 입력된 상태를 state로 넘겨주어, 돌아왔을 때 복원되도록 함
            nav('/blind-book/sell/search', {
              state: {
                formState: { title, subtitle, description, price, condition },
                isEditMode // 수정 모드 여부도 전달
              },
            });
          }}
          className="mt-[12px] cursor-pointer"
        >
          <Input
            placeholder="책 검색하기"
            readOnly
            icon={
              <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.033 6.24005C12.7903 6.24016 11.5656 6.53745 10.4612 7.10712C9.35677 7.67678 8.40458 8.50231 7.68407 9.51483C6.96357 10.5273 6.49564 11.6975 6.31933 12.9276C6.14302 14.1578 6.26344 15.4122 6.67054 16.5864C7.07765 17.7605 7.75963 18.8203 8.6596 19.6772C9.55956 20.5342 10.6514 21.1635 11.844 21.5127C13.0367 21.8618 14.2955 21.9207 15.5155 21.6844C16.7356 21.4481 17.8814 20.9234 18.8574 20.1542L22.2057 23.5026C22.3786 23.6696 22.6102 23.762 22.8506 23.7599C23.091 23.7578 23.321 23.6614 23.491 23.4914C23.661 23.3214 23.7574 23.0915 23.7595 22.8511C23.7616 22.6107 23.6691 22.3791 23.5021 22.2062L20.1538 18.8578C21.0597 17.7086 21.6237 16.3277 21.7813 14.8729C21.939 13.4182 21.6839 11.9484 21.0452 10.6319C20.4066 9.31533 19.4102 8.2052 18.1701 7.42851C16.93 6.65182 15.4962 6.23995 14.033 6.24005ZM8.07352 14.0333C8.07352 12.4527 8.70139 10.9369 9.81901 9.81927C10.9366 8.70164 12.4524 8.07376 14.033 8.07376C15.6135 8.07376 17.1294 8.70164 18.247 9.81927C19.3646 10.9369 19.9925 12.4527 19.9925 14.0333C19.9925 15.6139 19.3646 17.1297 18.247 18.2474C17.1294 19.365 15.6135 19.9929 14.033 19.9929C12.4524 19.9929 10.9366 19.365 9.81901 18.2474C8.70139 17.1297 8.07352 15.6139 8.07352 14.0333Z"
                  fill="#58534E"
                />
              </svg>
            }
          />
        </div>

        {/* 선택된 책 미리보기 */}
        {selectedBook && (
          <div className="mt-[12px] mb-[5px]">
            <BookShelfResultCard
              aladinItemId={selectedBook.aladinItemId}
              imageUrl={selectedBook.imageUrl || selectedBook.coverUrl}
              title={selectedBook.title}
              author={selectedBook.author}
              publisher={selectedBook.publisher}
              pageCount={selectedBook.totalPage || 0}
              hideButton={true}
              isSmall={true}
              hidePublisher={true}
              hidePageCount={true}
              backgroundColor="white"
              hasShadow={true}
            />
          </div>
        )}

        <Divider />

        {/* --- 문구 작성 --- */}
        <div className="flex flex-col gap-[14px]">
          <div className="flex items-center gap-[10px] px-[6px]">
            <div className="text-[#58534E] text-[16px] font-medium" style={{ fontFamily: 'Freesentation' }}>
              블라인드 북 문구 작성
            </div>
          </div>
          <div className="text-[#BDB7B2] text-[14px] font-medium px-[6px]" style={{ fontFamily: 'Freesentation' }}>
            책 내용을 직접적으로 드러내지 말아주세요!
          </div>
        </div>

        <div className="mt-[12px] mb-[8px] relative">
          <Input
            multiline
            rows={5}
            maxLength={100}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="내용을 입력하세요"
          />
          <div className="absolute bottom-2 right-4 text-xs text-gray-400">
            {description.length}/100
          </div>
        </div>

        <Divider />

        {/* --- 책 상태 --- */}
        <div className="flex flex-col gap-[14px]">
          <div className="flex items-center gap-[10px] px-[6px]">
            <div className="text-[#58534E] text-[16px] font-medium" style={{ fontFamily: 'Freesentation' }}>
              책 상태
            </div>
          </div>
        </div>
        <div className="mt-[12px]">
          <ConditionSelector
            value={condition}
            onChange={(val) => setCondition(val)}
          />
        </div>

        <Divider />

        {/* --- 가격 입력 --- */}
        <div className="flex flex-col gap-[14px]">
          <div className="flex items-center gap-[10px] px-[6px]">
            <div className="text-[#58534E] text-[16px] font-medium" style={{ fontFamily: 'Freesentation' }}>
              가격 입력
            </div>
          </div>
        </div>
        <div className="mt-[12px]">
          <Input
            placeholder="가격을 입력하세요"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* --- 하단 버튼 --- */}
        <BottomButton
          label={isEditMode ? '수정 완료' : '블라인드북 등록하기'}
          onClick={handleRegister}
        />
      </div>

      {/* Toast 메시지 */}
      <div className="fixed bottom-[100px] left-1/2 z-50 -translate-x-1/2 transform">
        <Toast visible={toastVisible} message={toastMessage} />
      </div>
    </BlindBookShell>
  );
}