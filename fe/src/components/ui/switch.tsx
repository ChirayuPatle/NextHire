import { useState } from "react";

const Switch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => {
  return (
    <button
      className={`relative w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        checked ? "bg-blue-500" : "bg-gray-600"
      }`}
      onClick={onChange}
      role="switch"
      aria-checked={checked}
    >
      <div
        className={`absolute w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default Switch;