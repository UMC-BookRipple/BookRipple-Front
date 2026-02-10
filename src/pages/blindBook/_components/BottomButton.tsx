import React from 'react';

interface BottomButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

const BottomButtonItem = ({
  label,
  onClick,
  disabled = false,
  variant = 'primary',
}: {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}) => {
  const buttonStyles =
    variant === 'primary'
      ? 'bg-[#827A74] text-[#FFF]'
      : 'bg-white text-[#58534E] border border-[#E6E2DE]';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-[10px] self-stretch rounded-full px-[10px] py-[16px] shadow-[0_0_1px_0_rgba(0,0,0,0.25)] ${buttonStyles} ${
        disabled ? 'opacity-50' : ''
      }`}
    >
      <span
        style={{
          color: variant === 'primary' ? '#FFF' : '#58534E',
          fontFamily: 'Freesentation',
          fontSize: '18px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 'normal',
        }}
      >
        {label}
      </span>
    </button>
  );
};

const BottomButton = ({
  label,
  onClick,
  disabled = false,
  variant = 'primary',
  children,
}: BottomButtonProps & { children?: React.ReactNode }) => {
  return (
    <div
      className="fixed bottom-0 flex h-auto min-h-[85px] w-[402px] flex-col items-center justify-center gap-[10px] bg-[#F7F5F1] px-[20px] pt-[12px] pb-[20px] shadow-[0_0_10px_0_rgba(0,0,0,0.10)]"
      style={{ left: '50%', transform: 'translateX(-50%)' }}
    >
      {children ? (
        children
      ) : (
        <BottomButtonItem
          label={label || ''}
          onClick={onClick}
          disabled={disabled}
          variant={variant}
        />
      )}
    </div>
  );
};

export { BottomButtonItem };

export default BottomButton;
