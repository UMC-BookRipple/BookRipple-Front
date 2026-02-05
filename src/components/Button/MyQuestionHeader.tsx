import React from "react";

interface MyQuestionsHeaderProps {
    showMyQuestions: boolean;
    onToggle: () => void;
}

const MyQuestionHeader: React.FC<MyQuestionsHeaderProps> = ({
    showMyQuestions,
    onToggle,
}) => {
    return (
        <button
            className="
        text-[#58534E]
        text-[16px]
        font-[500]
        font-[Freesentation]
        underline
        underline-offset-[2px]
        decoration-solid
      "
            onClick={onToggle}
        >
            {showMyQuestions ? "나의 질문" : "사람들의 질문"}
        </button>
    );
};

export default MyQuestionHeader;
