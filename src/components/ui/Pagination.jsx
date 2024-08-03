import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ handlePageChange, count, offset, limit }) => {
  const isNextDisabled = offset + limit >= count;
  const isPrevDisabled = offset === 0;

  return (
    <div className="absolute bottom-0 w-full flex justify-center items-center gap-2 xs:mt-0 mt-4">
      <button
        onClick={() => handlePageChange("prev")}
        disabled={isPrevDisabled}
        className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-colorText bg-colorPrimary rounded-s
          ${isPrevDisabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
      >
        <IoIosArrowBack className="w-4" />
      </button>
      <button
        onClick={() => handlePageChange("next")}
        disabled={isNextDisabled}
        className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-colorText bg-colorPrimary rounded-e
          ${isNextDisabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
      >
        <IoIosArrowForward className="w-4" />
      </button>
    </div>
  );
};
export default Pagination;
