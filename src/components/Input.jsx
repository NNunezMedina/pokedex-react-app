import { useState } from 'react';
import PasswordToggleButton from './PasswordToggleButton';

const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  const [inputType, setInputType] = useState(type);

  const handleToggle = () => {
    setInputType(prevType => prevType === 'password' ? 'text' : 'password');
  };

  return (
    <div className="relative">
      <label
        className="block text-sm font-medium leading-6 text-gray-900"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        id={name}
        name={name}
        type={inputType} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={type === "password" ? "current-password" : "on"} 
      />
      {type === 'password' && (
        <PasswordToggleButton
          onClick={handleToggle}
          isVisible={inputType === 'text'}
        />
      )}
    </div>
  );
};

export default Input;
