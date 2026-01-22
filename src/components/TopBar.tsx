import { useState } from "react";
import searchIcon from "/src/assets/icons/M-search.svg";

interface TopBarProps {
  mainButtons: string[];
}

const TopBar = ({ mainButtons }: TopBarProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="flex w-[402px] h-[40px] px-[14px] py-[10px] items-center bg-[#F7F5F1]">
      <div className="flex w-full items-center justify-between border-b border-[#58534E]">
        
        {/* 왼쪽: main buttons */}
        <div className="flex gap-[10px]">
          {mainButtons.map((text, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`
                flex h-[40px] px-[10px] justify-center items-center gap-[10px] text-sm text-[#58534E]
                ${activeIndex === index ? "border-b-[1.5px] border-b-[#58534E] font-bold" : "font-medium"}
              `}
            >
              {text}
            </button>
          ))}
        </div>

        {/* 오른쪽: 돋보기 버튼 */}
        <button
          type="button"
          className="flex w-[40px] h-[40px] p-[10px] justify-center items-center gap-[10px] aspect-[1/1] bg-white"
          onClick={() => console.log("Search icon clicked!")}
        >
          <img src={searchIcon} alt="Search" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
