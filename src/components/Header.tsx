import menuIcon from "/src/assets/icons/menu1.svg";
import profileIcon from "/src/assets/icons/M-profile1.svg";

const Header = () => {
  const handleMenu = () => {
    console.log("Menu button clicked!");
  };

  const handleSearch = () => {
    console.log("Search clicked!");
  };

  return (
    <header className="flex w-full justify-between p-4 bg-[#F7F5F1] border-b border-[#58534E]">
      <button onClick={handleMenu} className="menu-button">
        <img src={menuIcon} alt="Menu" className="w-6 h-6 menu-icon" />
      </button>

      <h1 className="text-base font-semibold text-[#58534E]">BookRipple</h1>

      <button onClick={handleSearch}>
        <img src={profileIcon} alt="Profile" className="w-6 h-6" />
      </button>
    </header>
  );
};

export default Header;
