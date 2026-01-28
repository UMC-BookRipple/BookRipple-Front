interface TopBarProps {
    mainButtons: string[];
    activeIndex: number;
    onChange: (index: number) => void;
}

const TopBar2 = ({ mainButtons, activeIndex, onChange }: TopBarProps) => {
    return (
        <div className="flex w-full h-[40px] px-[14px] items-center bg-[#F7F5F1]">
            <div className="flex w-full border-b border-[#58534E]">
                <div className="flex gap-[10px]">
                    {mainButtons.map((text, index) => (
                        <button
                            key={index}
                            onClick={() => onChange(index)}
                            className={`
                flex h-[40px] px-[10px] items-center text-sm text-[#58534E]
                ${activeIndex === index
                                    ? "border-b-[2px] border-b-[#58534E] font-bold"
                                    : "font-medium opacity-60"}
              `}
                        >
                            {text}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopBar2;
