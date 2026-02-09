import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../components/Header';
import Button from '../../../../components/Button';

// Mock 책 표지 이미지 (실제로는 API에서 받아올 데이터)
const MOCK_BOOK_COVER = 'https://via.placeholder.com/200x280/333/fff?text=Book+Cover';

const DESCRIPTION_MESSAGE =
    '누군가를 오래 좋아한다는 건,\n때로는 자신의 외로움까지 끌어안는 일이다.\n상상대로 그는 훌륭한 감정 사례에서 늦지\n않아온 관계의 의미를 다시 해명보려 합니다.\n조용하지만 흔들림은 깊고, 느리지만 끝내 머물\n을 바꾸는 이야기';

export default function BuyRevealPage() {
    const nav = useNavigate();
    const { postId } = useParams();

    return (
        <div className="min-h-screen bg-[#F1F0EE] font-[Freesentation] text-[#58534E]">
            <div className="mx-auto w-full max-w-[430px]">
                <Header />
                <div className="flex flex-col items-center px-[20px]">
                    {/* 타이틀 */}
                    <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{
                            display: 'flex',
                            height: '80px',
                            padding: '30px 14px 10px 14px',
                            alignItems: 'center',
                            gap: '10px',
                            flexShrink: 0,
                        }}
                    >
                        <h1
                            style={{
                                color: '#58534E',
                                fontFamily: 'Gmarket Sans TTF',
                                fontSize: '20px',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: 'normal',
                            }}
                        >
                            BLIND BOOK
                        </h1>
                    </div>

                    {/* 책 표지 이미지 */}
                    <div className="mt-[20px] flex flex-col items-center justify-center w-full">
                        <div
                            className="rounded-[8px] overflow-hidden"
                            style={{
                                width: '160px',
                                height: '237px',
                                background: `linear-gradient(180deg, rgba(0, 0, 0, 0.66) 0.25%, rgba(0, 0, 0, 0.00) 38.58%), url(${MOCK_BOOK_COVER}) lightgray 50% / cover no-repeat`,
                                boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.25)',
                            }}
                        >
                        </div>
                    </div>

                    {/* 책 제목 */}
                    <div className="mt-[30px] text-center">
                        <h2
                            style={{
                                color: '#58534E',
                                fontFamily: 'Freesentation',
                                fontSize: '18px',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: 'normal',
                            }}
                        >
                            브람스를 좋아하세요...
                        </h2>
                    </div>

                    {/* 저자 정보 */}
                    <div className="mt-[10px] text-center">
                        <p
                            style={{
                                color: '#827A74',
                                fontFamily: 'Freesentation',
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                            }}
                        >
                            프랑수아즈 사강
                        </p>
                    </div>

                    {/* 안내 문구 */}
                    <div
                        style={{
                            display: 'flex',
                            marginTop: '30px',
                            padding: '20px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                            alignSelf: 'stretch',
                        }}
                    >
                        <p
                            className="text-center whitespace-pre-line"
                            style={{
                                color: '#58534E',
                                fontFamily: 'Freesentation',
                                fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                            }}
                        >
                            {DESCRIPTION_MESSAGE}
                        </p>
                    </div>

                    {/* 구분선 */}
                    <div className="mt-[10px] w-full">
                        <div
                            style={{
                                height: '1px',
                                width: '100%',
                                background: '#58534E',
                                opacity: 0.7,
                            }}
                        />
                    </div>

                    {/* 하단 안내 문구 */}
                    <div className="mt-[30px] text-center">
                        <p
                            className="whitespace-pre-line"
                            style={{
                                color: '#A6A29C',
                                fontFamily: 'Freesentation',
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                            }}
                        >
                            판매자에게 알림을 보냈어요
                            {'\n'}
                            판매자가 곧 책을 보내줄 거예요
                        </p>
                    </div>

                    {/* 버튼 */}
                    <div
                        className="w-full"
                        style={{
                            display: 'flex',
                            padding: '36px 20px 30px 20px',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                            alignSelf: 'stretch',
                        }}
                    >
                        <Button
                            className="w-full h-[54px] rounded-full bg-white shadow-[0_4px_10px_rgba(0,0,0,0.05)] hover:bg-gray-50 transition-colors"
                            style={{
                                color: '#58534E',
                                fontFamily: 'Freesentation',
                                fontSize: '18px',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: 'normal',
                            }}
                            onClick={() => {
                                nav('/blind-book/buy');
                            }}
                        >
                            내 책장으로 돌아가기
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
