import { useModalStore } from '../stores/ModalStore';

interface ModalProps {
  children?: React.ReactNode;
}

const Modal = ({}: ModalProps) => {
  const { isOpen, close, title, confirmAction } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="flex h-[144px] w-[241px] flex-col justify-center overflow-hidden rounded-[10px] border-[1px] border-[#E6E6E6] bg-[#FFFFFF] font-[Freesentation] font-medium shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10)]">
        <div className="flex h-[105px] flex-col justify-center px-[10px] py-[26px] text-center text-[16px] whitespace-nowrap text-[#58534E]">
          {title}
        </div>

        <div className="flex h-[39px] flex-row justify-between border-t border-t-[1px] border-[#E6E6E6]">
          <button
            className="w-[120px] border-r-[1px] border-[#E6E6E6] font-[Freesentation] text-[16px] font-medium whitespace-nowrap text-[#58534E] transition-colors hover:bg-gray-50"
            onClick={close}
          >
            취소하기
          </button>
          <button
            className="w-[120px] border-[#E6E6E6] font-[Freesentation] text-[16px] font-medium whitespace-nowrap text-[#D75D59] transition-colors hover:bg-gray-50"
            onClick={() => {
              confirmAction?.();
              close();
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
