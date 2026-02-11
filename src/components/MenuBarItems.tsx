const MenuBarItems = ({
    MenuBarLabel,
    mainLabel,
    plusMenuLabel,
    onClickMain,
    onClick,
    isSelectMode,
    onClickPlus,
    className,
}: {
    MenuBarLabel: string;
    mainLabel?: string;
    plusMenuLabel?: string;
    onClickMain?: () => void;
    onClick?: () => void;
    isSelectMode?: boolean;
    onClickPlus?: () => void;
    className?: string;
}) => {
    return (
        <div className={`flex items-center gap-[10px] self-stretch border-y-[1.3px] border-[#58534E] p-[8px] ${className}`}>
            <div className="w-full truncate font-sans text-[16px] leading-normal font-medium text-[#58534E]">
                {mainLabel && (
                    <span onClick={onClickMain}>
                        {mainLabel}
                    </span>
                )}

                {mainLabel && MenuBarLabel && (
                    <span className="mx-[10px]">&gt;</span>
                )}
                <span
                    onClick={onClick}>
                    {MenuBarLabel}
                </span>
            </div>
            {plusMenuLabel && (
                <button
                    type="button"
                    onClick={onClickPlus}
                    className={`flex items-center justify-center ml-3 shrink-0 text-[14px] font-medium text-[#58534E] h-[28px] px-[10px] py-[6px] ${isSelectMode ? 'bg-[#827A74] rounded-[50px] text-[#FFFFFF]' : 'text-[#58534E]'
                        }`}
                >
                    {plusMenuLabel}
                </button>
            )}
        </div>
    );
};

export default MenuBarItems;
