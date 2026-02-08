const MenuBarItems = ({ MenuBarLabel, mainLabel, plusMenuLabel, onClick, isSelectMode }: { MenuBarLabel: string, mainLabel?: string, plusMenuLabel?: string, onClick: () => void, isSelectMode: boolean }) => {
    return (

        <div className="w-full flex flex-row justify-start p-[10px] gap-[10px] font-[Freesentation] text-[16px] text-[#58534E] font-weight-[500]">
            {mainLabel &&
                (<span>{mainLabel}</span>)}

            {mainLabel && MenuBarLabel && (
                <span>{`>`}</span>
            )}
            <span>{MenuBarLabel}</span>

            {plusMenuLabel && (
                <p className={`ml-auto ${isSelectMode ? "text-[#D75D59]" : ""}`} onClick={onClick}>{plusMenuLabel}</p>
            )}
        </div>
    )
}

export default MenuBarItems;
