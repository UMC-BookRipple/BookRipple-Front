import TopLogo from "../components/TopLogo";
import Policy from "../components/Policy";
import LoginButton from "../components/LoginButton";
import { useNavigate } from "react-router-dom";

const PolicyPage = () => {
    const navigate = useNavigate();
    return (
        <div
            className="min-h-dvh w-full flex flex-col bg-[#F7F5F1] items-center font-[Freesentation]">
            <TopLogo />
            <span
                className="w-full h-[49px] py-[14px] px-[24px] font-[Freesentation] text-[16px] text-[#58534E] text-center">약관 및 정보</span>

            <div
                className="w-full py-[10px] px-[16px] flex flex-col justify-center">
                <div
                    className="flex flex-col p-[16px] gap-[25px] bg-[#FFFFFF] rounded-[20px]">
                    <p className="font-[Freesentation] text-[18px] text-[#58534E]">북 리플 약관 동의서</p>
                    <Policy />
                </div>
            </div>

            <div className="w-full pt-[20px] pb-[20px] px-[16px] gap-[10px]">
                <LoginButton label="돌아가기" onClick={() => navigate(-1)} variant="white" />
            </div>
        </div>
    );
};

export default PolicyPage;