import logo from '../assets/icons/logo.svg';

const TopLogo = ({ onclick }: { onclick?: () => void }) => {
    return (
        <div
            className="pt-[80px] pb-[20px] px-[10px] flex items-center justify-center">
            <img
                onClick={onclick}
                src={logo}
                alt="BookRipple Logo"
                className="h-[95.6px] w-[382px]"
            />
        </div>
    )
}

export default TopLogo;