interface ToastProps {
  visible: boolean;
  message?: string;
}

const Toast = ({ visible, message = '기록이 완료되었습니다' }: ToastProps) => {
  return (
    <div
      className={`flex h-[29px] w-[160px] items-center justify-center rounded-[20px] bg-[#827A74]/90 px-[10px] py-[4px] ${
        visible
          ? 'animate-[fadeIn_0.3s_ease-out_forwards]'
          : 'animate-[fadeOut_0.3s_ease-in_forwards]'
      }`}
    >
      <div className="font-sans text-[18px] font-normal whitespace-nowrap text-[#FFFFFF]">
        {message}
      </div>
    </div>
  );
};

export default Toast;
