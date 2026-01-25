import { useModalStore } from "../stores/ModalStore";

interface ModalProps {
    children?: React.ReactNode;
}

const Modal = ({ }: ModalProps) => {
    const { close, title } = useModalStore();

    return (
        <div
            className="h-[144px] w-[241px] bg-[#FFFFFF] border-[1px] border-[#E6E6E6] rounded-[10px] flex flex-col justify-center shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10)] overflow-hidden font-[Freesentation] font-medium">
            <div
                className="flex flex-col text-[#58534E] text-center justify-center text-[16px] py-[26px] px-[10px] h-[105px] whitespace-nowrap">
                {title}
            </div>

            <div
                className="flex flex-row h-[39px] border-t-[1px] border-[#E6E6E6] justify-between border-t">
                <button
                    className="text-[#58534E] w-[120px] text-[16px] hover:bg-gray-50 transition-colors border-r-[1px] border-[#E6E6E6] font-[Freesentation] font-medium whitespace-nowrap"
                    onClick={close}>취소하기</button>
                <button
                    className="text-[#D75D59] w-[120px] border-[#E6E6E6] text-[16px] hover:bg-gray-50 transition-colors font-[Freesentation] font-medium whitespace-nowrap"
                    onClick={close}>삭제하기</button>
            </div>
        </div>
    );
};

export default Modal;