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

  const handleSearchInputChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Search Value:", searchValue);
    history.push(`/?search=${encodeURIComponent(searchValue)}`);
    setSearchValue("");
    setIsSearchExpanded(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between w-full my-4 py-2 px-6 md:px-16">
        <div className="newsp flex items-center gap-2">
          <button className="bg-[#121221] px-2 py-1 text-white rounded-md font-semibold font-rale">
            News
          </button>
          <button className="bg-white px-2 py-1 text-black rounded-md font-semibold font-rale">Portal</button>
        </div>
        <div className="searchlogut flex items-center gap-4">
          <button className="searchbutton" onClick={handleSearchButtonClick}>
            <IoIosSearch size={28}></IoIosSearch>
          </button>

          {isSearchExpanded && (
            <div className="search-bar flex ">
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={handleSearchInputChange}
                className="outline-none w-3/4 border-2 px-1.5 py-1.5 rounded-md"
              />
              <button
                className="bg-blue-400 px-2 py-1.5 rounded-md mx-2 text-white font-robo"
                onClick={handleSearchSubmit}
              >
                Search
              </button>
            </div>
          )}
          <button>
            <MdOutlineLogout className="font-thin" size={28}></MdOutlineLogout>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
