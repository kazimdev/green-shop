import Logo from "../../../../images/Logo.png";

const Navbar = () => {
    return (
        <header className="app-nav flex items-center px-4 py-2">
            <div className="logo w-1/4">
                <img src={Logo} alt="Logo" width="180" />
            </div>
            <div className="languages w-3/4">
                <ul>
                    <li> Home </li>
                    <li> English </li>
                </ul>
            </div>

            <div className="current-user avatar">
                <div className="w-12 rounded-full">
                    <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
