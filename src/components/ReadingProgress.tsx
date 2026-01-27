import React from 'react';

interface ReadingProgressProps {
  progress: number;
  className?: string; // 추가적인 스타일 확장을 위한 속성
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({
  progress,
  className = '',
}) => {
  // 0~100 사이의 값으로 제한
  const validProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`flex w-full flex-col gap-1 ${className}`}>
      <div className="h-[20px] w-full overflow-hidden rounded-full bg-[#D2D2D2]">
        <div
          className="h-full bg-[#827A74] transition-all duration-300 ease-out"
          style={{ width: `${validProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ReadingProgress;
