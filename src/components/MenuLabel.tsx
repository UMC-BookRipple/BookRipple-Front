import Divider from "./Divider"

interface MenuLabelProps {
    label: string;
}
const MenuLabel = ({ label }: MenuLabelProps) => {
    return (
        <div>
            <div className="flex items-center px-[20px] pt-[20px] pb-[10px] gap-[16px]">
                <div
                    className="text-[18px] font-weight-[500] text-[#58534E] whitespace-nowrap">{label}</div>
            </div>
            <Divider />
        </div>
    )
}

export default MenuLabel