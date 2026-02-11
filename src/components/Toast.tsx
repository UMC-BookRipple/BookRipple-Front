interface ToastProps {
  visible: boolean;
  message?: string;
}

const Toast = ({ visible, message = '기록이 완료되었습니다' }: ToastProps) => {
  return (
    <div
      className={`inline-flex h-[29px] items-center justify-center rounded-[20px] bg-[#827A74]/90 px-[10px] py-[4px] 
        ${visible ? 'animate-[fadeIn_0.3s_ease-out_forwards] opacity-100 visibility-visible' : 'animate-[fadeOut_0.3s_ease-in_forwards] opacity-0 visibility-hidden'}`}
      style={{ transition: 'visibility 0s 0.3s, opacity 0.3s ease-in-out' }}
    >
      <div className="whitespace-nowrap text-[18px] font-normal text-white">
        {message}
      </div>
    </div>
  );
};

export default Toast;
