interface LoginButtonProps {
    label: string;
    onClick: () => void;
}

const LoginButton = ({label, onClick}: LoginButtonProps) => {

    return (
        <button
        className="w-[370px] h-[49px] rounded-[100px] py-[14px] px-[10px] bg-[#827A74] text-[#FFFFFF] font-medium text-[18px] flex justify-center items-center"
        onClick={onClick}>
            {label}
        </button>
    )
}

export default LoginButton;