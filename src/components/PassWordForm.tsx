import React from "react";
import FormLabel from "./FormLabel";
import LoginTextInput from "./LoginTextInput";

type PassWordFormProps = {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onToggle?: () => void;
  showPassword?: boolean;
};

const PassWordForm = ({
  type = "password",
  placeholder,
  value,
  onChange,
  onToggle,
  showPassword = false,
  label,
}: PassWordFormProps) => {
  const inputType = showPassword ? "text" : type;

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {label && (
        <div className="w-full flex flex-col items-center justify-center pt-[20px] pb-[10px] px-[4px]">
          <FormLabel label={label} />
        </div>
      )}

      <LoginTextInput
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onToggle={onToggle}
      />
    </div>
  );
};

export default PassWordForm;
