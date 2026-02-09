import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  active: 'buy' | 'sell';
}

export default function BlindBookModeTabs({ active }: Props) {
  const nav = useNavigate();
  const location = useLocation();

  const isSell = active === 'sell';

  return (
    <div className="border-b border-[#58534E]">
      <div className="flex gap-[20px] px-[10px] text-[16px] font-medium">
        <button
          className={`pb-2 transition-all ${
            !isSell
              ? 'border-b-2 border-[#58534E] font-bold text-[#58534E]'
              : 'text-[#58534E]'
          }`}
          onClick={() => {
            nav('/blind-book/buy');
          }}
        >
          블라인드 도서 구매
        </button>
        <button
          className={`pb-2 transition-all ${
            isSell
              ? 'border-b-2 border-[#58534E] font-bold text-[#58534E]'
              : 'text-[#58534E]'
          }`}
          onClick={() => {
            if (!location.pathname.startsWith('/blind-book/sell'))
              nav('/blind-book/sell');
          }}
        >
          블라인드 도서 판매
        </button>
      </div>
    </div>
  );
}
