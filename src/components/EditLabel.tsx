import Divider from "./Divider"

const EditLabel = ({ mainLabel, subLabel }: { mainLabel: string, subLabel: string }) => {
    return (
        <div className="w-full flex flex-col justify-center">
            <div
                className="px-[14px] pt-[30px]">
                <span
                    className="h-[50px] py-[12px] px-[5px] gap-[10px] flex items-center whitespace-nowrap font-[GmarketSansBold] text-[20px] text-[#58534E]">
                    MY PAGE</span>
            </div>
            <div
                className="w-full flex flex-row items-center px-[20px] py-[10px] gap-[10px] text-[18px] font-weight-[500] text-[#58534E] whitespace-nowrap">
                <div>{mainLabel}</div>
                <div>{`>`}</div>
                <div>{subLabel}</div>
            </div>
            <div className="w-full px-[16px] py-[10px] flex items-center justify-center gap-[10px]">
                <Divider />
            </div>
        </div>
    )
}

export default EditLabel