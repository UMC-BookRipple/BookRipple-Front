interface ToastProps {
    visible: boolean;
}

const Toast = ({ visible }: ToastProps) => {
    return (
        <div
            className={`h-[29px] w-[160px] rounded-[20px] bg-[#827A74]/90 flex justify-center items-center py-[5px] px-[10px]
                 ${visible
                ? "animate-[fadeIn_0.3s_ease-out_forwards]"
                : "animate-[fadeOut_0.3s_ease-in_forwards]"}`}>
            <div
            className="text-[#FFFFFF] text-[18px] font-[Freesentation] font-medium whitespace-nowrap">
            질문이 등록되었습니다
            </div>
        </div>
    )
}

export default Toast;