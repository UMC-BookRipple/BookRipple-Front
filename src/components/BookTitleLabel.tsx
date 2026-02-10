import Divider from './Divider';

const BookTitleLabel = ({ BookTitle }: { BookTitle: string }) => {
  return (
    <div className="flex w-full flex-col items-start justify-center">
      <p className="w-full px-[8px] pt-[20px] text-left font-[Freesentation] text-[18px] font-[500] text-[#58534E]">
        {BookTitle}
      </p>

      <div className="w-full px-[2px] py-[10px]">
        <Divider />
      </div>
    </div>
  );
};

export default BookTitleLabel;
