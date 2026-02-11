import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import arrowIcon from '../../assets/icons/arrowIcon.svg';

// Mock Data
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: '블라인드 북',
    message: '블라인드 북 구매 요청이 왔어요!',
    date: '1일전',
    isRead: false,
  },
  {
    id: 2,
    type: '독서알림',
    message:
      '<브람스를 좋아하세요>를 3일동안 읽지 않았어요. 독서를 진행하시겠습니까?',
    date: '1일전',
    isRead: true, // 읽은 상태 (흰색 배경)
  },
  {
    id: 3,
    type: '독서알림',
    message:
      '<브람스를 좋아하세요>나의 질문에 답변이 생성되었어요. 보러가시겠습니까?',
    date: '1일전',
    isRead: true,
  },
  {
    id: 4,
    type: '블라인드 북',
    message: '블라인드 북 구매 요청이 왔어요!',
    date: '1일전',
    isRead: true,
  },
  {
    id: 5,
    type: '블라인드 북',
    message: '블라인드 북 구매 요청이 거절되었어요',
    date: '1일전',
    isRead: true,
  },
  {
    id: 6,
    type: '커뮤니티',
    message: '추천 도서에 5명이 좋아요를 눌렀어요',
    date: '1일전',
    isRead: true,
  },
];

export default function NotificationPage() {
  const nav = useNavigate();

  return (
    <div className="min-h-dvh bg-[#F7F5F1] font-[Freesentation] text-[#58534E]">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-[#F7F5F1]">
        {/* Global Header */}
        <Header />

        {/* Sub Header (Page Title) */}
        <header className="flex items-center gap-[16px] self-stretch px-[20px] pt-[20px] pb-[4px]">
          <button
            onClick={() => nav(-1)}
            className="flex items-center justify-center"
          >
            <img
              src={arrowIcon}
              alt="Back"
              className="h-[18px] w-[9px] translate-y-[1px]"
            />
          </button>
          <h1 className="pt-[2px] text-[18px] font-medium text-[#58534E]">
            알림
          </h1>
        </header>

        <div
          style={{
            width: '370px',
            height: '0.7px',
            opacity: 0.7,
            background: 'var(--black, #58534E)',
            margin: '15px auto',
          }}
        />

        {/* List */}
        <div className="flex flex-col gap-[10px] px-[20px] pb-[20px]">
          {MOCK_NOTIFICATIONS.map((noti) => (
            <div
              key={noti.id}
              className={`flex flex-col gap-[8px] rounded-[10px] p-[16px] ${
                noti.isRead ? 'bg-white' : 'bg-[#BDB7B2]/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[14px] ${noti.isRead ? 'text-[#A6A29C]' : 'text-white'}`}>{noti.type}</span>
                <span className={`text-[14px] ${noti.isRead ? 'text-[#A6A29C]' : 'text-white'}`}>{noti.date}</span>
              </div>
              <p className="text-[16px] font-normal leading-normal text-[#58534E]">
                {noti.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
