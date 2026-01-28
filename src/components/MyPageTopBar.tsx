import Divider from "./Divider"
import M_profile1 from "../assets/icons/M-profile1.svg"
import menu1 from "../assets/icons/menu1.svg"

const MyPageTopBar = () => {
    return (
        <div className="w-full flex flex-col justify-center text-[#58534E]">
            <div className="w-full h-[50px]" />
            <div className="flex flex-row justify-between items-center h-[30px] w-full px-[14px] pt-[14px] pb-[10px]">
                <span><img src={menu1} alt="" /></span>
                <span className="text-[16px] font-[GmarketSansBold] letter-spacing-[-0.16px]">BOOK RIPPLE</span>
                <span><img src={M_profile1} alt="" /></span>
            </div>
            <Divider />
        </div>
    )
}

export default MyPageTopBar