import React, { useLayoutEffect, useRef } from 'react';

interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    type?: React.HTMLInputTypeAttribute;
    className?: string;
    onSubmit?: (value: string) => void;
}

export default function TextInput({
    value,
    onChange,
    onSubmit,
    className = '',
}: TextInputProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useLayoutEffect(() => {
        if (!textareaRef.current) return;
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }, [value]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = value.trim();
        if (!trimmed) return;

        onSubmit?.(trimmed);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex w-full items-end justify-between gap-[5px] rounded-[20px] bg-white py-[10px] pr-[10px] pl-[15px] ${className}`}
        >
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={1}
                className="max-h-[140px] flex-1 resize-none bg-transparent text-[16px] font-normal text-[#58534E] outline-none"
            />
            <button
                type="submit"
                className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full bg-[#827A74] transition-colors duration-200 active:bg-[#58534E]"
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