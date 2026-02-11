import logo from '../assets/icons/logo.svg';

const TopLogo = () => {
    return (
        <div
            className="pt-[80px] pb-[20px] px-[10px] flex items-center justify-center">
            <img
                src={logo}
                alt="BookRipple Logo"
                className="h-[95.6px] w-[382px]"
            />
        </div>
    )
}

export default TopLogo;