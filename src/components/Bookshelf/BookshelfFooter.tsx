import logo from '/src/assets/icons/logo.svg';

export default function BookshelfFooter() {
  return (
    <footer className="mx-auto flex w-full flex-col items-start gap-[10px] bg-white/80 px-[10px] pt-[15px] pb-[25px]">
      <div className="flex w-full flex-col gap-[5px]">
        <div className="h-[45.672px] w-[85px] opacity-40 grayscale">
          <img src={logo} alt="Book RIPPLE" className="h-full w-full" />
        </div>
        <div className="w-full font-[Freesentation] text-[10px] font-normal text-[#827A74]">
          한 권의 깊은 울림을 이해하는 곳
        </div>
      </div>

      <div className="w-full border-t border-[#D4CEC6]" />

      <div className="mt-[10px] flex w-full flex-col gap-[2px] font-[Freesentation] text-[8px] font-light text-[#827A74]">
        <div>북리플 UMC 9th SIDE PROJECT</div>
        <div>©2026 BOOK RIPPLE ALL RIGHT RESERVED</div>
      </div>
    </footer>
  );
}
