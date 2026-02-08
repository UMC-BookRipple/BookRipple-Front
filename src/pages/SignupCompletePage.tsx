import { useNavigate } from "react-router-dom";
import BigLogo from "../components/BigLogo";
import { useEffect, useState } from "react";

const SignupCompletePage = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // 애니메이션 시작
        setVisible(true);

        // 전체 대기 시간 (애니메이션 800ms + 여유)
        const timer = setTimeout(() => {
            navigate("/auth/login/local", { replace: true });
        }, 1800);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div
            className={`
        min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1]
        transition-all duration-[800ms] ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
        >
            <div className="flex items-center justify-center">
                <BigLogo />
            </div>

            <div className="w-full pt-[20px] px-[20px] gap-[10px]">
                <div className="h-[42px] flex flex-col text-center text-[18px] font-medium font-[Freesentation] text-[#58534E]">
                    <span>북 리플 회원 가입이 완료되었어요</span>
                    <span>한 권의 깊은 울림을 경험하러 가보실까요?</span>
                </div>
            </div>

            <div className="pb-[30px]" />
        </div>
    );
};

export default SignupCompletePage;
