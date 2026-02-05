import React from 'react';

interface ReadingProgressProps {
  progress: number;
  className?: string; // 추가적인 스타일 확장을 위한 속성
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({
  progress,
  className = '',
}) => {
  const validProgress = Math.min(100, Math.max(0, progress));

  return (
<<<<<<< feat/#22-bookshelf-select-ui
    <div className={`overflow-hidden rounded-full bg-[#D2D2D2] ${className}`}>
      <div
        className="h-full bg-[#BDB7B2] transition-all duration-300 ease-out"
        style={{ width: `${validProgress}%` }}
      />
=======
    <div className={`flex w-full flex-col gap-1 ${className}`}>
      <div className="h-[20px] w-full overflow-hidden rounded-full bg-[#D2D2D2]">
        <div
          className="h-full bg-[#827A74] transition-all duration-300 ease-out"
          style={{ width: `${validProgress}%` }}
        />
      </div>
>>>>>>> develop
    </div>
  );
};

export default ReadingProgress;
