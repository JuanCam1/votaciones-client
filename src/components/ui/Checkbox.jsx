const Checkbox = ({ isCheck, changeEdit }) => {
  return (
    <div className="flex justify-center items-center absolute top-3 left-3">
      <label className="container">
        <input
          value="wedding-gift"
          className="peer cursor-pointer hidden after:opacity-100"
          checked={isCheck}
          type="checkbox"
          onChange={changeEdit}
        />
        <span className="inline-block w-5 h-5 border-2 border-colorSecundary/80 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-colorPrimary after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"></span>
      </label>
    </div>
  );
};
export default Checkbox;
