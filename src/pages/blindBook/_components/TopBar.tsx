export default function TopBar() {
  return (
    <header className="flex h-[56px] items-center justify-between border-b border-[#58534E]/60 bg-[#F4F0E8] px-4">
      <button
        aria-label="menu"
        className="flex h-10 w-10 items-center justify-start"
      >
        <div className="space-y-[5px]">
          <div className="h-[2px] w-6 bg-[#58534E]" />
          <div className="h-[2px] w-6 bg-[#58534E]" />
          <div className="h-[2px] w-6 bg-[#58534E]" />
        </div>
      </button>

      <div className="text-[18px] font-semibold tracking-wide">BOOK RIPPLE</div>

      <button
        aria-label="profile"
        className="flex h-10 w-10 items-center justify-end"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#58534E]/70">
          <div className="h-3 w-3 rounded-full border border-[#58534E]/70" />
        </div>
      </button>
    </header>
  );
}
