import React from 'react';
// import img
import logo from '../assets/logo.png';
//import element
import Img from '../component/elements/Img';
import HeadLine from '../component/elements/HeadLine';
import Flex from '../component/styles/Flex';
import SubHeadline from '../component/elements/SubHeadline';
import { Link } from 'react-router-dom';

const LineStartPage = () => {
  return (
    <>
      <div className='w-2/3 md:w-1/2 mx-auto text-center'>
        <Flex style="items-center flex-col justify-center h-dvh">
          <Img src={logo} alt="logo-img" style="w-1/4 mx-auto" />
          <HeadLine text="Welcome To Clario" style="mt-3 md:mt-5 md:mb-3" />
          <SubHeadline
            text="Free messaging,voice and vedio calls, and more"
            style="mb-5 md:mb-10 lg:mb-15"
          />
          <Link
            to="/login"
            className="py-2 w-full md:w-1/2 text-center bg-ct-green text-white rounded-lg font-roboto font-semibold cursor-pointer"
          >
            log in
          </Link>
          <Link
            to="/signup"
            className="py-2 w-full md:w-1/2 text-center border border-gray-400  text-black rounded-lg mt-2 md:mt-5 font-roboto font-semibold cursor-pointer"
          >
            sign up
          </Link>
        </Flex>
      </div>
    </>
  );
};

export default LineStartPage;
