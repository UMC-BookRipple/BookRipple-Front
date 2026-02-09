import logo from '../../../assets/icons/logo.svg';

interface Props {
  variant?: 'default' | 'minimal';
}

export default function BlindBookHero({ variant = 'default' }: Props) {
  if (variant === 'minimal') {
    return (
      <section className="flex w-[402px] flex-col items-start gap-[10px] px-[14px] pt-[30px]">
        <div className="flex flex-1 items-center gap-[10px] px-[5px] py-[10px]">
          <h2
            className="text-[20px] leading-normal font-bold text-[#58534E]"
            style={{ fontFamily: 'GmarketSansBold' }}
          >
            BLIND BOOK
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center">
      {/* 로고 */}
      <div className="flex w-full flex-col items-center justify-center gap-[10px] px-[10px] pt-[26px] pb-[16px]">
        <img
          src={logo}
          alt="Book Ripple Logo"
          className="h-[95.6px] w-[382px]"
        />
      </div>

      {/* BLIND BOOK 타이틀 */}
      <div className="flex w-full items-center justify-center gap-[10px] px-[14px] py-[10px]">
        <h2
          className="text-[20px] leading-normal font-bold text-[#58534E]"
          style={{ fontFamily: 'GmarketSansBold' }}
        >
          BLIND BOOK
        </h2>
      </div>
    </section>
  );
}
