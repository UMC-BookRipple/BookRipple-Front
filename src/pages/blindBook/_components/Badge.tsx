import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'secondary';
  style?: React.CSSProperties;
}

const Badge = ({
  children,
  className = '',
  variant = 'default',
  style,
}: BadgeProps) => {
  const bgClass = variant === 'secondary' ? 'bg-[#BDB7B2]' : 'bg-[#827A74]';

  return (
    <div
      style={style}
      className={`flex items-center justify-center gap-[10px] rounded-[20px] px-[8px] py-[2px] text-center text-[14px] leading-normal font-medium text-white ${bgClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default Badge;
