type CardVariant = "question" | "my-question" | "answer" | "random-question";

interface QnACardProps {
  variant: CardVariant;
  content: string;
  className?: string;
}

export default function QnACard({
  variant,
  content,
  className = "",
}: QnACardProps) {
  const label = variant === "answer" ? "A" : "Q";

  const styles = {
    question: {
      bg: "bg-[#827A74]",
      labelColor: "text-white",
      textColor: "text-white",
      textSize: "text-[16px]",
    },
    "random-question": {
      bg: "bg-[#827A74]",
      labelColor: "text-white",
      textColor: "text-white",
      textSize: "text-[18px]",
    },
    "my-question": {
      bg: "bg-[#BDB7B2]",
      labelColor: "text-[#58534E]",
      textColor: "text-[#58534E]",
      textSize: "text-[16px]",
    },
    answer: {
      bg: "bg-white",
      labelColor: "text-[#58534E]",
      textColor: "text-[#58534E]",
      textSize: "text-[16px]",
    },
  };

  const currentStyle = styles[variant];

  return (
    <div
      className={`w-full p-[16px] rounded-[10px] flex flex-col gap-[25px] ${currentStyle.bg} ${className}`}
    >
      {/* 라벨 (Q/A) */}
      <div
        className={`font-gmarket font-bold text-[20px] leading-none ${currentStyle.labelColor}`}
      >
        {label}
      </div>

      {/* 본문 텍스트 */}
      <div
        className={`font-normal ${currentStyle.textSize} whitespace-pre-wrap leading-[1.2] ${currentStyle.textColor}`}
      >
        {content}
      </div>
    </div>
  );
}
