import { useNavigate } from 'react-router-dom';
import BlindBookShell from '../../_components/BlindBookShell';
import blindBookIcon from '../../../../assets/icons/blindBook-1.svg'; // 아이콘 재사용

export default function BuyTradeCanceledPage() {
    const nav = useNavigate();

    return (
        <BlindBookShell
            activeMode="buy"
            showHero={false}
            noBottomPadding={true}
            hideTabs={true}
        >
            <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-120px)] px-5 font-[Freesentation]">
                
                {/* 아이콘 영역 (취소 느낌을 위해 투명도 조절) */}
                <div className="mb-[30px] opacity-60 grayscale">
                    <img 
                        src={blindBookIcon} 
                        alt="Trade Canceled" 
                        className="w-[140px] h-[140px] object-contain"
                    />
                </div>

                {/* 메인 텍스트 */}
                <h2 className="text-[22px] font-bold text-[#58534E] mb-[10px]">
                    거래가 취소되었습니다
                </h2>

                {/* 서브 텍스트 */}
                <p className="text-[16px] text-[#9A9591] text-center leading-relaxed mb-[50px]">
                    판매자 또는 구매자의 요청으로 인해<br />
                    거래가 중단되었습니다.<br />
                    <span className="text-[14px] mt-2 block">
                        (결제된 금액은 자동으로 환불됩니다)
                    </span>
                </p>

                {/* 버튼 영역 */}
                <div className="w-full max-w-[430px] px-[20px]">
                    <button
                        onClick={() => nav('/blind-book/buy')}
                        className="w-full h-[54px] rounded-full bg-[#F7F5F1] border border-[#E5E5E5] text-[#58534E] text-[18px] font-medium shadow-sm active:bg-gray-200 transition-colors"
                    >
                        목록으로 돌아가기
                    </button>
                </div>

            </div>
        </BlindBookShell>
    );
}