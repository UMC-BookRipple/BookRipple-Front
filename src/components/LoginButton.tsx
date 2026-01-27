interface LoginButtonProps {
    label: string;
    onClick: () => void;
    variant?: "brown" | "lightBrown" | "white";
}

const LoginButton = ({ label, onClick, variant = "brown" }: LoginButtonProps) => {

    const baseClass = "w-full h-[49px] rounded-[100px] py-[14px] px-[10px] font-medium text-[18px] flex flex-col justify-center items-center gap-[10px]";

    const variantClass = {
        brown: "bg-[#827A74] text-[#FFFFFF]",
        lightBrown: "bg-[#BDB7B2] text-[#FFFFFF]",
        white: "bg-[#FFFFFF] text-[#58534E]",
    }

    return (
        <div className="w-full">
            <button
                className={baseClass + " " + variantClass[variant]}
                onClick={onClick}>
                {label}
            </button>
        </div>
    )
}

export default LoginButton;