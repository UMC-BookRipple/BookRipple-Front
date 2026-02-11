const GlobalSpinner = () => {
    return (
        <div
            id="global-spinner"
            className="fixed inset-0 z-[9999] hidden items-center justify-center bg-black/20"
        >
            <div className="w-[44px] h-[44px] border-[4px] border-[#EDE9DF] border-t-[#7A5C47] rounded-full animate-spin" />
        </div>
    );
};

export default GlobalSpinner;
