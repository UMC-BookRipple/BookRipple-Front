import { useNavigate, useParams } from 'react-router-dom';
import blindBookIcon from '../../../../assets/icons/blindBook-1.svg';
import Header from '../../../../components/Header';
import Button from '../../../../components/Button';

const DESCRIPTION_MESSAGE =
    '누군가에 의해 태어난 글,\n미완성 시놉시스로부터 불어오는 물결이\n우리에게 다가옵니다. 문학의 파동에서 불어\n오는 우리만의 이야기를 다시 채워보려 합니다.\n우리가 만든 물결로 읽고 쓰고 나만의 감수성\n을 채우는 이 공간';

export default function BuyTradeCanceledPage() {
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
                            height: '80px',
                            padding: '30px 14px 20px 14px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                            flexShrink: 0,
                            alignSelf: 'stretch',
                        }}
                    >
                        <h1
                            style={{
                                color: '#827A74',
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

                    {/* 이미지 영역 */}
                    <div className="mt-[30px] flex flex-col items-center justify-center w-full">
                        <img
                            src={blindBookIcon}
                            alt="blind book"
                            style={{ width: '186px', height: '183px' }}
                        />
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
                            alignSelf: 'stretch'
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
                                opacity: 0.7
                            }}
                        />
                    </div>

                    {/* 질문 문구 */}
                    <div className="mt-[40px]">
                        <p className="text-center text-[16px] font-medium">
                            이 이야기는 어떤 책이었을까요?
                        </p>
                    </div>

                    {/* 버튼 */}
                    <div className="mt-[40px] w-full pb-[50px]">
                        <Button
                            className="w-full h-[54px] rounded-full bg-white text-[#58534E] font-medium text-[18px] shadow-[0_4px_10px_rgba(0,0,0,0.05)] hover:bg-gray-50 transition-colors"
                            style={{
                                fontFamily: 'Freesentation',
                                color: '#58534E',
                                fontWeight: 500,
                                lineHeight: 'normal'
                            }}
                            onClick={() => {
                                nav(`/blind-book/buy/${postId}/approved`);
                            }}
                        >
                            결제하고 블라인드 북 확인하기
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
