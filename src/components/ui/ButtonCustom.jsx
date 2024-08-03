/* eslint-disable react/prop-types */
import classNames from "classnames";

const ButtonCustom = ({
  isDisibled = false,
  paddingYBottom = "py-[7px]",
  paddingXBottom = "px-0",
  widthButton = "w-[90%]",
  bgButton = "bg-seance-500",
  bgButtonHover = "hover:bg-seance-600",
  text,
  type = "button",
  textWeight = "font-normal",
  textColor = "text-white",
  textSize = "text-xs",
  ...props
}) => {
  const buttonClass = classNames(
    "rounded-lg py-4 cursor-pointer",
    widthButton,
    bgButton,
    bgButtonHover,
    textWeight,
    paddingYBottom,
    paddingXBottom,
    type
  );

  const textClass = classNames("text-center", textColor, textSize);
  return (
    <button type={type} className={buttonClass}  disabled={isDisibled} {...props}>
      <span className={textClass}>{text}</span>
    </button>
  );
};

export default ButtonCustom;
