import { useEffect, useState } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import BlindBookShell from '../../_components/BlindBookShell';
import blindBookIcon from '../../../../assets/icons/blindBook-2.svg';
import { confirmPayment } from '../../../../api/trade.api';

export default function BuyCompletePage() {
    const nav = useNavigate();
    const { postId } = useParams();
    const [searchParams] = useSearchParams();

    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    const [status, setStatus] = useState<'loading' | 'success' | 'fail'>('loading');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const confirm = async () => {
            if (!paymentKey || !orderId || !amount || !postId) {
                if (!paymentKey) {
                    setStatus('success');
                    return;
                }
                setStatus('fail');
                setErrorMessage('결제 정보가 부족합니다.');
                return;
            }

            try {
                const response = await confirmPayment(
                    Number(postId),
                    paymentKey,
                    orderId,
                    Number(amount)
                );
                console.log('Confirm Payment Response:', response);

                if (response.isSuccess) {
                    setStatus('success');
                } else {
                    setStatus('fail');
                    setErrorMessage(response.message);
                }
            } catch (error: any) {
                console.error('Payment Confirmation Failed:', error);
                setStatus('fail');
                setErrorMessage(error.message || '결제 승인 중 오류가 발생했습니다.');
            }
        };

        confirm();
    }, [postId, paymentKey, orderId, amount]);

    // ✅ FIXED: reveal 페이지로 이동하도록 수정
    const handleScreenClick = () => {
        if (status === 'success') {
            nav(`/blind-book/buy/${postId}/reveal`); // ✅ 책 정보 확인 페이지로 이동
        }
    };

    if (status === 'loading') {
        return (
            <BlindBookShell activeMode="buy" showHero={false} noBottomPadding={true} hideTabs={true}>
                <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-120px)] px-5 text-[#58534E]">
                    <div className="animate-pulse font-medium">결제 승인 중입니다...</div>
                </div>
            </BlindBookShell>
        );
    }

    if (status === 'fail') {
        return (
            <BlindBookShell activeMode="buy" showHero={false} noBottomPadding={true} hideTabs={true}>
                <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-120px)] px-5 gap-6">
                    <div className="text-center">
                        <div className="text-[#FF6F0F] font-bold text-lg mb-2">결제 실패</div>
                        <div className="text-[#58534E] text-sm">{errorMessage}</div>
                    </div>
                    <button
                        onClick={() => nav(-1)}
                        className="px-6 py-3 bg-[#F7F5F1] rounded-full text-[#58534E] font-medium text-sm hover:bg-[#EAE8E4] transition-colors"
                    >
                        돌아가기
                    </button>
                </div>
            </BlindBookShell>
        );
    }

    return (
        <BlindBookShell
            activeMode="buy"
            showHero={false}
            noBottomPadding={true}
            hideTabs={true}
        >
            <div 
                className="flex flex-col items-center justify-center min-h-[calc(100dvh-120px)] px-5 cursor-pointer"
                onClick={handleScreenClick}
            >
                <div
                    className="flex flex-col w-[362px] h-[570px] rounded-[20px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] overflow-hidden relative"
                    style={{
                        background: 'linear-gradient(180deg, rgba(255, 243, 208, 0.00) 0%, rgba(255, 243, 208, 0.20) 100%), #FFF',
                    }}
                >
                    <div className="flex h-[193.5px] pb-[50px] justify-center items-end shrink-0">
                        <h2 className="text-[#827A74] font-['Gmarket_Sans_TTF'] text-[20px] font-bold">
                            BLIND BOOK
                        </h2>
                    </div>

                    <div className="flex-1 flex justify-center items-center">
                        <img
                            src={blindBookIcon}
                            alt="Complete"
                            className="w-[186px] h-[183px] object-contain opacity-80"
                        />
                    </div>

                    <div className="flex h-[193.5px] pt-[20px] justify-center items-start">
                        <p className="text-[#827A74] text-center font-[Freesentation] text-[22px] font-semibold">
                            결제가 완료되었습니다
                        </p>
                    </div>
                </div>
                
                {/* ✅ FIXED: 안내 문구 수정 */}
                <div className="mt-4 text-[#BDB7B2] text-sm animate-pulse">
                    화면을 터치하면 책 정보를 확인할 수 있습니다
                </div>
            </div>
        </BlindBookShell>
    );
}
