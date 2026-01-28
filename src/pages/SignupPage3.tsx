import TopLogo from "../components/TopLogo";
import SignupLabel from "../components/SignupLabel";
import FormLabel from "../components/FormLabel";
import TextInput from "../components/TextInput";
import { useMemo, useRef, useState } from "react";
import Divider from "../components/Divider";
import LoginButton from "../components/LoginButton";
import calendarIcon from "../assets/icons/calendarIcon.svg";

const SignupPage3 = () => {

    const [name, setName] = useState<string>("");
    const [birthDisplay, setBirthDisplay] = useState<string>(""); // YYYY.MM.DD

    const dateRef = useRef<HTMLInputElement | null>(null);

    // 오늘 날짜 (미래 선택 방지)
    const maxDate = useMemo<string>(() => {
        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    }, []);

    // 숫자만 허용 + YYYY.MM.DD 포맷
    const formatDots = (value: string): string => {
        const digits = value.replace(/\D/g, "").slice(0, 8);
        const y = digits.slice(0, 4);
        const m = digits.slice(4, 6);
        const d = digits.slice(6, 8);

        if (digits.length <= 4) return y;
        if (digits.length <= 6) return `${y}.${m}`;
        return `${y}.${m}.${d}`;
    };

    // YYYY.MM.DD → YYYY-MM-DD
    const toISO = (value: string): string => {
        const digits = value.replace(/\D/g, "");
        if (digits.length !== 8) return "";

        return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
    };

    // YYYY-MM-DD → YYYY.MM.DD
    const fromISO = (iso: string): string => {
        if (!iso) return "";
        return formatDots(iso.replaceAll("-", ""));
    };

    // 달력 열기
    const openPicker = (): void => {
        const el = dateRef.current;
        if (!el) return;

        const anyEl = el as any;

        if (typeof anyEl.showPicker === "function") {
            anyEl.showPicker();
        } else {
            el.focus();
            el.click();
        }
    };

    return (
        <div className="min-h-dvh w-full flex flex-col items-center bg-[#F7F5F1] font-[Freesentation]">
            <TopLogo />

            <div className="w-full px-[20px] pt-[20px] pb-[10px]">
                <SignupLabel />
            </div>

            <div className="w-full px-[20px] pt-[20px] pb-[10px]">
                <FormLabel label="이름 작성" />
            </div>

            <div className="w-full px-[16px] pt-[4px] pb-[6px]">
                <TextInput placeholder="이름 입력" value={name} onChange={setName} />
            </div>

            <div className="w-full px-[16px] pt-[4px] pb-[6px]">
                <FormLabel label="생년월일 작성" />
            </div>

            {/* 생년월일 입력 + 달력 */}
            <div className="w-full flex flex-row gap-[6px] items-center justify-center px-[16px] pt-[6px] pb-[4px] relative">
                <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0000.00.00"
                    value={birthDisplay}
                    onChange={(e) => setBirthDisplay(formatDots(e.target.value))}
                    className="w-full h-[45px] rounded-[100px] border border-black/25 bg-[#FFFFFF] px-[10px] py-[12px]"
                />

                {/* 실제 date picker */}
                <input
                    ref={dateRef}
                    type="date"
                    max={maxDate}
                    value={toISO(birthDisplay)}
                    onChange={(e) => setBirthDisplay(fromISO(e.target.value))}
                    className="absolute opacity-0 pointer-events-none w-0 h-0"
                    tabIndex={-1}
                />

                <button
                    type="button"
                    onClick={openPicker}
                    className="rounded-full border w-[45px] h-[45px] flex items-center justify-center"
                >
                    <img src={calendarIcon} alt="" />
                </button>
            </div>

            <div className="w-full pt-[30px] px-[16px] pb-[20px]">
                <Divider />
            </div>

            <div className="w-full pt-[45px] pb-[20px] px-[16px] flex items-center justify-center">
                <LoginButton label="회원가입 진행하기" onClick={() => { }} />
            </div>
        </div>
    );
};

export default SignupPage3;
