import React, { useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import Flex from '../styles/Flex';
import { Link } from 'react-router-dom';

const PasswordInput = ({onChange,flexStyle,labelText}) => {
  const [show, setShow] = useState(false);
  return (
    <Flex style={`flex-col py-1 md:py-2 ${flexStyle}`}>
      <label
        htmlFor="password"
        className="font-roboto font-bold text-sm md:text-base md:w-4/12"
      >
        {labelText}
      </label>
      <div className="relative w-full md:7/12">
        <input
          className=' className="py-1 md:py-2  w-full   pl-3 md:pl-5 border border-gray-400  text-black rounded-lg mt-2 md:mt-2 lg:mt-3"'
          type={show ? 'text' : 'password'}
          name="password"
          placeholder="Enter Your Password"
          required
          onChange={onChange}
        />
        <Link
          className="absolute top-2/5 right-2"
          onClick={() => setShow(!show)}
        >
          {show ? <FaRegEye /> : <FaRegEyeSlash />}
        </Link>
      </div>
    </Flex>
  );
};

export default PasswordInput;
