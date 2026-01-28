import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyle =
    'w-full h-[53px] rounded-[100px] text-[18px] flex items-center justify-center';

  const colorStyles = {
    primary: 'bg-[#827A74] text-white active:bg-[#58534E]',
    secondary:
      'bg-white text-[#827A74] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.25)] active:bg-[#58534E]',
  };

  return (
    <button
      className={`${baseStyle} ${colorStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
