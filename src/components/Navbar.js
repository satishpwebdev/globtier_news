import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
const Navbar = () => {
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    // const navigate = useNavigate();
    const handleSearchButtonClick = () => {
        setIsSearchExpanded(!isSearchExpanded);
    };
    const handleSearchInputChange = (event) => {
        event.preventDefault();
        setSearchValue(event.target.value);
    };
    const handleSearchSubmit = () => {
        history.push(`/?search=${encodeURIComponent(searchValue)}`);
        setSearchValue("");
        setIsSearchExpanded(false);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("nav", { className: "flex items-center justify-between w-full my-4 py-2 px-6 md:px-16" },
            React.createElement("div", { className: "newsp flex items-center gap-2" },
                React.createElement("button", { onClick: () => { history.push('/'); }, className: "bg-[#121221] px-2 py-1 text-white rounded-md font-semibold font-rale" }, "News"),
                React.createElement("button", { className: "bg-white px-2 py-1 text-black rounded-md font-semibold font-rale" }, "Portal")),
            React.createElement("div", { className: "searchlogut flex items-center gap-4" },
                React.createElement("button", { className: "searchbutton", onClick: handleSearchButtonClick },
                    React.createElement(IoIosSearch, { size: 28 })),
                isSearchExpanded && (React.createElement("div", { className: "search-bar flex " },
                    React.createElement("input", { type: "text", placeholder: "Search...", value: searchValue, onChange: handleSearchInputChange, className: "outline-none w-3/4 border-2 px-1.5 py-1.5 rounded-md" }),
                    React.createElement("button", { type: "submit", className: "bg-blue-400 px-2 py-1.5 rounded-md mx-2 text-white font-robo", onClick: handleSearchSubmit }, "Search"))),
                React.createElement("button", null,
                    React.createElement(MdOutlineLogout, { className: "font-thin", size: 28 }))))));
};
export default Navbar;
