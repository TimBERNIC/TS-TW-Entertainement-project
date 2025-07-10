import React from "react";

const Button = ({
  title,
  btnFunction,
}: {
  title: string;
  btnFunction: () => void;
}) => {
  return (
    <button
      onClick={btnFunction}
      className="bg-blue-500 text-white p-2 rounded-md">
      {title}
    </button>
  );
};

export default Button;
