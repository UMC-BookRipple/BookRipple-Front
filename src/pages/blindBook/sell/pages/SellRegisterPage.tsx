import { useNavigate } from 'react-router-dom';

import BlindBookShell from '../../_components/BlindBookShell';
import Divider from '../../_components/Divider';
import BottomButton from '../../_components/BottomButton';
import Input from '../_components/Input';
import BookListItem from '../_components/BookListItem';

import { MOCK_SELL_ITEMS } from '../../_mocks/blindBook.mock';

export default function SellRegisterPage() {
  const nav = useNavigate();

  // UI 우선이라 mock로 "선택된 책" 하나를 고정으로 보여줌
  const selected = MOCK_SELL_ITEMS[0];

  return (
    <BlindBookShell activeMode="sell" showHero={false}>
      <div className="pt-5 pb-24">
        <div className="text-[22px] font-semibold">BLIND BOOK</div>

        <div className="mt-4">
          <div className="border-b border-[#58534E]/60">
            <div className="flex gap-6 text-[16px] font-medium">
              <button className="pb-3 text-[#58534E]/70">
                블라인드 도서 구매
              </button>
              <button className="border-b-2 border-[#58534E] pb-3">
                블라인드 도서 판매
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-[16px] font-semibold">블라인드 도서 등록</div>

        <div className="mt-4">
          <div className="text-[14px] font-semibold">제목 입력</div>
          <div className="mt-2 text-[12px] text-[#58534E]/60">
            책 제목을 직접적으로 나타내지 말아주세요!
          </div>
          <div className="mt-3">
            <Input placeholder="제목을 입력하세요" />
          </div>
        </div>

        <Divider />

        <div className="text-[14px] font-semibold">책 정보 입력</div>

        <button
          onClick={() => nav('/blind-book/sell/search')}
          className="mt-3 flex h-[44px] w-full items-center gap-3 rounded-[14px] border border-[#E6E2DE] bg-white px-4 text-left"
        >
          <span className="text-[#58534E]/60">🔍</span>
          <span className="text-[14px] text-[#58534E]/60">책 검색하기</span>
        </button>

        <div className="mt-4">
          <BookListItem item={selected} onClick={() => {}} />
        </div>

        <Divider />

        <div className="text-[14px] font-semibold">블라인드 북 문구 작성</div>
        <div className="mt-2 text-[12px] text-[#58534E]/60">
          책 내용을 직접적으로 드러내지 말아주세요!
        </div>

        <textarea
          className="mt-3 min-h-[120px] w-full rounded-[14px] border border-[#E6E2DE] bg-white p-4 text-[14px] outline-none"
          defaultValue="사랑처럼 프랑스 문학 특유의 냉소적이면서도 따뜻한 시선이 담겨 있습니다. 사랑받고 싶어 하는 인간의 근원적인 외로움을 다루며, 브람스를 좋아하세요...가 연인 간의 고독을 다룬다면 이 책은 삶 전체에 놓인 고독을 다룹니다."
        />

        <Divider />

        <div className="text-[14px] font-semibold">책 상태</div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <button className="h-[44px] rounded-[12px] border border-[#E6E2DE] bg-white text-[14px] font-semibold text-[#58534E]/40">
            상
          </button>
          <button className="h-[44px] rounded-[12px] border border-[#E6E2DE] bg-white text-[14px] font-semibold">
            중
          </button>
          <button className="h-[44px] rounded-[12px] border border-[#E6E2DE] bg-white text-[14px] font-semibold">
            하
          </button>
        </div>

        <Divider />

        <div className="text-[14px] font-semibold">가격 입력</div>
        <div className="mt-3">
          <Input placeholder="가격을 입력하세요" />
        </div>

        <BottomButton
          label="블라인드북 등록하기"
          onClick={() => {
            alert('등록(목업)');
            nav('/blind-book/sell');
          }}
        />
      </div>
    </BlindBookShell>
  );
}
