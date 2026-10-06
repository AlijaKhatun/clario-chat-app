import React from 'react'
import Flex from '../styles/Flex';
const Input = ({label,type,placeholder,onChange, required=false,flexStyle}) => {
  return (
    <>
      <Flex style={`flex-col py-1 md:py-2 ${flexStyle}`}>
        <label className="font-roboto font-bold text-sm md:text-base md:w-4/12">
          {label}
        </label>
        <input
          className="py-1 md:py-2  w-full md:7/12  pl-3 md:pl-5 border border-gray-400  text-black rounded-lg mt-2 md:mt-2 lg:mt-3"
          type={type}
          name={type}
          required={required}
          placeholder={placeholder}
          onChange={onChange}
        />
      </Flex>
    </>
  );
}

export default Input