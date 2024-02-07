import { IoIosSearch } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
const Navabar = () => {
  return (
    <>
      <nav className="flex items-center justify-between w-full my-4 py-2">
        <div className="newsp flex items-center gap-2">
          <button className="bg-[#121221] px-2 py-1 text-white rounded-md font-semibold font-rale">News</button>
          <button className="bg-white px-2 py-1 text-black rounded-md font-semibold font-rale">Portal</button>
        </div>
        <div className="searchlogut flex items-center gap-4">
          <button><IoIosSearch size={28}></IoIosSearch></button>
          <button><MdOutlineLogout className="font-thin" size={28}></MdOutlineLogout></button>
        </div>
      </nav>
    </>
  );
};

export default Navabar;
