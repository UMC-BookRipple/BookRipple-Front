import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from 'react';

interface BaseProps {
  label?: string;
  icon?: ReactNode;
  multiline?: boolean;
}

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & { multiline?: false };
type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true };

type Props = InputProps | TextareaProps;

export default function Input({
  label,
  icon,
  multiline = false,
  ...props
}: Props) {
  const inputStyle = {
    flex: '1 0 0',
    alignSelf: 'stretch' as const,
    color: '#58534E',
    fontFamily: 'Freesentation',
    fontSize: '16px',
    fontStyle: 'normal' as const,
    fontWeight: 400,
    lineHeight: 'normal' as const,
  };

  return (
    <div>
      {label && <div className="mb-2 text-[14px] font-semibold">{label}</div>}
      <div className="flex items-start gap-[10px] self-stretch rounded-[12px] bg-white p-[14px_16px]">
        {icon && <div style={{ flexShrink: 0 }}>{icon}</div>}
        {multiline ? (
          <textarea
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className="resize-none bg-transparent outline-none placeholder:font-[Freesentation] placeholder:text-[16px] placeholder:font-normal placeholder:text-[#BDB7B2]"
            style={inputStyle}
          />
        ) : (
          <input
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
            className="bg-transparent outline-none placeholder:font-[Freesentation] placeholder:text-[16px] placeholder:font-normal placeholder:text-[#BDB7B2]"
            style={inputStyle}
          />
        )}
      </div>
    </div>
  );
}
