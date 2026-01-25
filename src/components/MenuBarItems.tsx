const MenuBarItems = ({ MenuBarLabel, mainLabel, plusMenuLabel }: { MenuBarLabel: string, mainLabel?: string, plusMenuLabel?: string }) => {
    return (

        <div className="w-full flex flex-row justify-start p-[10px] gap-[10px] font-[Freesentation] text-[16px] text-[#58534E] font-weight-[500]">
            {mainLabel &&
                (<span>{mainLabel}</span>)}

            {mainLabel && MenuBarLabel && (
                <span>{`>`}</span>
            )}
            <span>{MenuBarLabel}</span>

            {plusMenuLabel && (
                <p className="ml-auto">{plusMenuLabel}</p>
            )}
        </div>
    )
}

export default MenuBarItems;
