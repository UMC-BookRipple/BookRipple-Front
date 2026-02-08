import { useNavigate } from 'react-router-dom';

import BlindBookShell from '../../_components/BlindBookShell';
import Divider from '../../_components/Divider';
import BottomButton from '../../_components/BottomButton';
import Input from '../_components/Input';
import BookListItem from '../_components/BookListItem';
import ConditionSelector from '../_components/ConditionSelector';

import { MOCK_SELL_ITEMS } from '../../_mocks/blindBook.mock';

export default function SellRegisterPage() {
  const nav = useNavigate();

  // UI 우선이라 mock로 "선택된 책" 하나를 고정으로 보여줌
  const selected = MOCK_SELL_ITEMS[0];

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
          className="text-[#58534E]"
          style={{
            fontFamily: 'Freesentation',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            padding: '6px 6px',
          }}
        >
          블라인드 도서 등록
        </div>

        {/* 제목 입력 */}
        <div className="mt-[10px] flex flex-col items-start justify-center gap-[14px] self-stretch">
          <div
            className="flex items-center gap-[10px] self-stretch"
            style={{ padding: '6px 6px' }}
          >
            <div
              className="text-[#58534E]"
              style={{
                fontFamily: 'Freesentation',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
              }}
            >
              제목 입력
            </div>
          </div>
          <div
            className="text-[#BDB7B2]"
            style={{
              fontFamily: 'Freesentation',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: 'normal',
              padding: '0 6px',
            }}
          >
            책 제목을 직접적으로 나타내지 말아주세요!
          </div>
          <div className="mb-[5px] w-full">
            <Input placeholder="제목을 입력하세요" />
          </div>
        </div>

        <Divider />

        {/* 책 정보 입력 */}
        <div className="flex flex-col items-start justify-center gap-[14px] self-stretch">
          <div
            className="flex items-center gap-[10px] self-stretch"
            style={{ padding: '6px 6px' }}
          >
            <div
              className="text-[#58534E]"
              style={{
                fontFamily: 'Freesentation',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
              }}
            >
              책 정보 입력
            </div>
          </div>
        </div>

        <div
          onClick={() => nav('/blind-book/sell/search')}
          style={{ cursor: 'pointer' }}
          className="mt-[12px]"
        >
          <Input
            placeholder="책 검색하기"
            readOnly
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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

        <div className="mt-[12px] mb-[5px]">
          <BookListItem
            item={selected}
            onClick={() => {}}
            hidePrice
            hideBadge
            fullWidth
          />
        </div>

        <Divider />

        {/* 블라인드 북 문구 작성 */}
        <div className="flex flex-col items-start justify-center gap-[14px] self-stretch">
          <div
            className="flex items-center gap-[10px] self-stretch"
            style={{ padding: '6px 6px' }}
          >
            <div
              className="text-[#58534E]"
              style={{
                fontFamily: 'Freesentation',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
              }}
            >
              블라인드 북 문구 작성
            </div>
          </div>
          <div
            className="text-[#BDB7B2]"
            style={{
              fontFamily: 'Freesentation',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: 'normal',
              padding: '0 6px',
            }}
          >
            책 내용을 직접적으로 드러내지 말아주세요!
          </div>
        </div>

        <div className="mt-[12px] mb-[8px]">
          <Input
            multiline
            rows={5}
            defaultValue="사랑처럼 프랑스 문학 특유의 냉소적이면서도 따뜻한 시선이 담겨 있습니다. 사랑받고 싶어 하는 인간의 근원적인 외로움을 다루며, 브람스를 좋아하세요...가 연인 간의 고독을 다룬다면 이 책은 삶 전체에 놓인 고독을 다룹니다."
          />
        </div>

        <Divider />

        {/* 책 상태 */}
        <div className="flex flex-col items-start justify-center gap-[14px] self-stretch">
          <div
            className="flex items-center gap-[10px] self-stretch"
            style={{ padding: '6px 6px' }}
          >
            <div
              className="text-[#58534E]"
              style={{
                fontFamily: 'Freesentation',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
              }}
            >
              책 상태
            </div>
          </div>
        </div>
        <div className="mt-[12px]">
          <ConditionSelector />
        </div>

        <Divider />

        {/* 가격 입력 */}
        <div className="flex flex-col items-start justify-center gap-[14px] self-stretch">
          <div
            className="flex items-center gap-[10px] self-stretch"
            style={{ padding: '6px 6px' }}
          >
            <div
              className="text-[#58534E]"
              style={{
                fontFamily: 'Freesentation',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
              }}
            >
              가격 입력
            </div>
          </div>
        </div>
        <div className="mt-[12px]">
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
