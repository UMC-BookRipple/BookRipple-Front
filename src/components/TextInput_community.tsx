import React, { useState } from "react";

interface TextInputProps {
    onSubmit?: (value: string) => void;
    className?: string;
}

export default function TextInput({
    onSubmit,
    className = "",
}: TextInputProps) {
    const [value, setValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (value.trim().length === 0) return;

        if (onSubmit) {
            onSubmit(value);
            setValue("");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`w-full h-[40px] bg-white rounded-full flex items-center justify-between pl-[15px] pr-[10px] py-[5px] gap-[5px] ${className}`}
        >
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1 bg-transparent outline-none font-normal text-[16px] text-[#58534E]"
            />
            <button
                type="submit"
                className="w-[30px] h-[30px] bg-[#827A74] rounded-full flex items-center justify-center transition-colors duration-200 flex-shrink-0 active:bg-[#58534E]"
            >
                <svg
                    width="14.55"
                    height="14.55"
                    viewBox="0 0 14.55 14.55"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7.275 1.275V13.275M1.275 7.275H13.275"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </form>
    );
}