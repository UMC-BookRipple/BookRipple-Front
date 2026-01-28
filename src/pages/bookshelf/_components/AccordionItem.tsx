import { useState } from 'react';

type Props = {
  title: string;
  children?: React.ReactNode;
};

export default function AccordionItem({ title, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-[#58534E]">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between py-4 text-left text-[15px] text-[#58534E]"
      >
        <span className="font-semibold">{title}</span>
        <span className="text-[#58534E]">{open ? '˄' : '˅'}</span>
      </button>

      {open && (
        <div className="pb-4 text-[13px] text-[#6B635B]">{children}</div>
      )}
    </div>
  );
}
