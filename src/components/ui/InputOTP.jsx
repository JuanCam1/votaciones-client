import { useState } from "react";

const InputOTP = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, "");
    const newOtp = [...otp];

    if (value) {
      newOtp[index] = value;
      setOtp(newOtp);
      onChange(newOtp.join(""));

      if (index < length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else {
      newOtp[index] = "";
      setOtp(newOtp);
      onChange(newOtp.join(""));
    }
  };

  const handleBackspace = (element, index) => {
    if (element.value === "") {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          id={`otp-input-${index}`}
          name="otp"
          maxLength="1"
          className="w-12 h-12 max-md:size-10 border border-gray-300 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => (e.key === "Backspace" ? handleBackspace(e.target, index) : null)}
        />
      ))}
    </div>
  );
};

export default InputOTP;
