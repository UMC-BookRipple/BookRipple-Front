type FormLabelProps = {
  label: string;
};

const FormLabel = ({ label }: FormLabelProps) => {
  return (
    <div className="w-full">
      <p className="font-[Freesentation] text-[16px] text-[#58534E]">
        {label}
      </p>
    </div>
  );
};

export default FormLabel;
