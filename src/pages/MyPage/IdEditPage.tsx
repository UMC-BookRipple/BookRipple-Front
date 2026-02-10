import Divider from "../../components/Divider"
import FormLabel from "../../components/FormLabel"
import InputWithButton from "../../components/InputWithButton"
import LoginButton from "../../components/LoginButton"
import EditLabel from "../../components/EditLabel"
import Header from "../../components/Header";
import { useCallback, useState } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import CheckIconGreen from "../../assets/icons/checkIconGreen.svg";
import CheckIconRed from "../../assets/icons/checkIconRed.svg";
import CheckIcon from "../../assets/icons/checkIcon.svg";
import { http } from "../../types/http";

const IdEditPage = () => {
    const location = useLocation();

    const from = location.state && (location.state as any).from;

    if (from !== "ProfileEditIdPage") {
        return <Navigate to="/profile/edit/id" replace />;
    }
    const navigate = useNavigate();

    const [loginId, setLoginId] = useState("");


    const [idCheckStatus, setIdCheckStatus] =
        useState<"idle" | "success" | "error">("idle");

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState<string>("");

    const showToast = useCallback((msg: string) => {
        setToastMessage(msg);
        setToastVisible(true);

        // 2초 뒤 자동 숨김 (원하는 시간으로 변경 가능)
        window.setTimeout(() => setToastVisible(false), 2000);
    }, []);

    const verifyId = async () => {
        if (loginId.trim() === "") {
            console.log("아이디를 입력해주세요.");
            return;
        }
        try {
            const response = await http.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/members/check-id`,
                {
                    params: { loginId },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            const { isSuccess, code, message, result } = response.data;

            if (isSuccess) {
                setIdCheckStatus('success');
                localStorage.setItem("loginId", loginId);
            } else {
                console.log(`코드:${code}, 메시지:${message}`);
                setIdCheckStatus('error');
            }
        } catch (error) {
            console.error('아이디 중복 확인 실패:', error);
            setIdCheckStatus('error');
        }
    };


    const changeLoginId = async () => {
        if (!(idCheckStatus === 'success')) {
            return;
        }

        try {
            const response = await http.patch(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/members/me/login-id`,
                {
                    content: loginId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );

            const { isSuccess, code, message, result } = response.data;

            if (isSuccess) {
                console.log("아이디 변경 성공", result.id);
                showToast("아이디 변경이 완료되었습니다.");
                navigate("/profile/edit/menu");
            } else {
                console.log(`코드:${code}, 메시지:${message}`);
                setIdCheckStatus('error');
            }
        } catch (error) {
            console.error('아이디 변경 실패:', error);
            setIdCheckStatus('error');
        }
    };

    return (
        <div
            className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
            <Header />
            <EditLabel mainLabel="프로필 수정" subLabel="아이디 수정" />

            <div className="w-full flex flex-col items-center justify-center pt-[20px] pb-[10px] px-[20px]">
                <FormLabel label="아이디 수정" />
            </div>

            <div className="w-full flex flex-col items-center justify-center px-[16px] py-[4px]">
                <InputWithButton value={loginId} onChange={setLoginId} buttonLabel="중복확인" onButtonClick={verifyId} />
                {idCheckStatus === 'idle' && (
                    <p className="w-full text-[14px] text-[#BDB7B2] flex flex-row items-center justify-start mt-[4px] px-[4px]">
                        <img src={CheckIcon} alt="" className="mb-[2px]" />
                        사용할 수 있는 아이디입니다.
                    </p>
                )}
                {idCheckStatus === 'success' && (
                    <p className="w-full text-[14px] text-[#28A745] flex flex-row items-center justify-start mt-[4px] px-[4px]">
                        <img src={CheckIconGreen} alt="" className="mb-[2px]" />
                        사용할 수 있는 아이디입니다.
                    </p>
                )}
                {idCheckStatus === 'error' && (
                    <p className="w-full text-[14px] text-[#DC3545] flex flex-row items-center justify-start mt-[4px] px-[4px]">
                        <img src={CheckIconRed} alt="" className="mb-[2px]" />
                        사용할 수 없는 아이디입니다.
                    </p>
                )}
            </div>
            <div className="w-full px-[20px]">
                <div className="h-[10px]" />
                <Divider />
            </div>

            <div
                className="w-full flex flex-col items-center justify-center px-[16px] pt-[45px] pb-[20px]">
                <LoginButton
                    label="저장하기"
                    disabled={!(idCheckStatus === 'success')}
                    variant={(idCheckStatus === 'success') ? "brown" : "lightBrown"}
                    onClick={changeLoginId}
                />
            </div>

        </div>
    )
}

export default IdEditPage