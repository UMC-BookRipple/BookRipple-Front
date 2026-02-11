import React from "react";

interface LoginButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: "brown" | "lightBrown" | "white";
}

const LoginButton = ({
    label,
    variant = "brown",
    disabled,
    className,
    ...buttonProps
}: LoginButtonProps) => {
    const baseClass =
        "w-full h-[49px] rounded-[100px] py-[14px] px-[10px] font-medium text-[18px] flex flex-col justify-center items-center gap-[10px]";

    const variantClass = {
        brown: "bg-[#827A74] text-[#FFFFFF]",
        lightBrown: "bg-[#BDB7B2] text-[#FFFFFF]",
        white: "bg-[#FFFFFF] text-[#58534E]",
    };

    const disabledStyle = disabled
        ? "cursor-not-allowed pointer-events-none"
        : "";

    return (
        <div className="w-full">
            <button
                {...buttonProps}
                disabled={disabled}
                className={`${baseClass} ${variantClass[variant]} ${disabledStyle} ${className ?? ""
                    }`}
            >
                {label}
            </button>
        </div>
    );
};

export default LoginButton;
