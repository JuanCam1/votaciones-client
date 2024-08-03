import { IoSearch } from "react-icons/io5";

const Search = ({ handleChange, placeholder, value }) => {
  return (
    <div className="flex justify-between mt-8 border bg-colorBox h-12 rounded-md pl-2">
      <div className="flex gap-2 items-center w-full">
        <label htmlFor="search">
          <IoSearch className="text-color757575" />
        </label>
        <input
          autoFocus
          id="search"
          className="w-full h-full outline-none placeholder:text-[14px]"
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
        />
      </div>
    </div>
  );
};
export default Search;
