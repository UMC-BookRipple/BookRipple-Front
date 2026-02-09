interface UserInfoCardProps {
  label: string;
  username: string;
  avatarSize?: 'small' | 'large';
  showIcon?: boolean;
}

export default function UserInfoCard({
  label,
  username,
  avatarSize = 'large',
  showIcon = true,
}: UserInfoCardProps) {
  const size = avatarSize === 'small' ? 40 : 48;
  const bgColor = avatarSize === 'small' ? '#F7F5F1' : '#E6E6E6';

  return (
    <div className="flex items-center gap-[14px] self-stretch rounded-[12px] bg-[#FFFFFF] p-[16px]">
      <div
        className="flex flex-shrink-0 items-center justify-center rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: bgColor,
        }}
      >
        {showIcon && (
          <span className="font-[Freesentation] text-[20px] leading-normal font-medium text-[#58534E]">
            👤
          </span>
        )}
      </div>
      <div className="flex flex-col gap-[2px]">
        <span className="font-[Freesentation] text-[18px] leading-normal font-medium text-[#58534E]">
          {label}
        </span>
        <span className="font-[Freesentation] text-[16px] leading-normal font-medium text-[#58534E]">
          {username}
        </span>
      </div>
    </div>
  );
}
