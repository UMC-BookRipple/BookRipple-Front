import React from "react";
import FormLabel from "./FormLabel";
import LoginTextInput from "./LoginTextInput";

type PassWordFormProps = {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
};

const PassWordForm = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: PassWordFormProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {label && (
        <div className="w-full flex flex-col items-center justify-center pt-[20px] pb-[10px] px-[4px]">
          <FormLabel label={label} />
        </div>)}
      <LoginTextInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default PassWordForm;
