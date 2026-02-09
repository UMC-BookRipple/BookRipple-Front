import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header'; // 공통 헤더 추가
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
        message: '<브람스를 좋아하세요>를 3일동안 읽지 않았어요. 독서를 진행하시겠습니까?',
        date: '1일전',
        isRead: true, // 읽은 상태 (흰색 배경)
    },
    {
        id: 3,
        type: '독서알림',
        message: '<브람스를 좋아하세요>나의 질문에 답변이 생성되었어요. 보러가시겠습니까?',
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
            <div className="mx-auto w-full max-w-[430px] min-h-dvh bg-[#F7F5F1]">
                {/* Global Header */}
                <Header />

                {/* Sub Header (Page Title) */}
                <header className="flex h-[50px] items-center px-[20px] bg-[#F7F5F1]">
                    <button onClick={() => nav(-1)} className="mr-[10px] flex items-center justify-center">
                        <img src={arrowIcon} alt="Back" className="w-[28px] h-[28px]" />
                    </button>
                    <h1 className="text-[18px] font-medium text-[#58534E] pt-[2px]">알림</h1>
                </header>

                <div
                    style={{
                        width: '370px',
                        height: '0.7px',
                        opacity: 0.7,
                        background: 'var(--black, #58534E)',
                        margin: '0 auto 10px auto',
                    }}
                />

                {/* List */}
                <div className="flex flex-col gap-[10px] px-[20px] pb-[20px]">
                    {MOCK_NOTIFICATIONS.map((noti) => (
                        <div
                            key={noti.id}
                            className={`flex flex-col gap-[8px] rounded-[12px] p-[16px] shadow-sm ${noti.isRead ? 'bg-[#FFF]' : 'bg-[#D3CEC8]'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-[14px] text-[#A6A29C]">{noti.type}</span>
                                <span className="text-[14px] text-[#A6A29C]">{noti.date}</span>
                            </div>
                            <p className="text-[16px] leading-[1.4] text-[#58534E]">
                                {noti.message}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
