import logo from '../assets/icons/logo.svg';

const BigLogo = () => {
    return (
        <div className="w-full">
            <div className="h-[50px]" />
            <div
                className="h-[631px] w-full flex justify-center items-center gap-[10px] pt-[26px] pb-[28px] px-[10px]">
                <img
                    src={logo}
                    alt="BookRipple Logo"
                    className="h-[95.6px] w-[382px]"
                />
            </div>
        </div>
    )
}

export default BigLogo
