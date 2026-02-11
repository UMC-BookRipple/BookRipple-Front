import Divider from './Divider';

const BookTitleLabel = ({ BookTitle }: { BookTitle: string }) => {
  return (
    <div className="flex w-full flex-col items-start justify-center">
      <p className="w-full px-[20px] pt-[10px] pb-[5px] text-left font-[Freesentation] text-[18px] font-[500] text-[#58534E]">
        {BookTitle}
      </p>

      <div className="w-full px-[16px]">
        <Divider />
      </div>
    </div>
  );
};

export default BookTitleLabel;
