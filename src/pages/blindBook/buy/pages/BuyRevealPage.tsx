import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BlindBookShell from '../../_components/BlindBookShell';
// BottomButton import 제거 (사용하지 않음)
import Toast from '../../../../components/Toast';

import { getBlindBookDetail } from '../../../../api/blindBook.api';
import { getBookDetailByAladinId } from '../../../../api/books'; 

export default function BuyRevealPage() {
    const nav = useNavigate();
    const { postId } = useParams();

    /* eslint-disable @typescript-eslint/no-explicit-any */
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

    useEffect(() => {
        const fetchData = async () => {
            if (!postId) return;
            try {
                // 1. 블라인드 북 정보 가져오기
                const response = await getBlindBookDetail(Number(postId));
                
                if (response.isSuccess) {
                    // TypeScript 오류 해결: result를 any로 캐스팅하여 타입 검사 우회
                    const blindBook = response.result as any;
                    
                    let coverUrl = 'https://via.placeholder.com/200x280?text=No+Cover';
                    let author = '저자 미상';

                    // 2. 실제 책 정보(표지, 저자) 가져오기
                    // blindBook 데이터에 actualBookId(알라딘 ID)가 있다고 가정하고 상세 조회 시도
                    // (API 응답에 따라 blindBook.actualBookId 또는 blindBook.bookId 등을 확인해야 함)
                    const targetBookId = blindBook.actualBookId || blindBook.bookId;

                    if (targetBookId) {
                        try {
                            const aladinRes = await getBookDetailByAladinId(targetBookId);
                            coverUrl = aladinRes.coverUrl;
                            author = aladinRes.author;
                        } catch (err) {
                            console.error('Failed to fetch aladin book detail:', err);
                            // 실패 시 blindBook에 있는 정보(있다면)를 fallback으로 사용
                            if (blindBook.coverUrl) coverUrl = blindBook.coverUrl;
                            if (blindBook.author) author = blindBook.author;
                        }
                    } else {
                        // ID가 없으면 blindBook 객체 내의 정보 사용
                        if (blindBook.coverUrl) coverUrl = blindBook.coverUrl;
                        if (blindBook.author) author = blindBook.author;
                    }

                    setItem({
                        title: blindBook.title, 
                        author: author,
                        coverUrl: coverUrl,
                        description: blindBook.description
                    });
                } else {
                    showToast('도서 정보를 불러오는데 실패했습니다.');
                }
            } catch (error) {
                console.error('Failed to fetch book detail:', error);
                showToast('오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [postId]);

    if (loading) {
        return (
            <BlindBookShell activeMode="buy" showHero={false}>
                <div className="py-10 text-center">로딩 중...</div>
            </BlindBookShell>
        );
    }

    if (!item) {
        return (
            <BlindBookShell activeMode="buy" showHero={false}>
                <div className="py-10 text-center">
                    <p>도서 정보를 찾을 수 없습니다.</p>
                    <button onClick={() => nav('/blind-book/buy')} className="mt-4 underline text-[#827A74]">
                        목록으로 돌아가기
                    </button>
                </div>
            </BlindBookShell>
        );
    }

    return (
        <BlindBookShell
            activeMode="buy"
            showHero={true}
            heroVariant="minimal"
            noBottomPadding={true}
            hideTabs={true}
        >
            <div className="pt-[14px] pb-[140px] flex flex-col items-center">
                
                {/* 책 표지 이미지 */}
                <div className="mt-[20px] flex flex-col items-center justify-center w-full">
                    <div
                        className="rounded-[8px] overflow-hidden shadow-md"
                        style={{
                            width: '160px',
                            height: '237px',
                            background: `url(${item.coverUrl}) center/cover no-repeat`,
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                        }}
                    />
                </div>

                {/* 책 제목 */}
                <div className="mt-[30px] px-[20px] text-center">
                    <h2 className="text-[#58534E] font-[Freesentation] text-[20px] font-semibold break-keep">
                        {item.title}
                    </h2>
                </div>

                {/* 저자 정보 */}
                <div className="mt-[10px] text-center">
                    <p className="text-[#827A74] font-[Freesentation] text-[15px] font-normal">
                        {item.author}
                    </p>
                </div>

                {/* 안내 문구 (소개글 등) */}
                <div className="mt-[30px] w-full px-[30px] flex justify-center">
                    <p className="text-[#58534E] font-[Freesentation] text-[16px] font-normal text-center whitespace-pre-line leading-relaxed">
                        {item.description || "상세 설명이 없습니다."}
                    </p>
                </div>

                {/* 구분선 */}
                <div className="mt-[30px] w-full px-[20px]">
                    <div className="h-[1px] w-full bg-[#58534E] opacity-20" />
                </div>

                {/* 하단 안내 문구 */}
                <div className="mt-[30px] text-center px-[20px]">
                    <p className="text-[#A6A29C] font-[Freesentation] text-[15px] font-normal leading-relaxed whitespace-pre-line">
                        판매자에게 알림을 보냈어요{'\n'}
                        판매자가 곧 책을 보내줄 거예요
                    </p>
                </div>

                {/* 하단 버튼 */}
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#F7F5F1] shadow-[0_0_10px_0_rgba(0,0,0,0.10)] px-[20px] pb-[20px] pt-[12px]">
                    <div className="mx-auto w-full max-w-[430px]">
                        <button
                            className="w-full h-[54px] rounded-full bg-white border border-[#E5E5E5] text-[#58534E] font-[Freesentation] text-[18px] font-medium shadow-sm active:bg-gray-50 transition-colors"
                            onClick={() => nav('/blind-book/buy')}
                        >
                            내 책장으로 돌아가기
                        </button>
                    </div>
                </div>
            </div>

            {/* Toast 메시지 */}
            <div className="fixed bottom-[100px] left-1/2 z-[60] -translate-x-1/2 transform">
                <Toast visible={toastVisible} message={toastMessage} />
            </div>
        </BlindBookShell>
    );
}