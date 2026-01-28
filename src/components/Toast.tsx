interface ToastProps {
    visible: boolean;
    message: string;
}

const Toast = ({ visible, message }: ToastProps) => {
    return (
        <div
        className={`
        inline-flex justify-center items-center
        bg-[#827A74]/90 rounded-[20px]
        py-[5px] px-[12px]
        ${visible
          ? "animate-[fadeIn_0.3s_ease-out_forwards]"
          : "animate-[fadeOut_0.3s_ease-in_forwards]"}`}>
            <div
            className="text-[#FFFFFF] text-[18px] font-[Freesentation] font-medium whitespace-nowrap">
            {message}
            </div>
        </div>
    )
}

export default Toast;
