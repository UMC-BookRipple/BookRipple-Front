import Header from '../../../../components/Header';
import RecommendBookCardNoLike from '../../../../components/Card/RecommendCardNoLike';
import { dummyBooks } from '../../../../data/dummyBooks';

const RecommendCompletePage = () => {
  const book = dummyBooks[0]; // 예시: 첫 번째 도서

  return (
    <div className="flex h-screen w-full flex-col bg-[#F7F5F1]">
      {/* 상단 영역: 스크롤 가능 */}
      <div className="flex w-full flex-1 flex-col items-center overflow-y-auto">
        {/* Header */}
        <Header />

        {/* Header와 카드 사이 40px 공간 */}
        <div className="h-[40px]" />

        {/* 카드 */}
        <RecommendBookCardNoLike book={book} />
      </div>

      {/* 버튼: 화면 맨 아래, 버튼 아래 40px 공간 */}
      <div className="mt-auto flex w-full flex-col px-[16px] py-[10px]">
        {/* 버튼 위 라인 */}
        <div className="h-[0.7px] w-full bg-[#BDB7B2] opacity-70" />
        <div className="h-[10px]" />
      </div>

      <div className="mt-auto flex w-full flex-col px-[16px]">
        <button className="flex w-full items-center justify-center gap-[10px] rounded-[100px] bg-white px-[10px] py-[16px] font-[Freesentation] text-[18px] leading-normal font-[500] text-[#58534E] shadow-[0_0_1px_0_rgba(0,0,0,0.25)]">
          책장으로 가기
        </button>
      </div>

      <div className="h-[40px]" />
    </div>
  );
};

export default RecommendCompletePage;
