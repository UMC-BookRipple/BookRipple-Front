import { useNavigate } from 'react-router-dom';
import Header from '../../../../components/Header';

const RecommendWritePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col bg-[#F7F5F1]">
      {/* Header */}
      <Header />

      {/* Header 아래 컨테이너 */}
      <div className="flex w-full flex-col gap-[10px] px-[14px] pt-[20px] pb-[10px]">
        {/* 제목 영역 */}
        <div className="flex w-full items-center gap-[10px] border-t border-b border-[#58534E] p-[10px]">
          <p className="font-[Freesentation] text-[16px] font-medium text-[#58534E]">
            선택한 도서 제목
          </p>
          <p className="font-[Freesentation] text-[16px] font-medium text-[#58534E]">
            &gt;
          </p>
          <p className="font-[Freesentation] text-[16px] font-medium text-[#58534E]">
            추천도서작성
          </p>
        </div>
      </div>

      {/* 🔽 선택 도서 카드 영역 */}
      <div className="flex w-full flex-col gap-[10px] px-[16px] pt-[10px] pb-[6px]">
        {/* 카드 */}
        <div className="flex w-full items-center justify-between rounded-[15px] bg-white px-[16px] py-[10px]">
          {/* 책 이미지 */}
          <div
            className="h-[131px] w-[92px] rounded-[4px] bg-gray-200"
            style={{
              backgroundImage: 'url(https://picsum.photos/92/131)', // 임시 이미지
              backgroundPosition: '50%',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* 제목 / 작가 */}
          <div className="ml-[12px] flex flex-1 flex-col items-start gap-[4px]">
            <p className="font-[Freesentation] text-[16px] font-medium text-[#58534E]">
              선택한 도서 제목
            </p>
            <p className="font-[Freesentation] text-[16px] font-normal text-[#58534E]">
              작가 이름
            </p>
          </div>

          {/* 다시 고르기 버튼 영역 */}
          <div className="flex w-[88px] flex-col items-end justify-center gap-[5px]">
            <button
              onClick={() => navigate(-1)}
              className="text-center font-[Freesentation] text-[16px] font-normal text-[#58534E] underline"
            >
              추천도서
              <br />
              다시고르기
            </button>
          </div>
        </div>
      </div>

      {/* 🔽 추천 글 작성 영역 */}
      <div className="flex h-[188px] w-full flex-shrink-0 flex-col items-start gap-[10px] px-[16px] pt-[6px] pb-[10px]">
        {/* 입력 박스 */}
        <div className="flex w-full flex-1 items-start gap-[10px] rounded-[16px] bg-white px-[16px] py-[14px]">
          <textarea
            placeholder="이 도서를 추천하는 이유를 작성해주세요."
            rows={1}
            onInput={(e) => {
              const target = e.currentTarget;
              target.style.height = 'auto';
              target.style.height = `${target.scrollHeight}px`;
            }}
            className="w-full resize-none overflow-hidden bg-transparent font-[Freesentation] text-[16px] font-normal text-[#58534E] outline-none"
          />
        </div>
      </div>

      {/* 🔽 화면 맨 아래 고정 버튼 */}
      <div className="fixed bottom-0 left-0 w-full bg-[#F7F5F1] px-[18px] py-[10px]">
        <div className="flex justify-end border-t border-[#58534E] py-[14px]">
          <button
            onClick={() => navigate('/recommend/complete')}
            className="font-[Freesentation] text-[18px] font-medium text-[#58534E]"
          >
            작성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendWritePage;
