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
    <div className={`overflow-hidden rounded-full bg-[#D2D2D2] ${className}`}>
      <div
        className="h-full bg-[#827A74] transition-all duration-300 ease-out"
        style={{ width: `${validProgress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
